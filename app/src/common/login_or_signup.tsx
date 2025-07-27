import React, { useState } from 'react';
import app from '../lib/firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

interface LoginOrSignupProps {
  onSuccess?: () => void;
}

const Login_or_Signup: React.FC<LoginOrSignupProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      // Try to create the user first
      await createUserWithEmailAndPassword(auth, email, password);
      if (onSuccess) onSuccess();
    } catch (signupErr: unknown) {
      if (isFirebaseError(signupErr)) {
        if (signupErr.code === 'auth/email-already-in-use') {
          // If user exists, try to sign in
          try {
            await signInWithEmailAndPassword(auth, email, password);
            if (onSuccess) onSuccess();
          } catch (err: unknown) {
            if (isFirebaseError(err) && err.code === 'auth/wrong-password') {
              setError('Incorrect password. Please try again.');
            } else if (err instanceof Error) {
              setError(err.message || 'Failed to sign in');
            } else {
              setError('Failed to sign in');
            }
          }
        } else if (signupErr.code === 'auth/weak-password') {
          setError('Password should be at least 6 characters.');
        } else {
          setError(signupErr.message || 'Failed to sign up');
        }
      } else if (signupErr instanceof Error) {
        setError(signupErr.message || 'Failed to sign up');
      } else {
        setError('Failed to sign up');
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
          <p>{loading ? 'Loading...' : 'Continue'}</p>
        </button>
      </form>
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
};

export default Login_or_Signup;
