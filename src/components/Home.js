import React, { useEffect, useState } from "react";
import Location from "./Location";
import axios from "axios";

const Home = () => {
  //Makes an api call which returns an array of random users
  const [locationData, setLocationData] = useState([]);
  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=20")
      .then((res) => {
        setLocationData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Location data={locationData} />
    </>
  );
};

export default Home;
