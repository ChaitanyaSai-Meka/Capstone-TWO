'use client';
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import app from '@/app/src/lib/firebase';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.push('/Xeon/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-semibold mb-6">Profile Page</h2>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-Paynes-Grey text-white rounded-lg hover:bg-gray-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;