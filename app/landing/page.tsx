import React from 'react';
import "../globals.css";
import { HoverBorderGradient } from '../src/components/ui/hover-border-gradient';

export default function LandingPage() {
  return (
    <div>
      {/* Navbar */}
      <div className='flex justify-between mb-2 mt-2'>
        <div className='text-white ml-15 xeon-logo'>
          <p>XEON</p>
        </div>
        <div className='mr-15'>
          <HoverBorderGradient>
            Join Us
          </HoverBorderGradient>
        </div>
      </div>

      {/* Top Line */}
      <div className="w-full h-px b_css" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
        {/* Text Section */}
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Stay where luxury begins —
            <span className="text-rose-600"> ₹20,000</span> on average
          </h1>
        </div>

        {/* Google Map Embed */}
        <div className="mt-10 md:mt-0 md:ml-10 w-full max-w-md h-[450px] rounded-3xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13959.968813105776!2d77.09327359999999!3d28.98760205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1746028187412!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
