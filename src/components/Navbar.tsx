'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-10 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-blue-600">
                            Care.xyz
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                            Home
                        </Link>
                        <Link href="/#services" className="text-gray-700 hover:text-blue-600 transition">
                            Services
                        </Link>
                        {user ? (
                            <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 transition">
                                My Bookings
                            </Link>
                        ) : null}

                        {user ? (
                            <div className="flex items-center space-x-4 text-gray-700">
                                <span className="hidden md:inline font-medium">Hello, {user.name}</span>
                                <button onClick={logout} className="text-red-500 hover:text-red-700">Logout</button>
                                <FaUserCircle size={24} />
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
                                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                            Home
                        </Link>
                        <Link href="/#services" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                            Services
                        </Link>
                        {user && (
                            <>
                                <Link href="/my-bookings" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                                    My Bookings
                                </Link>
                                <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-left px-3 py-2 text-red-600 hover:bg-gray-100 rounded-md">
                                    Logout
                                </button>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link href="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                                    Login
                                </Link>
                                <Link href="/register" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
