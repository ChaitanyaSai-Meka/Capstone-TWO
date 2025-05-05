'use client';
import React from 'react'
import Navbar from './navbar';
import Footer from '../../src/common/Footer';

const Experiences = () => {

    return (
        <div>
            {/*Navbar Starts*/}
            <div> 
                <Navbar />
            </div>
            {/*Navbar Ends*/}
            <div className="py-200">

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