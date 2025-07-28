import React, { useState } from 'react';
import app from '../lib/firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { createUserInFirestore, checkUsernameExists, reserveUsername } from '../lib/firestore';

interface LoginOrSignupProps {
  onSuccess?: () => void;
}

const Login_or_Signup: React.FC<LoginOrSignupProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  const auth = getAuth(app);

  function isFirebaseError(error: unknown): error is FirebaseError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof (error as { code?: unknown }).code === 'string'
    );
  }

  const handleEmailPasswordSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (isSignup) {

        if (!username.trim()) {
          setError('Username is required for sign up');
          return;
        }
        
        const usernameExists = await checkUsernameExists(username);
        if (usernameExists) {
          setError('Username already exists. Please choose a different one.');
          return;
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await reserveUsername(username, user.uid);
        
        await createUserInFirestore(email, username, password, user.uid);
        
        if (onSuccess) onSuccess();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        if (onSuccess) onSuccess();
      }
    } catch (error: unknown) {
      if (isFirebaseError(error)) {
        if (error.code === 'auth/email-already-in-use' && !isSignup) {
          setError('Email already exists. Please sign in instead.');
        } else if (error.code === 'auth/user-not-found') {
          setError('User not found. Please sign up first.');
        } else if (error.code === 'auth/wrong-password') {
          setError('Incorrect password. Please try again.');
        } else if (error.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters.');
        } else {
          setError(error.message || 'Authentication failed');
        }
      } else if (error instanceof Error) {
        setError(error.message || 'Authentication failed');
      } else {
        setError('Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-1 text-center">
        <h3 className="text-xl font-medium">Log in or sign up</h3>
      </div>
      <div className="border-b border-gray-300 pb-2 w-full"></div>
      <div className="mb-5 mt-4">
        <h1 className="text-2xl font-semibold">Welcome to 
          <span className='text-Paynes-Grey ml-1'>XEON
          </span>
        </h1>
      </div>
      
      {/* Toggle between Login and Signup */}
      <div className="flex mb-4 border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            !isSignup ? 'bg-Paynes-Grey text-white' : 'bg-white text-gray-600'
          }`}
          onClick={() => setIsSignup(false)}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors ${
            isSignup ? 'bg-Paynes-Grey text-white' : 'bg-white text-gray-600'
          }`}
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </button>
      </div>
      
      <form className="grid gap-5" onSubmit={handleEmailPasswordSignIn}>
        <div className="border border-gray-300 rounded-xl px-3 py-3">
          <input
            type="text"
            placeholder="you@gmail.com"
            className="w-full border-none focus:outline-none text-sm mt-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        
        {isSignup && (
          <div className="border border-gray-300 rounded-xl px-3 py-3">
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full border-none focus:outline-none text-sm mt-1"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required={isSignup}
            />
          </div>
        )}
        
        <div className="border border-gray-300 rounded-xl px-3 py-3">
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border-none focus:outline-none text-sm mt-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className='bg-Paynes-Grey py-2 text-white mb-3' style={{ borderRadius: '8px' }}
          type="submit"
          disabled={loading}
        >
          <p>{loading ? 'Loading...' : (isSignup ? 'Sign Up' : 'Sign In')}</p>
        </button>
      </form>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default Login_or_Signup;
