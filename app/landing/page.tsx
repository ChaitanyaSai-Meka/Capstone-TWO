import React from "react";
import '../globals.css'

export default function LandingPage() {
    return (
        //main-div
        <div className="bg-Pearl h-screen w-full">
            {/*Nav-Bar Div*/}
            <div className="flex justify-between">
            <h1 className="mt-5 ml-20 text-3xl text-Paynes-Grey">
                XEON
            </h1>
            <button className="px-8 py-2 rounded-full bg-gradient-to-b from-[#536878] to-[#3f535c] text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200 mt-5 mr-20">
                Join the Elite
            </button>
            </div>
            {/*Nav-Bar Div Ends*/}
            {/*Main-Section*/}
            <div className="flex flex-col md:flex-row items-center justify-between px-10 py-20">
                {/* Text Section */}
                <div className="text-center py-10 ml-25">
                    <h1 className="textsize font-bold text-black leading-tight">
                        <span className="block">Indulge in Timeless Luxury</span>
                        <span className="block mt-2">Starts at ₹20,000/night</span>
                        <span className="block mt-2">Unwind in Style</span>
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
        </div>
        //main-div-ends
    )
}
