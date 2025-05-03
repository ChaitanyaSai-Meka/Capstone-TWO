'use client';
import React from 'react';
import "../../globals.css";
import { HoverBorderGradient } from '../../src/components/ui/hover-border-gradient';

export default function Black_LandingPage() {
  return (
    <div className='bg-black'>
      {/* Navbar */}
      <div className="flex justify-between mb-2 mt-2">
        <div className="text-white ml-15 xeon-logo">
          <p>XEON</p>
        </div>
        <div className="mr-15">
          <HoverBorderGradient>Join Us</HoverBorderGradient>
        </div>
      </div>

      {/* Top Line */}
      <div className="w-full h-px l_css" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        {/* Text Section */}
        <div className="max-w-xl md:ml-10 text-center">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text">
              Stay where luxury begins —
            </span>
            <span className="shimmer-gold font-semibold"> ₹20,000</span>
            <span className="block bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text">
              on average / night
            </span>
          </h1>
        </div>

        {/* Google Map Embed */}
        <div className="mt-10 md:mt-0 md:ml-10 w-full max-w-2xl h-[590px] rounded-3xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13959.757208919562!2d77.09096965!3d28.9891696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1746076695248!5m2!1sen!2sin"
            width="100%"
            height="590"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div>
        <h1 className="text-6xl flex justify-center partners mt-8">
          <span className='bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text'>Our</span>
          <span className="ml-4 mr-4 shimmer-gold ">Elite</span>
          <span className='bg-gradient-to-b from-neutral-200 to-neutral-500 text-transparent bg-clip-text'>Partners</span>
        </h1>
      </div>
    </div>
  );
}