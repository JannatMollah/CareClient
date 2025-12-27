'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaBaby, FaWheelchair, FaHeartbeat, FaCheck, FaArrowLeft } from 'react-icons/fa';

// Placeholder data - replace with API call
const servicesData = {
    'baby-care': {
        name: 'Baby Care',
        image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=600&q=80',
        description: 'Our experienced babysitters provide a safe and nurturing environment for your children. We offer full-time, part-time, and occasional babysitting services.',
        icon: <FaBaby size={64} className="text-blue-500" />,
        price: 500, // BDT per hour
        features: ['Certified Babysitters', 'Safe Environment', 'Interactive Play', 'Emergency Trained'],
    },
    'elderly-care': {
        name: 'Elderly Care',
        image: 'https://plus.unsplash.com/premium_photo-1663036976879-4baf18adfd5b?w=600&q=80',
        description: 'Compassionate care for seniors ensuring their comfort and dignity. We assist with daily activities, medication reminders, and companionship.',
        icon: <FaWheelchair size={64} className="text-green-500" />,
        price: 600, // BDT per hour
        features: ['Medical Assistance', 'Companionship', 'Daily Chores Help', '24/7 Availability'],
    },
    'special-care': {
        name: 'Sick / Special Care',
        image: 'https://plus.unsplash.com/premium_photo-1661416618939-c99423f16519?w=600&q=80',
        description: 'Specialized care for sick family members or those with distinct needs. Our caregivers are trained to handle medical equipment and special requirements.',
        icon: <FaHeartbeat size={64} className="text-red-500" />,
        price: 800, // BDT per hour
        features: ['Specialized Training', 'Medical Equipment Support', 'Patient Monitoring', 'Rehabilitation Support'],
    },
};

export default function ServiceDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const service = servicesData[id as keyof typeof servicesData];

    if (!service) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Not Found</h1>
                <p className="text-gray-600 mb-8">The service you are looking for does not exist.</p>
                <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/#services" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition">
                    <FaArrowLeft className="mr-2" /> Back to Services
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 relative h-96 md:h-auto">
                            {service.image ? (
                                <img src={service.image} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-100">
                                    {service.icon}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden"></div>
                        </div>
                        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{service.name}</h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.description}</p>

                            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">What's Included:</h3>
                                <ul className="space-y-3">
                                    {service.features.map((feature, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                            <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-100">
                                <div>
                                    <span className="text-sm text-gray-500 uppercase tracking-wide font-semibold">Price Rate</span>
                                    <div className="flex items-baseline">
                                        <span className="text-3xl font-bold text-blue-600">{service.price} BDT</span>
                                        <span className="text-gray-500 ml-2">/ hour</span>
                                    </div>
                                </div>

                                <Link
                                    href={`/booking/${id}`}
                                    className="w-full sm:w-auto text-center bg-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-0.5"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
