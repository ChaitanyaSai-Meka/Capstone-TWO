"use client";
import React, { useState } from "react";
import '../../globals.css';
import Navbar from "./navbar";
import Footer from "../../src/common/Footer";
import HotelListing from "../../src/components/HotelListing";

const Page = () => {
  const [searchLocation, setSearchLocation] = useState("");

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