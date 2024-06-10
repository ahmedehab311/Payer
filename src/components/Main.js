import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Prayer from "./Prayer";
import axios from "axios";

function Main() {
  const [data, setData] = useState(null);
  const [latitude, setLatitude] = useState(51.75865125);
  const [longitude, setLongitude] = useState(-1.25387785);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [timezone, setTimezone] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await axios.get("/countries.json");
      const countriesData = response.data;

      countriesData.sort((a, b) => a.name.localeCompare(b.name));

      setCountries(countriesData);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const getTiming = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}`
      );
      setData(response.data.data);
      setTimezone(response.data.data.meta.timezone);
    } catch (error) {
      console.error("Error fetching prayer timings:", error);
    }
  };

  const handleCountryChange = (event) => {
    const country = countries.find((c) => c.name === event.target.value);
    if (country) {
      setLatitude(country.latitude);
      setLongitude(country.longitude);
      getTiming(country.latitude, country.longitude);
    }
    setSelectedCountry(event.target.value);
  };

  useEffect(() => {
    fetchCountries();
    getTiming(latitude, longitude);
  }, [latitude, longitude]);

  if (!data) {
    return (
      <div className="loading">...Loading</div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="select-container">
          <select
            className="country-select"
            onChange={handleCountryChange}
            value={selectedCountry}
          >
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <Grid container>
          <Grid xs={6}>
            <div className="all">
              <div>
                <h1 className="place">Place: {timezone}</h1>
              </div>
            </div>
          </Grid>
          <Grid xs={6}>
            <div>
              <h2 className="hijri-date">
                {data.date.hijri.day} {data.date.hijri.month.ar}
                <span> {data.date.hijri.year} </span>
              </h2>
            </div>
            <div>
              <h2 className="gregorian-date">
                {data.date.gregorian.weekday.en}. {data.date.gregorian.day}{" "}
                {data.date.gregorian.month.en}
              </h2>
            </div>
          </Grid>
        </Grid>
        <Divider style={{ borderColor: "black", opacity: "0.1" }} />

        <Box style={{ display: "flex" }}>
          <Prayer name={"Fajr"} time={data.timings.Fajr} />
          <Prayer name={"Sunrise"} time={data.timings.Sunrise} />
          <Prayer name={"Dhuhr"} time={data.timings.Dhuhr} />
          <Prayer name={"Asr"} time={data.timings.Asr} />
          <Prayer name={"Maghrib"} time={data.timings.Maghrib} />
          <Prayer name={"Isha"} time={data.timings.Isha} />
        </Box>
      </div>
    </>
  );
}

export default Main;
