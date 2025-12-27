import Image from "next/image";
import Link from "next/link";
import { FaBaby, FaWheelchair, FaHeartbeat } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Reliable Care for Your Loved Ones
            </h1>
            <p className="text-xl mb-8">
              Professional babysitting, elderly care, and special needs support at your doorstep. Safe, secure, and trusted.
            </p>
            <div className="flex space-x-4">
              <Link href="/#services" className="bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                Find Care
              </Link>
              <Link href="/register" className="border-2 border-white text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition">
                Join as Caregiver
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            {/* Use a placeholder or generated image later */}
            <div className="bg-blue-400 h-64 md:h-80 rounded-lg flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80"
                alt="Care Services"
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our goal is to make caregiving easy, secure, and accessible for everyone. We connect families with verified caretakers to ensure peace of mind.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Baby Care */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-blue-500 mb-4 flex justify-center">
                <FaBaby size={48} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Baby Care</h3>
              <p className="text-gray-600 text-center mb-4">
                Experienced babysitters for your little ones. Flexible hours and safe environment.
              </p>
              <div className="text-center">
                <Link href="/service/baby-care" className="text-blue-600 font-semibold hover:underline">
                  Learn More &rarr;
                </Link>
              </div>
            </div>

            {/* Elderly Care */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-green-500 mb-4 flex justify-center">
                <FaWheelchair size={48} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Elderly Care</h3>
              <p className="text-gray-600 text-center mb-4">
                Compassionate support for seniors. Companionship, medical assistance, and daily help.
              </p>
              <div className="text-center">
                <Link href="/service/elderly-care" className="text-blue-600 font-semibold hover:underline">
                  Learn More &rarr;
                </Link>
              </div>
            </div>

            {/* Special Care */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <div className="text-red-500 mb-4 flex justify-center">
                <FaHeartbeat size={48} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Sick / Special Care</h3>
              <p className="text-gray-600 text-center mb-4">
                Professional care for sick family members or those with special needs.
              </p>
              <div className="text-center">
                <Link href="/service/special-care" className="text-blue-600 font-semibold hover:underline">
                  Learn More &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Families Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border">
              <p className="text-gray-600 italic mb-4">"Care.xyz was a lifesaver when I needed a last-minute babysitter. Highly recommended!"</p>
              <p className="font-bold">- Sarah J.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border">
              <p className="text-gray-600 italic mb-4">"The elderly care service for my father has been exceptional. The caregiver is very professional."</p>
              <p className="font-bold">- Ahmed K.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
