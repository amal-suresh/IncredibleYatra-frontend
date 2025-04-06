import React from 'react'

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-[#E6E6FA]">
        <h2 className="text-3xl font-bold text-center text-[#191970] mb-10">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto text-center">
          <div>
            <FaUserCheck className="mx-auto text-4xl text-[#191970] mb-4" />
            <h4 className="font-semibold text-lg">Trusted Partners</h4>
          </div>
          <div>
            <FaStar className="mx-auto text-4xl text-[#191970] mb-4" />
            <h4 className="font-semibold text-lg">5-Star Support</h4>
          </div>
          <div>
            <FaMoneyBillWave className="mx-auto text-4xl text-[#191970] mb-4" />
            <h4 className="font-semibold text-lg">Affordable Pricing</h4>
          </div>
          <div>
            <FaMapMarkedAlt className="mx-auto text-4xl text-[#191970] mb-4" />
            <h4 className="font-semibold text-lg">Customized Plans</h4>
          </div>
        </div>
      </section>
    )
}

export default WhyChooseUs