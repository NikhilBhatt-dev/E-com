import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLatter from '../components/NewsLatter'

const About = () => {
  return (

    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About '} text2={'Us'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="About us" />

        <div className='flex flex-col gap-6 justify-center md:w-2/4'>

          <p>
            We are passionate about delivering high-quality products that combine style, comfort, and affordability.
            Our goal is to create a seamless shopping experience where customers can find exactly what they need with ease.
          </p>

          <p>
            From carefully curated collections to fast and reliable service, we focus on every detail to ensure customer satisfaction.
            We believe in innovation, trust, and building long-term relationships with our customers.
          </p>

          <b className='text-gray-800'>Our Mission</b>

          <p>
            Our mission is to provide premium quality products while maintaining exceptional customer service.
            We aim to make online shopping simple, enjoyable, and accessible for everyone.
          </p>

        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'Why '} text2={'Choose Us'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm my-20'>

        <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance :</b>
          <p className='text-gray-600'>
            We ensure that every product meets high-quality standards before reaching our customers.
            Your satisfaction and trust are our top priorities.
          </p>
        </div>

        <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience :</b>
          <p className='text-gray-600'>
            Enjoy a smooth and hassle-free shopping experience with easy navigation, secure payments,
            and quick delivery services.
          </p>
        </div>

        <div className='border border-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service :</b>
          <p className='text-gray-600'>
            Our support team is always ready to help you with any queries or issues, ensuring a pleasant experience every time.
          </p>
        </div>

      </div>

      <div className='mt-20'>
        <NewsLatter />
      </div>

    </div>

  )
}

export default About