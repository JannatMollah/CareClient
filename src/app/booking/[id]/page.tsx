'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

// Placeholder price data (should come from API/Context)
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pricePerHour === 0) {
            alert("Invalid Service");
            return;
        }

        // API call to create booking would go here
        console.log('Booking Data:', {
            serviceId,
            ...formData,
            totalCost
        });

        // Mock success
        alert("Booking Confirmed! (Mock)");
        router.push('/my-bookings');
    };

    if (pricePerHour === 0) {
        return <div className="p-8 text-center text-red-500">Service not found!</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book Service</h1>

            <div className="bg-white shadow-md rounded-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Service Info */}
                    <div className="border-b pb-4">
                        <p className="text-gray-700">Service: <span className="font-bold capitalize">{serviceId.replace('-', ' ')}</span></p>
                        <p className="text-gray-700">Rate: <span className="font-bold">{pricePerHour} BDT/hr</span></p>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="duration">
                            Duration (Hours)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            min="1"
                            className="w-full px-3 py-2 border rounded-md"
                            value={duration}
                            onChange={onChange}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="division">Division</label>
                            <input type="text" id="division" className="w-full px-3 py-2 border rounded-md" value={division} onChange={onChange} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="district">District</label>
                            <input type="text" id="district" className="w-full px-3 py-2 border rounded-md" value={district} onChange={onChange} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="city">City</label>
                            <input type="text" id="city" className="w-full px-3 py-2 border rounded-md" value={city} onChange={onChange} required />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="area">Area</label>
                            <input type="text" id="area" className="w-full px-3 py-2 border rounded-md" value={area} onChange={onChange} required />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="address">Full Address</label>
                        <input type="text" id="address" className="w-full px-3 py-2 border rounded-md" value={address} onChange={onChange} required />
                    </div>

                    {/* Total Cost */}
                    <div className="bg-blue-50 p-4 rounded-md flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-800">Total Cost:</span>
                        <span className="text-2xl font-bold text-blue-600">{totalCost} BDT</span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
}
