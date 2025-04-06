import React from 'react'

const ExploreByDestination = () => {
  return (
    <section className="py-16">
    <h2 className="text-3xl font-bold text-center text-[#191970] mb-10">
      Explore by Destination
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
      {[
        {
          name: 'Paris',
          url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1470&q=80',
        },
        {
          name: 'Maldives',
          url: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1470&q=80',
        },
        {
          name: 'Tokyo',
          url: 'https://images.unsplash.com/photo-1505765050516-f72dcac9c60b?auto=format&fit=crop&w=1470&q=80',
        },
      ].map((item, i) => (
        <div
          key={i}
          className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
        >
          <img
            src={item.url}
            alt={item.name}
            className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h3 className="text-white text-2xl font-semibold">{item.name}</h3>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default ExploreByDestination