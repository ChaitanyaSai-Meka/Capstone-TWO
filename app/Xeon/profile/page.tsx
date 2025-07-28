'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '@/app/src/lib/firebase';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/src/lib/userContext';
import { getUserFavorites, FavoriteHotel } from '@/app/src/lib/firestore';
import HotelCard from '@/app/src/components/HotelCard';

const Profile = () => {
  const router = useRouter();
  const { user, userData, loading, refreshUserData } = useUser();
  const [favoriteHotels, setFavoriteHotels] = useState<FavoriteHotel[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const favorites = await getUserFavorites(user.uid);
          setFavoriteHotels(favorites);
        } catch (error) {
          console.error('Error fetching favorites:', error);
        } finally {
          setLoadingFavorites(false);
        }
      }
    };

    fetchFavorites();
  }, [user]);

  // Refresh user data if not available
  useEffect(() => {
    if (user && !userData && !loading) {
      refreshUserData();
    }
  }, [user, userData, loading, refreshUserData]);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.push('/Xeon/home');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="w-8 h-8 border-4 border-Paynes-Grey border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }



  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Not logged in.</p>
          <button
            onClick={() => router.push('/Xeon/home')}
            className="px-6 py-2 bg-Paynes-Grey text-white rounded-lg hover:bg-gray-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const email = user.email || '';
  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            className="text-Paynes-Grey text-lg font-semibold cursor-pointer hover:text-gray-700 transition"
            onClick={() => router.push('/Xeon/home')}
          >
            {'< Back to Home'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-Paynes-Grey to-gray-600 flex items-center justify-center text-4xl font-bold text-white mb-6">
              <span>{initial}</span>
            </div>
            
            {/* User Info */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {userData?.username || user.displayName || 'User'}
            </h1>
            <p className="text-gray-600 mb-6">{email}</p>
          </div>
        </div>

        {/* Favorites Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Favorite Hotels</h2>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-Paynes-Grey text-white rounded-lg hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>

          {loadingFavorites ? (
            <div className="flex justify-center items-center py-12">
              <span className="w-8 h-8 border-4 border-Paynes-Grey border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : favoriteHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteHotels.map((hotel) => (
                <HotelCard
                  key={hotel.hotelId}
                  image={hotel.image}
                  name={hotel.name}
                  rating={hotel.rating}
                  price={hotel.price}
                  showGuestFavourite={hotel.rating > 4.5}
                  location={hotel.location}
                  hotelId={hotel.hotelId}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No favorite hotels yet</h3>
              <p className="text-gray-500 mb-6">Start exploring hotels and add them to your favorites!</p>
              <button
                onClick={() => router.push('/Xeon/home')}
                className="px-6 py-2 bg-Paynes-Grey text-white rounded-lg hover:bg-gray-700 transition"
              >
                Explore Hotels
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;