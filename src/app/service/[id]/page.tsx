'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaBaby, FaWheelchair, FaHeartbeat } from 'react-icons/fa';

// Placeholder data - replace with API call
const servicesData = {
    'baby-care': {
        name: 'Baby Care',
        description: 'Our experienced babysitters provide a safe and nurturing environment for your children. We offer full-time, part-time, and occasional babysitting services.',
        icon: <FaBaby size={64} className="text-blue-500" />,
        price: 500, // BDT per hour
        features: ['Certified Babysitters', 'Safe Environment', 'Interactive Play', 'Emergency Trained'],
    },
    'elderly-care': {
        name: 'Elderly Care',
        description: 'Compassionate care for seniors ensuring their comfort and dignity. We assist with daily activities, medication reminders, and companionship.',
        icon: <FaWheelchair size={64} className="text-green-500" />,
        price: 600, // BDT per hour
        features: ['Medical Assistance', 'Companionship', 'Daily Chores Help', '24/7 Availability'],
    },
    'special-care': {
        name: 'Sick / Special Care',
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
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold text-gray-800">Service Not Found</h1>
                <Link href="/" className="text-blue-600 hover:underline mt-4">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="md:flex">
                    <div className="md:flex-shrink-0 md:w-1/2 bg-gray-100 flex items-center justify-center p-12">
                        {service.icon}
                    </div>
                    <div className="p-8 md:w-1/2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{service.name}</h1>
                        <p className="text-gray-600 mb-6 text-lg">{service.description}</p>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Features:</h3>
                            <ul className="list-disc list-inside text-gray-700">
                                {service.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-8">
                            <span className="text-2xl font-bold text-blue-600">{service.price} BDT</span>
                            <span className="text-gray-500"> / hour</span>
                        </div>

                        <Link
                            href={`/booking/${id}`}
                            className="block w-full text-center bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition"
                        >
                            Book This Service
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
