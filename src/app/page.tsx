'use client';
import Image from "next/image";
import Link from "next/link";
import { FaBaby, FaWheelchair, FaHeartbeat, FaCheckCircle, FaStar, FaQuoteLeft } from "react-icons/fa";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-6">
                Trusted by 5000+ Families
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                Reliable Care for <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Your Loved Ones
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Professional babysitting, elderly care, and specialized patient support.
                We bring certified caregivers to your doorstep, ensuring safety, comfort, and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/#services"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  Find a Caregiver
                </Link>
                <Link
                  href="/register"
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition"
                >
                  Get Started
                </Link>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> Vetted Professionals
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> 24/7 Support
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500">
                <img
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80"
                  alt="Happy Family"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We offer a wide range of care services tailored to meet the specific needs of your family members.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=600&q=80"
                  alt="Baby Care"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-blue-500">
                  <FaBaby size={24} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Baby Care</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Safe and nurturing care for your little ones. Our babysitters are trained to engage children in fun, educational activities.
                </p>
                <Link href="/service/baby-care" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                  View Details &rarr;
                </Link>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 overflow-hidden relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1663036976879-4baf18adfd5b?w=600&q=80"
                  alt="Elderly Care"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-green-500">
                  <FaWheelchair size={24} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Elderly Care</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Companionship and assistance for seniors. We ensure dignity and comfort with medical support and daily help.
                </p>
                <Link href="/service/elderly-care" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                  View Details &rarr;
                </Link>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 overflow-hidden relative">
                <img
                  src="https://plus.unsplash.com/premium_photo-1661416618939-c99423f16519?w=600&q=80"
                  alt="Special Care"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-red-500">
                  <FaHeartbeat size={24} />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Sick / Special Care</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">
                  Professional medical support for sick or recovering family members. Experienced nurses and attendants.
                </p>
                <Link href="/service/special-care" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700">
                  View Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-extrabold mb-2">500+</h3>
              <p className="text-blue-100">Verified Caregivers</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold mb-2">12k</h3>
              <p className="text-blue-100">Happy Families</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold mb-2">4.9/5</h3>
              <p className="text-blue-100">Average Rating</p>
            </div>
            <div>
              <h3 className="text-4xl font-extrabold mb-2">24/7</h3>
              <p className="text-blue-100">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What Our Clients Say</h2>
            <p className="text-slate-600">Real stories from families we've helped.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Sarah Johnson",
                location: "Dhaka, Bangladesh",
                text: "The caregiver was exceptional. She understood our grandmother's needs perfectly and was so patient. Highly recommended!",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80"
              },
              {
                id: 2,
                name: "Rahim Ahmed",
                location: "Chittagong, Bangladesh",
                text: "Found a verified attendant for my post-surgery recovery within hours. The service was professional and very reliable.",
                image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80"
              },
              {
                id: 3,
                name: "Anika Rahman",
                location: "Sylhet, Bangladesh",
                text: "I was worried about leaving my baby, but the babysitter from Care.xyz was amazing. My child loved her!",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80"
              }
            ].map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={16} />)}
                </div>
                <p className="text-slate-600 mb-6 italic relative z-10">
                  <FaQuoteLeft className="text-blue-100 absolute -top-4 -left-2 text-4xl -z-10" />
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-slate-100"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
