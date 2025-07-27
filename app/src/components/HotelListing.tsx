"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import HotelCard from "./HotelCard";

interface Hotel {
  id: number;
  image: string;
  name: string;
  rating: number;
  price: number;
}

const HotelListing: React.FC = () => {
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const [popularHotels, setPopularHotels] = useState<Hotel[]>([]);
  const [otherHotels, setOtherHotels] = useState<Hotel[]>([]);
  const popularScrollRef = useRef<HTMLDivElement>(null);
  const otherScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/hotels.json');
        const data = await response.json();
        setAllHotels(data);
        
        // Filter popular hotels (rating > 4.5)
        const popular = data.filter((hotel: Hotel) => hotel.rating > 4.5);
        setPopularHotels(popular);
        
        // Filter other hotels (rating <= 4.5)
        const other = data.filter((hotel: Hotel) => hotel.rating <= 4.5);
        setOtherHotels(other);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  const scrollPopularLeft = () => {
    if (popularScrollRef.current) {
      popularScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollPopularRight = () => {
    if (popularScrollRef.current) {
      popularScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const scrollOtherLeft = () => {
    if (otherScrollRef.current) {
      otherScrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollOtherRight = () => {
    if (otherScrollRef.current) {
      otherScrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  if (allHotels.length === 0) {
    return <div className="text-center py-8">Loading hotels...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Popular Hotels Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Popular hotels
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
          
          {/* Navigation Arrows - Only show if more than 4 hotels */}
          {popularHotels.length > 4 && (
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPopularLeft}
                className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollPopularRight}
                className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Popular Hotels Grid */}
        <div 
          ref={popularScrollRef}
          className={
            'flex gap-6 overflow-x-auto' +
            ' no-scrollbar' // ensure no visible scrollbar
          }
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'hidden' }}
        >
          {popularHotels.map((hotel) => (
            <div key={hotel.id} className={'flex-shrink-0 w-80'}>
              <HotelCard
                image={hotel.image}
                name={hotel.name}
                rating={hotel.rating}
                price={hotel.price}
                showGuestFavourite={true}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Other Hotels Section */}
      {otherHotels.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Other hotels
              </h2>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
            {/* Navigation Arrows - Only show if more than 4 hotels */}
            {otherHotels.length > 4 && false && (
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollOtherLeft}
                  className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={scrollOtherRight}
                  className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Other Hotels Grid */}
          <div 
            className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'}
          >
            {otherHotels.map((hotel) => (
              <div key={hotel.id}>
                <HotelCard
                  image={hotel.image}
                  name={hotel.name}
                  rating={hotel.rating}
                  price={hotel.price}
                  showGuestFavourite={false}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelListing; 