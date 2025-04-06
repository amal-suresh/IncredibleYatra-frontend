import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <section
            className="w-full h-[80vh] bg-cover bg-center text-white flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')",
            }}
        >
            <div className="text-center bg-black/40 p-6 rounded-xl">
                <h1 className="text-4xl md:text-6xl font-bold">Explore the World with Us</h1>
                <p className="text-lg mt-4">Find your next adventure and book now</p>
                <button className="mt-6 px-6 py-2 bg-[#FFA500] text-white rounded hover:bg-[#FFB84D]">
                    <Link to="packages">Explore Packages</Link>
                </button>
            </div>
        </section>
    )
}

export default Hero