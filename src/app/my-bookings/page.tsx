'use client';
import Link from 'next/link';

// Placeholder data
const bookingsData = [
    {
        id: '1',
        serviceName: 'Baby Care',
        duration: 5,
        location: 'Dhaka, Mirpur',
        totalCost: 2500,
        status: 'Pending',
        date: '2025-10-25',
    },
    {
        id: '2',
        serviceName: 'Elderly Care',
        duration: 2,
        location: 'Dhaka, Gulshan',
        totalCost: 1200,
        status: 'Confirmed',
        date: '2025-10-26',
    },
];

export default function MyBookingsPage() {
    const bookings = bookingsData; // Replace with API call

    const handleCancel = (id: string) => {
        if (confirm("Are you sure you want to cancel?")) {
            console.log("Cancelled booking", id);
            // API call to cancel
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

            {bookings.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 mb-4">You have no bookings yet.</p>
                    <Link href="/#services" className="text-blue-600 hover:underline">Book a Service</Link>
                </div>
            ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <li key={booking.id} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-600 truncate">{booking.serviceName}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500 mr-6">
                                                Duration: {booking.duration} hrs
                                            </p>
                                            <p className="flex items-center text-sm text-gray-500 mr-6">
                                                Cost: {booking.totalCost} BDT
                                            </p>
                                            <p className="flex items-center text-sm text-gray-500">
                                                Location: {booking.location}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                            <button
                                                onClick={() => handleCancel(booking.id)}
                                                className="text-red-600 hover:text-red-900 font-medium ml-4"
                                            >
                                                Cancel Booking
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
