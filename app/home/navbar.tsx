import React from 'react'
import { User,Menu } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
          {/*Top Nav*/}
            <div className='flex justify-center'>
              <div>
                  <h1 className="text-4xl text-Paynes-Grey mt-5 sm:ml-20">
                      X
                  </h1>
              </div>
              <div className='flex gap-9 mt-7 sizing'>
                <h1 className='font-medium'>
                  Home
                </h1>
                <h1 className='font-medium'>
                  Experiences
                </h1>
              </div>
              <div className='flex gap-4'>
                <h1 className='mt-5 size-join font-medium'>
                  <button className="px-4 py-2 hover:bg-gray-200 hover:px-4 hover:py-2 hover:opacity40 hover:rounded-3xl">
                    <Link href="/landing">
                      Join the Elite
                    </Link>
                  </button>
                </h1>
                <button className='button-style mt-4 px-3 py-1'>
                  <div className='flex gap-3'>
                    <Menu style={{ objectFit: "contain", height: 18}} className='mt-2'/>
                    <User style={{ objectFit: "contain", height: 32}}/>
                  </div>
                </button>
              </div>
            </div>
          {/*Top Nav Ends*/}
          {/*bottom Nav */}
            <div>
              
            </div>
          {/*bottom Nav Ends*/}
          <div className="border-b-1 border-gray-300 pb-2"></div>
    </div>
  )
}

export default Navbar