"use client";
import React from "react";
import '../../globals.css';
import Navbar from "./navbar";
import Footer from "../../src/common/Footer";
import HotelListing from "../../src/components/HotelListing";

const page = () => {
  return (
    <div className="h-full w-full">
      {/*Navbar*/}
        <div>
          <Navbar/> 
        </div>  
      {/*Navbar Ends*/}
        <div className="py-8">
          <HotelListing />
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

export default page