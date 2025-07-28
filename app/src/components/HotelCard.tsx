"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useUser } from "../lib/userContext";
import { addToFavorites, removeFromFavorites, isHotelFavorited } from "../lib/firestore";

interface HotelCardProps {
  image: string;
  name: string;
  rating: number;
  price: number;
  showGuestFavourite?: boolean;
  amenities?: string[];
  location?: string;
  hotelId?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ 
  image, 
  name, 
  rating, 
  price, 
  showGuestFavourite = true,
  amenities = [],
  location,
  hotelId
}) => {
  const { user } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && hotelId) {
        try {
          const favorited = await isHotelFavorited(user.uid, hotelId);
          setIsFavorited(favorited);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }
    };

    checkFavoriteStatus();
  }, [user, hotelId]);

  const handleFavoriteToggle = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (!user || !hotelId) return;

    setIsLoading(true);
    try {
      if (isFavorited) {
        await removeFromFavorites(user.uid, hotelId);
        setIsFavorited(false);
      } else {
        await addToFavorites(user.uid, {
          hotelId,
          name,
          image,
          rating,
          price,
          location: location || '',
          addedAt: new Date()
        });
        setIsFavorited(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative group cursor-pointer transition-transform duration-300 hover:scale-100">
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

        {/* Heart Button */}
        {user && (
          <button
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              isFavorited 
                ? 'bg-Paynes-Grey text-white shadow-lg' 
                : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-Paynes-Grey/10'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
          >
            <Heart 
              size={20} 
              className={isFavorited ? 'fill-current' : ''} 
            />
          </button>
        )}
      </div>
      
      {/* Hotel Details */}
      <div className="mt-3 space-y-2">
        <h3 className="font-medium text-gray-900 truncate">{name}</h3>
        
        {/* Location */}
        {location && (
          <p className="text-sm text-gray-500 truncate">{location}</p>
        )}
        
        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {amenities.slice(0, 2).map((amenity, index) => (
              <span 
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}
            {amenities.length > 2 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{amenities.length - 2} more
              </span>
            )}
          </div>
        )}
        
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