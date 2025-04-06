import React from 'react'
import { FaStar } from 'react-icons/fa'

const PopularPackages = () => {
  return (
    <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-[#191970] mb-10">Popular Tour Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src="https://images.unsplash.com/photo-1582719478172-c4e6f1c3df55?auto=format&fit=crop&w=1470&q=80"
                alt="Tour Package"
                className="h-60 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Beach Paradise</h3>
                <p className="text-gray-600">4 Days, 3 Nights | All-inclusive</p>
                <button className="mt-4 px-4 py-2 bg-[#191970] text-white rounded hover:bg-[#3131a5]">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

  )
}

export default PopularPackages