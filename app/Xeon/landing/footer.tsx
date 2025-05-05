import '../../globals.css';

const Footer = () => {
    return (
        <div className='mt-5 '>
            <div className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <p className="text-Paynes-Grey font-semibold text-lg mb-4">
                        Our Hosts. Your Standard.
                    </p>
                    <div className="text-sm text-gray-600 leading-relaxed space-y-3">
                        <p>
                            Partners on the Xeon Prestige Network uphold exceptional ratings, unmatched reliability, and a legacy of premium hospitality. Reviews reflect guest experiences across listings they manage — each shaped by a commitment to excellence.
                        </p>
                        <p>
                            The Xeon Prestige Network is a signature initiative by Xeon Global Technologies Pvt. Ltd., available exclusively in select high-demand regions.
                            <br />
                            <a href="#" className="underline hover:text-gray-800 transition">Discover more →</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm text-gray-700 ml-30 mb-10">
                <div>
                    <h2 className="text-Paynes-Grey font-semibold mb-3">Support</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:underline">Cancellation Options</a></li>
                        <li><a href="#" className="hover:underline">Disability Assistance</a></li>
                        <li><a href="#" className="hover:underline">Guest Safety</a></li>
                        <li><a href="#" className="hover:underline">Report an Issue</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-Paynes-Grey font-semibold mb-3">For Hosts</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Start Hosting</a></li>
                        <li><a href="#" className="hover:underline">Hosting Tools & Resources</a></li>
                        <li><a href="#" className="hover:underline">Responsible Hosting</a></li>
                        <li><a href="#" className="hover:underline">Join the Xeon Network</a></li>
                        <li><a href="#" className="hover:underline">Xeon LUXE Collection</a></li>
                        <li><a href="#" className="hover:underline">Xeon Sakura Properties</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-Paynes-Grey font-semibold mb-3">Discover</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">Curated Experiences</a></li>
                        <li><a href="#" className="hover:underline">Xeon LUXE – Engineered for Elegance</a></li>
                        <li><a href="#" className="hover:underline">Xeon Sakura – A Touch of Japan’s Finest</a></li>
                        <li><a href="#" className="hover:underline">Cultural Escapes</a></li>
                        <li><a href="#" className="hover:underline">Urban Retreats</a></li>
                        <li><a href="#" className="hover:underline">Nature & Tranquility</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-Paynes-Grey font-semibold mb-3">Xeon</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Newsroom</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Partner With Us</a></li>
                        <li><a href="#" className="hover:underline">Investor Relations</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-b border-gray-300 pb-2"></div>
            <div className="flex mt-3 text-Paynes-Grey opacity-70 gap-3 text-sm ml-20 font-thin pb-6">
            <p className="hover:underline">©2025 XEON, Inc</p>
            <li className="hover:underline ">Privacy</li>
            <li className="hover:underline ">Terms</li>
            <li className="hover:underline ">Company Details</li>
            </div>
        </div>
    )
}

export default Footer