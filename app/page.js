"use client";
const metadata = {
  title: "Home",
};
import React from "react";
import Hero from "./components/Hero";
import Listing from "./components/Listing";
const Home = () => {
  return (
    <>
      <Hero></Hero>
      <Listing></Listing>
    </>
  );
};

export default Home;
