'use client';
import React,{useState} from 'react'
import { User, Menu } from 'lucide-react';
import Link from 'next/link';
import '../../globals.css';
import Login_or_Signup from '@/app/src/common/login_or_signup';

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div >
      {/*Top Nav*/}
      <div className='flex'>
        <div>
          <h1 className="text-4xl text-Paynes-Grey mt-5 sm:ml-20">
            X
          </h1>
        </div>
        <div className='flex gap-4 mt-5 sizing ml-135 mr-[339px]'>
          <button className='font-regular px-4 py-2 hover:bg-gray-200 hover:px-4 hover:py-2  hover:rounded-3xl opacity-50 hover:opacity-70'>
            <Link href="/Xeon/home">
                Home
            </Link>
          </button>
          <button className='font-medium px-4 py-2  hover:px-4 hover:py-2 hover:rounded-3xl '>
            <Link href='/Xeon/experiences'>
                Experiences
            </Link>
          </button>
        </div>
        <div className='flex gap-4'>
          <h1 className='mt-5 size-join font-medium'>
            <button className="px-4 py-2 hover:bg-gray-200 hover:px-4 hover:py-2  hover:rounded-3xl">
              <Link href="/Xeon/landing">
                Join the Elite
              </Link>
            </button>
          </h1>
          <button className='button-style mt-4 px-4 py-1 button'
          onClick={() => setShowLogin(true)}
          >
            <div className='flex gap-4'>
              <Menu style={{ objectFit: "contain", height: 18 }} className='mt-2' />
              <User style={{ objectFit: "contain", height: 32 }} />
            </div>
          </button>
        </div>
      </div>
      {/*Top Nav Ends*/}
      {/*bottom Nav */}
      <div className="flex justify-center py-5">
  <div className="border border-gray-300 rounded-full px-4 py-2 flex items-center gap-4 w-[700px] bg-white shadow-md">
    <div className="flex-1">
      <input
        className="w-full px-2 mr-30 py-1 text-sm placeholder-gray-500 focus:outline-none"
        type="text"
        placeholder="Where"
      />
      <div className="text-xs text-gray-500 ml-2">Search destinations</div>
    </div>
    <div className="border-l border-gray-300 h-8"></div>
    <div className="flex-1">
      <input
        className="w-full px-1 py-1 text-sm placeholder-gray-500 focus:outline-none"
        type="text"
        placeholder="Date"
      />
      <div className="text-xs text-gray-500 ml-1">Add dates</div>
    </div>
    <div className="border-l border-gray-300 h-8"></div>
    <div className="flex-1 flex items-center justify-between">
      <div>
        <input
          className="w-full px-2 mr-30 py-1 text-sm placeholder-gray-500 focus:outline-none"
          type="text"
          placeholder="Who"
        />
        <div className="text-xs text-gray-500 ml-2">Add guests</div>
      </div>
      <button className="bg-Paynes-Grey text-white rounded-full p-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
      {/*bottom Nav Ends*/}
      <div className="border-b-1 border-gray-300 pb-2"></div>
      {showLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center glass-2"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="relative w-full max-w-md mx-auto rounded-2xl shadow-lg p-6 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Login_or_Signup />
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar