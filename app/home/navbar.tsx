import React from 'react'
import { User,Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <div>
          {/*Top Nav*/}
            <div className='flex gap-120'>
              <div>
                  <h1 className="text-4xl text-Paynes-Grey ml-4 mt-5 sm:ml-20">
                      X
                  </h1>
              </div>
              <div className='flex gap-11 mt-7 sizing'>
                <h1 className='font-medium'>
                  Home
                </h1>
                <h1 className='font-medium'>
                  Experiences
                </h1>
              </div>
              <div className='flex mr-25 gap-11'>
                <h1 className='mt-7 size-join font-medium'>
                  Join
                </h1>
                <button className='button-style mt-5 px-3 py-1'>
                  <div className='flex gap-4'>
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
    </div>
  )
}

export default Navbar