"use client";
import React, { useState, useEffect } from "react";
import '../../globals.css';
import Navbar from "./navbar";
import Footer from "../../src/common/Footer";
import HotelListing from "../../src/components/HotelListing";
import Lenis from "lenis";

const Page = () => {
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="h-full w-full">
      {/*Navbar*/}
        <div>
          <Navbar searchLocation={searchLocation} setSearchLocation={setSearchLocation} />
        </div>  
      {/*Navbar Ends*/}
        <div className="py-8">
          <HotelListing searchLocation={searchLocation} />
        </div> 
      {/*Footer*/}
      <div className="border-b-1 border-gray-300 pb-2"></div>
        <div>
          <Footer/>
        </div>
      {/*Footer Ends*/}
    </div>
  )
}

export default Page