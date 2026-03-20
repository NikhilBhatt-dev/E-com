import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLatter from '../components/NewsLatter'

const Home = ({ theme }) => {
  return (
    <div className={`home-page ${theme === 'dark' ? 'home-page-dark' : 'home-page-light'}`}>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLatter />
    </div>
      )
}

export default Home
