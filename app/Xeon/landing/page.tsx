"use client";
import React, { useState, useEffect } from "react";
import '../../globals.css';
import Image from 'next/image';
import testimonials from "../../src/data/testimonialsData";
import { WobbleCard } from "../../src/components/ui/wobble-card";
import Footer from './footer';
import Navbar from "./navbar";

export default function LandingPage() {
    const [price, setPrice] = useState(0);
    const targetPrice = 20000;
    const duration = 1500; 

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            setPrice(Math.floor(progress * targetPrice));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        //main-div
        <div className="b h-full w-full">
            {/*Nav-Bar Div*/}
            {/* <div className="flex justify-between">
                <h1 className="mt-5 ml-20 text-3xl text-Paynes-Grey">
                    XEON
                </h1>
                <button className="px-8 py-2 rounded-full bg-gradient-to-b from-[#536878] to-[#3f535c] text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mt-5 mr-20">
                    Join the Elite
                </button>
            </div> */}
            <Navbar/>
            {/*Nav-Bar Div Ends*/}
            {/*Main-Section*/}
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20 mb-5">
                {/* Text Section */}
                <div className="text-center py-10 ml-25">
                    <h1 className="textsize font-bold text-black leading-tight">
                        <span className="block">Redefine hosting excellence</span>
                        <span className="block mt-2">Starts at
                            <span className="ml-4 mr-1 text-Paynes-Grey">₹{price.toLocaleString()}</span>/night</span>
                        <span className="block mt-2">Elevate your listing</span>
                    </h1>
                    <input className="px-5 py-3 text-lg border-1 border-gray-800 bg-transparent text-Paynes-Grey rounded-4xl w-[400px] placeholder-Paynes-Grey mt-5" placeholder="Search">

                    </input>
                </div>
                {/* Text Section Ends */}
                {/*Map-Section*/}
                <div className="mt-10 md:mt-0 md:ml-10 w-[650px] max-w-2xl h-[590px] rounded-3xl overflow-hidden shadow-lg mr-10">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13959.968813105776!2d77.09327359999999!3d28.98760205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1746121233820!5m2!1sen!2sin"
                        width="100%"
                        height="590"
                        style={{ border: '0' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
                {/*Map-Section-Ends*/}
            </div>
            {/*Main-Section-Ends*/}
            {/*Why Us?*/}
            <div>
                {/*heading*/}
                <h1 className="text-6xl flex justify-center why_us mt-30">
                    Why  <span className="text-Paynes-Grey ml-4">Us?</span>
                </h1>
                {/*Heading Ends*/}

                    {/*Cards Starts*/}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full mt-13 mb-3">
                        <WobbleCard
                            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
                            className=""
                        >
                            <div className="max-w-xs">
                                <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-Paynes-Grey">
                                    Host your property today — in minutes.
                                </h2>
                                <p className="mt-4 text-left text-base/6 text-black">
                                    From boutique stays to luxurious retreats, we make your property shine for the right audience.
                                </p>
                            </div>
                            <Image
                                src="/Images/hotel.png"
                                width={500}
                                height={500}
                                alt="linear demo image"
                                className="absolute -right-4 lg:-right-[20%] grayscale filter -bottom-15 object-contain rounded-2xl"
                            />
                        </WobbleCard>
                        <WobbleCard containerClassName="col-span-1 min-h-[300px]">
                            <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-Paynes-Grey">
                                No hassle, no stress, no delays.
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-black">
                                List your hotel with zero upfront cost. We handle the tech so you can focus on hospitality.
                            </p>
                        </WobbleCard>
                        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
                            <div className="max-w-sm">
                                <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-Paynes-Grey">
                                    We empower hotel owners across the globe.
                                </h2>
                                <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-black">
                                    Join hundreds of top-tier hosts who trust us to connect them with the right guests — fast, easy, and rewarding.
                                </p>
                            </div>
                            <Image
                                src="/Images/globe.png"
                                width={500}
                                height={500}
                                alt="linear demo image"
                                className="absolute -right-10 md:-right-[30%] lg:-right-[15%] -bottom-23 object-contain rounded-2xl"
                            />
                        </WobbleCard>
                    </div>
                    {/*Cards Ends*/}
            </div>
            {/*Why Us? Ends*/}
            {/*Our Parteners*/}
            <div>
                <h1 className="text-6xl flex justify-center partners mt-30">
                    Our
                    <span className="ml-4 mr-4 text-Paynes-Grey ">Elite</span>
                    Partners
                </h1>
                {/*Hotels-Logos*/}
                <div className="overflow-hidden w-full mt-20">
                    <div className="animate-infinite-scroll-logos gap-9">
                        <div className="flex gap-9">
                            <Image src="/Images/Aman_Resorts.svg.png" alt="Aman" width={200} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/Four_Seasons.png" alt="Four Seasons" width={190} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/mandarin-oriental.png" alt="Mandarin Oriental" width={210} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/ritz-carlton.png" alt="Ritz Carlton" width={200} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/Waldorf-Logo.webp" alt="Waldorf" width={200} height={120} style={{ objectFit: "contain", height: 120 }} />
                            <Image src="/Images/park-hyaat-logo.png" alt="Park Hyatt" width={220} height={130} style={{ objectFit: "contain", height: 130 }} />
                            <Image src="/Images/rosewood-hotels-resorts.png" alt="Rosewood" width={220} height={140} style={{ objectFit: "contain", height: 140 }} />
                            <Image src="/Images/bvlgari-hotels-resorts.png" alt="Bvlgari" width={220} height={140} style={{ objectFit: "contain", height: 140 }} />
                        </div>
                        <div className="flex gap-9">
                            <Image src="/Images/Aman_Resorts.svg.png" alt="Aman" width={200} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/Four_Seasons.png" alt="Four Seasons" width={190} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/mandarin-oriental.png" alt="Mandarin Oriental" width={210} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/ritz-carlton.png" alt="Ritz Carlton" width={200} height={100} style={{ objectFit: "contain", height: 100 }} />
                            <Image src="/Images/Waldorf-Logo.webp" alt="Waldorf" width={200} height={120} style={{ objectFit: "contain", height: 120 }} />
                            <Image src="/Images/park-hyaat-logo.png" alt="Park Hyatt" width={220} height={130} style={{ objectFit: "contain", height: 130 }} />
                            <Image src="/Images/rosewood-hotels-resorts.png" alt="Rosewood" width={220} height={140} style={{ objectFit: "contain", height: 140 }} />
                            <Image src="/Images/bvlgari-hotels-resorts.png" alt="Bvlgari" width={220} height={140} style={{ objectFit: "contain", height: 140 }} />
                        </div>
                    </div>
                </div>
                {/*Hotels-Logos-Ends*/}
            </div>
            {/*Our Parteners Ends*/}
            {/*Testimonials*/}
            <div>
                {/* Text Section */}
                <div className="flex items-center justify-center mt-10">
                    <h1 className="text-6xl text-center partners mt-8">
                        <span className="block mt-2">Behind every stay,</span>
                        <span className="block mt-2">a host with a
                            <span className="text-Paynes-Grey ml-3">vision.</span>
                        </span>
                    </h1>
                </div>
                {/* Text Section Ends */}
                {/* Cards Starts */}
                <div className="relative z-0 overflow-hidden mt-6 px-4 py-6">
                    <div className="absolute -z-10 text-[120px] font-bold text-Paynes-Grey opacity-25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        XEON.
                    </div>

                    <div className="animate-infinite-scroll gap-6">
                        {testimonials.concat(testimonials).map((testimonial, index) => (
                            <div
                                key={index}
                                className="glass min-w-[22rem] h-70 flex flex-col justify-between p-6 text-white"
                            >
                                <p className="italic text-base text-black font-semibold">“{testimonial.quote}”</p>
                                <div className="mt-4 font-semibold text-black">{testimonial.name}</div>
                                <div className="text-sm text-Paynes-Grey">{testimonial.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Cards Ends */}
            </div>
            {/*Testimonials-Ends*/}
            {/*Questions Section*/}
            <div className="flex flex-col items-center justify-center mt-10 space-y-12">
                <h1 className="text-6xl text-center partners">
                    <span className="block">The Knowledge</span>
                    <span className="text-Paynes-Grey block mt-2">Suite</span>
                </h1>

                {/* FAQ List */}
                <div className="w-full max-w-xl space-y-4">
                    <div className="border-b border-gray-300 pb-2">
                        <h2 className="text-2xl font-semibold flex justify-center">Top questions</h2>
                        <p className="text-lg font-medium mt-3">Is my hotel a fit for XEON?</p>
                        <p className="font-medium mt-3 opacity-25 mb-2">XEON curates an elite portfolio: from urbane boutique retreats to stately villas and heritage estates. If your property epitomizes unparalleled comfort and distinction, it belongs here.</p>
                        <p className="text-lg font-medium mt-3">Must I commit to perennial hosting?</p>
                        <p className="font-medium mt-3 opacity-25 mb-2">Not in the slightest. You dictate availability—whether you unveil your doors for a select weekend, an exclusive season, or indefinitely.</p>
                        <p className="text-lg font-medium mt-3">What fees does XEON levy?</p>
                        <p className="font-medium mt-3 opacity-25 mb-2">Listing is complimentary. Upon booking, XEON retains a modest 3 % commission on the reservation subtotal—no hidden charges. We seamlessly manage payment processing and, where applicable, oversee tax remittance.</p>
                    </div>
                    <div className="border-b border-gray-300 pb-2">
                        <h2 className="text-2xl font-semibold flex justify-center mt-5 mb-3">Policy & regulations</h2>
                        <p className="text-lg font-medium mt-3">Must I navigate local ordinances?</p>
                        <p className="font-medium mt-3 opacity-25 mb-2">Local jurisdictions often impose bespoke zoning statutes, licensing mandates, or association covenants. We advise a swift review of municipal codes—and, where prudent, consulting local counsel—to ensure flawless compliance.</p>
                        <p className="text-lg font-medium mt-3">What if I require further counsel?</p>
                        <p className="font-medium mt-3 opacity-25 mb-2">Our distinguished XEON host network stands ready to confer exclusive insights. Request a private consultation, and we’ll link you with a seasoned professional in your locale.</p>
                    </div>
                </div>
                {/* FAQ List Ends*/}


                {/* Still have questions? */}
                <div className="w-full max-w-md text-center space-y-4">
                    <h3 className="text-xl font-semibold">Still have questions?</h3>
                    <p className="text-gray-600">Get expert answers from a seasoned XEON host.</p>
                    <button className="mt-2 bg-Paynes-Grey text-white px-8 py-3 rounded-full mb-5">
                        Ask a host
                    </button>
                </div>
            </div>

            {/*Questions Section-Ends*/}

            {/*Footer Section*/}
            <div className="border-b-1 border-gray-300 pb-2"></div>
                <Footer/>
            {/*Footer Section Ends*/}
        </div>
        //main-div-ends
    )
}
