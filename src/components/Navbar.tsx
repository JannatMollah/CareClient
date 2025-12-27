'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes, FaUserCircle, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        // Close profile menu when clicking outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setProfileOpen(false);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleProfile = () => {
        setProfileOpen(!profileOpen);
    };

    return (
        <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition">
                            Care.xyz
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition hover:scale-105 transform">
                            Home
                        </Link>
                        <Link href="/#services" className="text-gray-700 hover:text-blue-600 font-medium transition hover:scale-105 transform">
                            Services
                        </Link>
                        {user && (
                            <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium transition hover:scale-105 transform">
                                My Bookings
                            </Link>
                        )}

                        {user ? (
                            <div className="relative pl-4 border-l border-gray-300" ref={profileRef}>
                                <button
                                    onClick={toggleProfile}
                                    className="flex items-center space-x-2 focus:outline-none hover:bg-gray-100 rounded-full p-2 transition"
                                >
                                    <span className="hidden lg:inline text-gray-900 font-semibold">{user.name}</span>
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <FaUserCircle size={24} />
                                    </div>
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 animate-fade-in-down origin-top-right">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            onClick={() => setProfileOpen(false)}
                                        >
                                            <FaUser className="mr-2 text-gray-400" /> My Profile
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setProfileOpen(false); }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                        >
                                            <FaSignOutAlt className="mr-2" /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">Login</Link>
                                <Link href="/register" className="bg-blue-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-0.5 font-medium">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100 transition">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-4 pt-2 pb-6 space-y-2">
                    <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link href="/#services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>
                        Services
                    </Link>
                    {user && (
                        <Link href="/my-bookings" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md" onClick={toggleMenu}>
                            My Bookings
                        </Link>
                    )}

                    <div className="border-t border-gray-100 pt-4 mt-2">
                        {user ? (
                            <div className="space-y-3 px-3">
                                <div className="flex items-center space-x-3 text-gray-800 pb-2 border-b border-gray-100">
                                    <FaUserCircle size={20} />
                                    <span className="font-semibold">{user.name}</span>
                                </div>
                                <Link
                                    href="/profile"
                                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md font-medium"
                                    onClick={toggleMenu}
                                >
                                    My Profile
                                </Link>
                                <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left text-red-600 hover:bg-red-50 rounded-md py-2 font-medium">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3 px-3">
                                <Link href="/login" className="block text-center w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 font-medium" onClick={toggleMenu}>
                                    Login
                                </Link>
                                <Link href="/register" className="block text-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 shadow font-medium" onClick={toggleMenu}>
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
