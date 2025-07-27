'use client';
import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged, User } from 'firebase/auth';
import app from '@/app/src/lib/firebase';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(app);
    await signOut(auth);
    router.push('/Xeon/home');
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[60vh]">Loading...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center min-h-[60vh]">Not logged in.</div>;
  }

  const email = user.email || '';
  const initial = email.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center min-h-[60vh] w-full max-w-md mx-auto pt-12 pb-8 relative">
      {/* Home Link Top Left */}
      <button
        className="absolute top-6 left-6 text-Paynes-Grey text-lg font-semibold cursor-pointer"
        onClick={() => router.push('/Xeon/home')}
      >
        {'< home'}
      </button>
      {/* Profile Circle Centered */}
      <div className="flex justify-center w-full mb-6">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-5xl font-bold mb-2">
          <span className="text-Paynes-Grey">{initial}</span>
        </div>
      </div>
      {/* User Info Below */}
      <div className="w-full flex flex-col items-center mb-8">
        <div className="font-semibold text-xl mb-4 text-center w-full">{user.displayName || 'Chaitanya Sai Meka'}</div>
        <div className="w-full max-w-xs flex flex-col gap-4">
          <div className="text-gray-600"><b>Email:</b> {email}</div>
          <div className="text-gray-600"><b>Username:</b> {user.displayName ? user.displayName.replace(/\s+/g, '').toLowerCase() : 'Chaitanya'}</div>
          <div className="text-gray-600 mt-2"><b>About:</b> <span className="font-normal">This is your bio. Edit your profile to add more info!</span></div>
        </div>
      </div>
      {/* Spacer to push logout to bottom */}
      <div className="flex-grow" />
      {/* Logout Button Centered at End */}
      <div className="w-full flex justify-center">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-Paynes-Grey text-white rounded-lg hover:bg-gray-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;