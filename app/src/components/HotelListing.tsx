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
  location: string;
}

interface HotelListingProps {
  searchLocation: string;
}

const HotelListing: React.FC<HotelListingProps> = ({ searchLocation }) => {
  const [allHotels, setAllHotels] = useState<Hotel[]>([]);
  const popularScrollRef = useRef<HTMLDivElement>(null);
  const otherScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('/hotels.json');
        const data = await response.json();
        setAllHotels(data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  const filteredHotels = searchLocation.trim()
    ? allHotels.filter(
        hotel =>
          hotel.location &&
          hotel.location.toLowerCase().includes(searchLocation.trim().toLowerCase())
      )
    : allHotels;

  if (typeof window !== 'undefined') {
    console.log('Search location:', searchLocation);
    console.log('Filtered hotels:', filteredHotels.length);
  }

  const filteredPopularHotels = filteredHotels.filter(hotel => hotel.rating > 4.5);
  const filteredOtherHotels = filteredHotels.filter(hotel => hotel.rating <= 4.5);

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
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] py-16">
        <span className="w-10 h-10 mb-4 border-4 border-[#536878] border-t-transparent rounded-full animate-spin"></span>
        <span className="text-[#536878] font-medium text-lg">Loading hotels...</span>
      </div>
    );
  }

  if (filteredHotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] py-16">
        <span className="text-[#536878] font-medium text-lg">No hotels found in &apos;{searchLocation.trim()}&apos;</span>
      </div>
    );
  }

  if (searchLocation.trim()) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Hotels in {searchLocation.trim()}
          </h2>
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              image={hotel.image}
              name={hotel.name}
              rating={hotel.rating}
              price={hotel.price}
              showGuestFavourite={hotel.rating > 4.5}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Popular Hotels Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {searchLocation.trim()
                ? `Hotels in ${searchLocation.trim()}`
                : 'Popular hotels'}
            </h2>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>
          
          {/* Navigation Arrows - Only show if more than 4 hotels */}
          {filteredPopularHotels.length > 4 && (
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
            ' no-scrollbar' 
          }
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowY: 'hidden' }}
        >
          {filteredPopularHotels.map((hotel) => (
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
      {filteredOtherHotels.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchLocation.trim()
                  ? `Other hotels in ${searchLocation.trim()}`
                  : 'Other hotels'}
              </h2>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
            {/* Navigation Arrows - Only show if more than 4 hotels */}
            {filteredOtherHotels.length > 4 && false && (
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
            {filteredOtherHotels.map((hotel) => (
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