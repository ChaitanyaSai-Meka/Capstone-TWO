"use client";
import React from "react";
import Image from "next/image";

interface HotelCardProps {
  image: string;
  name: string;
  rating: number;
  price: number;
  showGuestFavourite?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ image, name, rating, price, showGuestFavourite = true }) => {
  return (
    <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-105">
      {/* Hotel Image */}
      <div className="relative overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={name}
          width={400}
          height={256}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Guest Favourite Badge */}
        {showGuestFavourite && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full text-gray-800">
              Guest favourite
            </span>
          </div>
        )}
      </div>
      
      {/* Hotel Details */}
      <div className="mt-3 space-y-1">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>₹{price.toLocaleString()} for 1 nights</span>
          <span className="flex items-center gap-1">
            <span>★</span>
            <span>{rating.toFixed(1)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HotelCard; 