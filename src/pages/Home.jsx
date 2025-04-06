import React from 'react'
import Hero from '../components/Hero'
import PopularPackages from '../components/PopularPackages'
import ExploreByDestination from '../components/ExploreByDestination'
import CustomerReviews from '../components/CustomerReviews'

const Home = () => {
  return (
    <div className="font-sans ">
      <Hero/>
      <PopularPackages/>
      <ExploreByDestination/>
      <CustomerReviews/>
    </div>
  )
}

export default Home