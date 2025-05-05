'use client'; 
import { useEffect, useState } from 'react';
import '../../globals.css';
import Link from 'next/link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`flex justify-between items-center sticky top-0 z-10 glass-navbar py-4 transition-all duration-300 ${
                isScrolled ? 'border-b border-gray-300 shadow-sm' : ''
            }`}
        >
            <h1 className="text-3xl text-Paynes-Grey ml-4 sm:ml-20">
                <Link href='/'>
                    XEON
                </Link>
            </h1>
            <button className="px-8 py-2 rounded-full bg-gradient-to-b from-[#536878] to-[#3f535c] text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mr-4 sm:mr-20">
                Join the Elite
            </button>
        </div>
    );
};

export default Navbar;