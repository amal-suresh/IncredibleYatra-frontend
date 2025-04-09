import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { FaCheckCircle } from "react-icons/fa";
import { getBookingDetails } from "../api/apis";

const PaymentSuccess = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await getBookingDetails(bookingId);
        setBooking(res.data.booking);
      } catch (error) {
        console.error("Error fetching booking details", error);
      }
    };
    fetchBooking();
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-600 animate-pulse">Fetching your booking details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl mt-10">
      <div className="flex flex-col items-center text-green-600 mb-6">
        <FaCheckCircle size={60} className="mb-3 animate-bounce" />
        <h2 className="text-3xl font-bold text-center">Payment Successful!</h2>
        <p className="text-gray-600 mt-2 text-center">
          Thank you for your booking. We've sent a confirmation to your registered details.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Booking Summary</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Booking ID</p>
            <p className="font-medium text-gray-900">{booking._id}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Package</p>
            <p className="font-medium text-gray-900">{booking.packageId?.title}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Location</p>
            <p className="font-medium text-gray-900">{booking.packageId?.location}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">User Name</p>
            <p className="font-medium text-gray-900">{booking.userId?.name}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Phone Number</p>
            <p className="font-medium text-gray-900">{booking.phoneNumber}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Date</p>
            <p className="font-medium text-gray-900">{moment(booking.selectedDate).format("MMMM Do YYYY")}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Total Persons</p>
            <p className="font-medium text-gray-900">{booking.totalPersons}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Total Amount</p>
            <p className="font-bold text-green-700 text-lg">₹{booking.total}</p>
          </div>
        </div>
      </div>


      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">Want to explore more packages?</p>
        <Link
          to="/packages"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300 shadow-md"
        >
          Browse More Plans
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
