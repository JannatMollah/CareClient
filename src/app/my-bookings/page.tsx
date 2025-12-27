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
                    <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-gray-100 max-w-2xl mx-auto">
                        <div className="mx-auto h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <FaReceipt className="text-blue-300 text-4xl" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">No Bookings Found</h3>
                        <p className="text-gray-500 mb-8 text-lg">You haven't booked any services yet. Find the perfect care for your loved ones today.</p>
                        <Link href="/#services" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                            Browse Services
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row">
                                {/* Status Strip */}
                                <div className={`h-2 md:h-auto md:w-3 ${booking.status === 'Confirmed' ? 'bg-green-500' :
                                        booking.status === 'Cancelled' ? 'bg-red-500' :
                                            booking.status === 'Completed' ? 'bg-blue-500' :
                                                'bg-yellow-400'
                                    }`}></div>

                                <div className="p-6 md:p-8 flex-grow flex flex-col md:flex-row justify-between gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between md:justify-start gap-4">
                                            <h3 className="text-xl font-bold text-gray-900">
                                                {getServiceName(booking.service)}
                                            </h3>
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                    booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <FaClock className="text-blue-400 mr-2 w-4" />
                                                <span>Duration: <span className="font-semibold text-gray-900">{booking.duration} Hours</span></span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaMoneyBillWave className="text-green-500 mr-2 w-4" />
                                                <span>Total: <span className="font-bold text-gray-900">{booking.totalCost} BDT</span></span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaCalendarAlt className="text-purple-400 mr-2 w-4" />
                                                <span>Date: <span className="font-semibold text-gray-900">{formatDate(booking.createdAt || new Date().toISOString())}</span></span>
                                            </div>
                                            <div className="flex items-center">
                                                <FaReceipt className="text-orange-400 mr-2 w-4" />
                                                <span>Payment:
                                                    <span className={`font-semibold ml-1 ${booking.paymentStatus === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                                                        {booking.paymentStatus || 'Pending'}
                                                    </span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <FaMapMarkerAlt className="text-red-400 mr-2 w-4 mt-1 flex-shrink-0" />
                                            <span className="text-gray-600 text-sm">
                                                {booking.location.address ? `${booking.location.address}, ` : ''}{booking.location.area}, {booking.location.city}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-row md:flex-col justify-end gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-[140px]">
                                        {booking.paymentStatus !== 'Paid' && booking.status !== 'Cancelled' && (
                                            <Link
                                                href={`/payment/${booking._id}`}
                                                className="flex-1 md:flex-none text-center bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                                            >
                                                Pay Now
                                            </Link>
                                        )}

                                        {booking.status !== 'Cancelled' && (
                                            <button
                                                onClick={() => handleCancel(booking._id)}
                                                className="flex-1 md:flex-none px-6 py-2 rounded-lg font-medium text-red-600 bg-red-50 hover:bg-red-100 transition border border-red-100"
                                            >
                                                Cancel
                                            </button>
                                        )}

                                        {booking.status === 'Cancelled' && (
                                            <span className="text-center text-gray-400 font-medium py-2 bg-gray-50 rounded-lg cursor-not-allowed">
                                                Cancelled
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
