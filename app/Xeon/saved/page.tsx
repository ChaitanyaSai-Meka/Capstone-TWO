'use client';
import React, { useState, useEffect } from 'react';
import { useUser } from '@/app/src/lib/userContext';
import { getUserFavorites, FavoriteHotel } from '@/app/src/lib/firestore';
import { useRouter } from 'next/navigation';
import { Heart, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

const SavedPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteHotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const userFavorites = await getUserFavorites(user.uid);
          setFavorites(userFavorites);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your favorites</h2>
          <p className="text-gray-600 mb-6">You need to be signed in to see your saved hotels.</p>
          <button
            onClick={() => router.push('/Xeon/home')}
            className="bg-Paynes-Grey text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-10 h-10 mb-4 border-4 border-Paynes-Grey border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-Paynes-Grey font-medium">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/Xeon/home')}
          className="p-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Favorites</h1>
          <p className="text-gray-600 mt-1">
            {favorites.length} {favorites.length === 1 ? 'hotel' : 'hotels'} saved
          </p>
        </div>
      </div>

      {/* Favorites Grid */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Heart className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            Start exploring hotels and save your favorites by clicking the heart icon on any hotel card.
          </p>
          <button
            onClick={() => router.push('/Xeon/home')}
            className="bg-Paynes-Grey text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Explore Hotels
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((hotel) => (
            <div key={hotel.hotelId} className="relative group cursor-pointer transition-transform duration-300 hover:scale-100">
              {/* Hotel Image */}
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                
                {/* Favorited Badge */}
                <div className="absolute top-3 right-3">
                  <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                    <Heart size={20} className="fill-current" />
                  </div>
                </div>
              </div>
              
              {/* Hotel Details */}
              <div className="mt-3 space-y-2">
                <h3 className="font-medium text-gray-900 truncate">{hotel.name}</h3>
                
                {/* Location */}
                {hotel.location && (
                  <p className="text-sm text-gray-500 truncate">{hotel.location}</p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>₹{hotel.price.toLocaleString()} for 1 nights</span>
                  <span className="flex items-center gap-1">
                    <span>★</span>
                    <span>{hotel.rating.toFixed(1)}</span>
                  </span>
                </div>
                
                {/* Added Date */}
                <p className="text-xs text-gray-400">
                  Added {new Date(hotel.addedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;