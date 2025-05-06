import React from 'react';
import Image from 'next/image';


const Login_or_Signup = () => {
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
      <div className="grid gap-5">
        <div className="border border-gray-300 rounded-xl px-3 py-3">
          <input
            type="text"
            placeholder="you@example.com"
            className="w-full border-none focus:outline-none text-sm mt-1"
          />
        </div>

        <div className="border border-gray-300 rounded-xl px-3 py-3">
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border-none focus:outline-none text-sm mt-1"
          />
        </div>
        <button className='bg-Paynes-Grey py-2 text-white mb-3' style={{ borderRadius: '8px' }}>
          <p>Continue</p>
        </button>
      </div>
      <div className="flex items-center w-full">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-4">
          <p className="text-gray-600">or</p>
        </div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <button
        className="w-full flex items-center justify-center border border-gray-400 rounded-lg py-2 hover:bg-gray-100 transition duration-200 mt-3"
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google logo"
          width={20}
          height={20}
          className="mr-3"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default Login_or_Signup;
