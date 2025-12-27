'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaReceipt, FaMoneyBillWave } from 'react-icons/fa';

interface Booking {
    _id: string;
    service: string;
    duration: number;
    location: {
        division: string;
        district: string;
        city: string;
        area: string;
        address: string;
    };
    totalCost: number;
    status: string;
    paymentStatus?: string;
    createdAt: string;
}

const getServiceName = (id: string) => {
    const names: { [key: string]: string } = {
        'baby-care': 'Baby Care',
        'elderly-care': 'Elderly Care',
        'special-care': 'Sick / Special Care',
    };
    return names[id] || id;
};

// Function to format date
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export default function MyBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await api.get('/bookings/my-bookings');
                setBookings(response.data);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCancel = async (id: string) => {
        if (confirm("Are you sure you want to cancel?")) {
            try {
                await api.patch(`/bookings/${id}/cancel`);
                // Update local state to reflect change without refetching all
                setBookings(prev => prev.map(booking =>
                    booking._id === id ? { ...booking, status: 'Cancelled' } : booking
                ));
                alert("Booking Cancelled Successfully");
            } catch (error: any) {
                console.error("Cancellation failed", error);
                alert(error.response?.data?.message || "Cancellation failed");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-l-4 border-blue-600 pl-4">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                        <div className="mx-auto h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FaReceipt className="text-blue-200 text-4xl" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Yet</h3>
                        <p className="text-gray-500 mb-8">It looks like you haven't booked any services yet.</p>
                        <Link href="/#services" className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition shadow-md">
                            Browse Services
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 capitalize truncate">
                                            {getServiceName(booking.service)}
                                        </h3>
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaClock className="text-blue-400 mr-3 w-4" />
                                            <span>Duration: <span className="font-semibold text-gray-900">{booking.duration} Hours</span></span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaMoneyBillWave className="text-green-500 mr-3 w-4" />
                                            <span>Total: <span className="font-semibold text-green-600">{booking.totalCost} BDT</span></span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaReceipt className="text-purple-500 mr-3 w-4" />
                                            <span>Payment:
                                                <span className={`font-semibold ml-1 ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                    {booking.paymentStatus || 'Pending'}
                                                </span>
                                            </span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <FaMapMarkerAlt className="text-red-400 mr-3 w-4" />
                                            <span className="truncate">{booking.location.city}, {booking.location.area}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-400 mt-2 border-t pt-2">
                                            <span className="text-xs">Booked on {formatDate(booking.createdAt || new Date().toISOString())}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                                    {booking.status !== 'Cancelled' && (
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            className="text-sm text-red-500 font-medium hover:text-red-700 transition"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    {booking.paymentStatus !== 'Paid' && booking.status !== 'Cancelled' && (
                                        <Link
                                            href={`/payment/${booking._id}`}
                                            className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
                                        >
                                            Pay Now
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
