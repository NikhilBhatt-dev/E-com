import React from 'react'
import {assets} from '../assets/assets'

const Hero = () => {
  return (
    <div className='home-hero flex flex-col sm:flex-row border border-gray-400'>
      
      {/* Left Side Hero */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        
        <div className='home-hero-copy text-[#414141]'>
          
          <div className='flex items-center gap-2'>
            
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            
            <p className='font-medium text-sm md:text-base'>Our Bestseller
            </p>

          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest In Fashion</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>Shop Now </p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>

        </div>

      </div>

      {/* hero right Side */}
      {/* <img src={assets.hero_img} alt="hero_img" className='w-full sm:w-1/2' /> */}
      
      <img
        src={assets.hero_img}
        className='w-fit sm:w-1/2'
        alt=""
      />

    </div>
  )
}

export default Hero
