import React from 'react'
import Hero from '../components/Hero'
import PopularPackages from '../components/PopularPackages'
import CustomerReviews from '../components/CustomerReviews'
import WhyTravelWithUs from '../components/WhyTravelWithUs'
import ContactUs from '../components/ContactUs'

const Home = () => {
  return (
    <div className="font-sans ">
      <Hero />
      <PopularPackages />
      <WhyTravelWithUs />
      <CustomerReviews />
      <ContactUs />
    </div>
  )
}

export default Home