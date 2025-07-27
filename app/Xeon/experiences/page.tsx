'use client';
import React, { useEffect } from 'react'
import Navbar from './navbar';
import Footer from '../../src/common/Footer';
import Lenis from 'lenis';

const Experiences = () => {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div>
            {/*Navbar Starts*/}
            <div> 
                <Navbar />
            </div>
            {/*Navbar Ends*/}
            <div className="flex justify-center items-center py-100">
                <h2 className="text-3xl font-semibold text-Paynes-Grey">Coming Soon...</h2>
            </div>
            {/*Footer*/}
            <div className="border-b-1 border-gray-300 pb-2"></div>
            <div>
                <Footer />
            </div>
            {/*Footer Ends*/}
        </div>
    )
}

export default Experiences;