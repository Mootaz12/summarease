"use client";
import Demo from "@/components/Demo";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { store } from "@/services/store";
import React from "react";
import { Provider } from "react-redux";

const Home = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <main className="flex flex-col gap-10 justify-center items-center m-10">
        <Hero />
        <Demo />
      </main>
    </Provider>
  );
};

export default Home;
