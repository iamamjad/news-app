"use client";
import React, { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import Hero from "../components/Hero";
import Head from "next/head";
const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Dashboard </title>
      </Head>
      <Hero />
      {user && <h1 className="text-center">Welcome, {user.name}!</h1>}
    </>
  );
};

export default DashboardPage;
