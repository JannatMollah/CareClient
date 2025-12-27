import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Care.xyz</h3>
                        <p className="text-gray-400">
                            Making caregiving easy, secure, and accessible for everyone. Reliable services for your loved ones.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
                            <li><Link href="/#services" className="text-gray-400 hover:text-white transition">Services</Link></li>
                            <li><Link href="/#about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={24} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Care.xyz. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
