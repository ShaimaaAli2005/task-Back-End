const readline = require('readline');
const API_KEY = 'f6bf1f3cf0354ada8e292914260909'; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getWeatherData(countryName) {
    const url =`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(countryName)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.log('\n❌ Error: Invalid API Key / Token. Please check your credentials.');
            } else if (response.status === 400 && data.error?.code === 1006) {
                console.log('\n❌ Error: Country or City not found. Please check the spelling.');
            } else {
                console.log(`\n❌ API Error (${response.status}): ${data.error?.message || 'Something went wrong.'}`);
            }
            return;
        }

        const temperature = data.current.temp_c;
        const longitude = data.location.lon;
        const latitude = data.location.lat;

        console.log('\n====================================');
        console.log(`🌍 Weather Data for: ${data.location.name}, ${data.location.country}`);
        console.log('====================================');
        console.log(`🌡️  Temperature : ${temperature} °C`);
        console.log(`📍 Longitude   : ${longitude}`);
        console.log(`📍 Latitude    : ${latitude}`);
        console.log('====================================\n');

    } catch (error) {
        console.log('\n❌ Network Error: Unable to connect to the server. Check your internet connection.');
    } finally {
        rl.close();
    }
}
rl.question('Enter the name of a country or city: ', (countryInput) => {
    const trimmedInput = countryInput.trim();

    if (!trimmedInput) {
        console.log('⚠️  Input cannot be empty!');
        rl.close();
    } else {
        getWeatherData(trimmedInput);
    }
});