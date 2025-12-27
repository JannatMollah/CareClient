import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Care.xyz</h3>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Reliable, trusted, and compassionate caregiving services for your family. We are here when you need us most.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-100">Services</h4>
                        <ul className="space-y-3">
                            <li><Link href="/service/baby-care" className="text-gray-400 hover:text-white transition duration-200">Baby Care</Link></li>
                            <li><Link href="/service/elderly-care" className="text-gray-400 hover:text-white transition duration-200">Elderly Care</Link></li>
                            <li><Link href="/service/special-care" className="text-gray-400 hover:text-white transition duration-200">Special Care</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-100">Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/#about" className="text-gray-400 hover:text-white transition duration-200">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition duration-200">Contact</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition duration-200">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-white transition duration-200">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-6 text-gray-100">Connect</h4>
                        <div className="flex space-x-4 mb-6">
                            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition duration-300">
                                <FaFacebook size={18} />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-400 hover:text-white transition duration-300">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition duration-300">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition duration-300">
                                <FaLinkedin size={18} />
                            </a>
                        </div>
                        <p className="text-gray-500 text-sm">Subscribe to our newsletter for updates.</p>
                        {/* Placeholder newsletter input */}
                        <div className="mt-2 flex">
                            <input type="email" placeholder="Email" className="bg-gray-800 text-white px-3 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition">Go</button>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Care.xyz. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
