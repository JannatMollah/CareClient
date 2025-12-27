'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from 'react-icons/fa';

// Placeholder price data
const servicePrices: { [key: string]: number } = {
    'baby-care': 500,
    'elderly-care': 600,
    'special-care': 800,
};

export default function BookingPage() {
    const params = useParams();
    const router = useRouter();
    const serviceId = params.id as string;
    const pricePerHour = servicePrices[serviceId] || 0;

    const [formData, setFormData] = useState({
        duration: 1,
        division: '',
        district: '',
        city: '',
        area: '',
        address: '',
    });

    const { duration, division, district, city, area, address } = formData;
    const [totalCost, setTotalCost] = useState(pricePerHour * duration);

    useEffect(() => {
        setTotalCost(pricePerHour * duration);
    }, [duration, pricePerHour]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pricePerHour === 0) {
            alert("Invalid Service");
            return;
        }

        try {
            const bookingData = {
                service: serviceId,
                duration: Number(duration),
                location: {
                    division,
                    district,
                    city,
                    area,
                    address,
                },
                totalCost,
            };

            await api.post('/bookings', bookingData);
            // alert("Booking Confirmed!");
            router.push('/my-bookings');
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.message || "Booking Failed");
        }
    };

    if (pricePerHour === 0) {
        return <div className="p-12 text-center text-red-500 font-bold text-xl">Service not found!</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900">Complete Your Booking</h1>
                    <p className="mt-2 text-gray-600">You are booking <span className="font-bold text-blue-600 capitalize">{serviceId.replace('-', ' ')}</span></p>
                </div>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="md:flex">
                        {/* Summary Sidebar (Desktop: Left, Mobile: Top) */}
                        <div className="bg-blue-50 p-8 md:w-1/3 border-b md:border-b-0 md:border-r border-blue-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Booking Summary</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <FaClock className="text-blue-500 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Service Rate</p>
                                        <p className="font-semibold text-gray-900">{pricePerHour} BDT / hour</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FaCalendarAlt className="text-blue-500 mt-1 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-semibold text-gray-900">{duration} Hour(s)</p>
                                    </div>
                                </div>

                                <div className="border-t border-blue-200 pt-4 mt-4">
                                    <div className="flex items-start">
                                        <FaMoneyBillWave className="text-green-600 mt-1 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-500">Total Estimated Cost</p>
                                            <p className="text-2xl font-bold text-green-600">{totalCost} BDT</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 md:w-2/3">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="duration">
                                        Service Duration (Hours)
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        min="1"
                                        className="block w-full rounded-lg border-gray-300 border px-4 py-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition shadow-sm"
                                        value={duration}
                                        onChange={onChange}
                                        required
                                    />
                                </div>

                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <FaMapMarkerAlt className="text-gray-400 mr-2" /> Service Location
                                    </h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="division">Division</label>
                                            <input type="text" id="division" className="block w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={division} onChange={onChange} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="district">District</label>
                                            <input type="text" id="district" className="block w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={district} onChange={onChange} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="city">City</label>
                                            <input type="text" id="city" className="block w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={city} onChange={onChange} required />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="area">Area</label>
                                            <input type="text" id="area" className="block w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={area} onChange={onChange} required />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-xs font-medium text-gray-500 mb-1" htmlFor="address">Full Address (House, Road, Block)</label>
                                        <input type="text" id="address" className="block w-full rounded-lg border-gray-300 border px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" value={address} onChange={onChange} required />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-0.5"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
