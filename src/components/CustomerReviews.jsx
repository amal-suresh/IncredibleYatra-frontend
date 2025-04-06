


const CustomerReviews = () => {
    return (
        <section className="py-16 bg-white">
            <h2 className="text-3xl font-bold text-center text-[#191970] mb-10">
                What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-6xl mx-auto">
                {[
                    {
                        name: 'Jane Doe',
                        image: 'https://randomuser.me/api/portraits/women/44.jpg',
                        review: 'Best trip ever! Everything was organized and smooth.',
                    },
                    {
                        name: 'John Smith',
                        image: 'https://randomuser.me/api/portraits/men/45.jpg',
                        review: 'Highly recommend! Great service and beautiful places.',
                    },
                ].map((r, i) => (
                    <div
                        key={i}
                        className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-md transition"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={r.image}
                                alt={r.name}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <h4 className="font-semibold text-lg">{r.name}</h4>
                        </div>
                        <p className="text-gray-700 italic">"{r.review}"</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CustomerReviews