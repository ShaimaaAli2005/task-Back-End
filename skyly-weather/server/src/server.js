import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app=express(),port=process.env.PORT||5000;
app.use(cors());app.use(express.json());
const url=(e)=>{const u=new URL(`https://api.weatherapi.com/v1/${e}.json`);u.searchParams.set("key",process.env.WEATHER_API_KEY);return u};
app.get("/api/health",(_,r)=>r.json({ok:true}));
app.get("/api/search",async(req,res)=>{
 const q=String(req.query.q||"").trim();if(!q)return res.json([]);
 if(!process.env.WEATHER_API_KEY)return res.status(500).json({error:"WEATHER_API_KEY is missing in server/.env"});
 try{const u=url("search");u.searchParams.set("q",q);const r=await fetch(u),d=await r.json().catch(()=>[]);
  if(!r.ok)return res.status(r.status).json({error:d?.error?.message||"Search failed."});
  res.json(Array.isArray(d)?d.slice(0,6).map(x=>({id:x.id,name:x.name,region:x.region,country:x.country,label:[x.name,x.region,x.country].filter(Boolean).join(", ")})):[]);
 }catch{res.status(500).json({error:"Unable to reach WeatherAPI."})}
});
app.get("/api/weather",async(req,res)=>{
 const city=String(req.query.city||"").trim();if(!city)return res.status(400).json({error:"Please enter a city or country."});
 if(!process.env.WEATHER_API_KEY)return res.status(500).json({error:"WEATHER_API_KEY is missing in server/.env"});
 try{const u=url("forecast");u.searchParams.set("q",city);u.searchParams.set("days","7");u.searchParams.set("aqi","no");u.searchParams.set("alerts","no");
  const r=await fetch(u),d=await r.json().catch(()=>({}));
  if(!r.ok)return res.status(r.status).json({error:d?.error?.message||"Location not found. Try another city."});
  res.json(d);
 }catch{res.status(500).json({error:"Unable to reach WeatherAPI."})}
});
app.listen(port,()=>console.log(`Skyly server running on http://localhost:${port}`));
