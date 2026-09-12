import {
  Search,
  MapPin,
  LoaderCircle,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export default function SearchBar({
  onSearch,
  loading,
}) {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] =
    useState(false);

  const [open, setOpen] = useState(false);

  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);

    const query = value.trim();

    if (query.length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    timer.current = setTimeout(async () => {
      setSearching(true);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}`
        );

        const data = await response.json();

        if (!response.ok) {
          setResults([]);
          setOpen(true);
          return;
        }

        setResults(data);
        setOpen(true);
      } catch {
        setResults([]);
        setOpen(true);
      } finally {
        setSearching(false);
      }
    }, 350);

    return () =>
      clearTimeout(timer.current);
  }, [value]);

  function selectLocation(location) {
    setValue(location.label);
    setOpen(false);

    onSearch(location.name);
  }

  function submitSearch(event) {
    event.preventDefault();

    if (results.length > 0) {
      selectLocation(results[0]);
      return;
    }

    if (value.trim()) {
      onSearch(value.trim());
    }
  }

  function clearSearch() {
    setValue("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div className="search-wrapper">

      <form
        onSubmit={submitSearch}
        className="main-search"
      >
        <Search
          size={22}
          className="search-icon"
        />

        <input
          value={value}
          onChange={(event) =>
            setValue(event.target.value)
          }
          onFocus={() => {
            if (results.length > 0) {
              setOpen(true);
            }
          }}
          placeholder="Search city or country..."
        />

        {value && !loading && (
          <button
            type="button"
            className="clear-button"
            onClick={clearSearch}
          >
            <X size={17} />
          </button>
        )}

        <button
          type="submit"
          className="search-button"
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle
              size={20}
              className="spin"
            />
          ) : (
            "Explore"
          )}
        </button>
      </form>

      {/* SEARCH RESULTS */}
      {open && (
        <div className="search-results">

          {searching && (
            <div className="search-status">
              <LoaderCircle
                size={18}
                className="spin"
              />

              <span>
                Finding places...
              </span>
            </div>
          )}

          {!searching &&
            results.length === 0 && (
              <div className="search-status">
                <span>
                  No places found.
                </span>
              </div>
            )}

          {!searching &&
            results.map((location) => (
              <button
                key={`${location.id}-${location.label}`}
                className="location-result"
                type="button"
                onClick={() =>
                  selectLocation(location)
                }
              >
                <div className="location-image">
                  <MapPin size={19} />
                </div>

                <div className="location-info">
                  <strong>
                    {location.name}
                  </strong>
             <span>
                    {[
                      location.region,
                      location.country,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </div>

                <span className="result-arrow">
                  →
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}