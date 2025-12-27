'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';

export default function ProfilePage() {
    const { user, login } = useAuth(); // We can reuse login to update context state or create a new update function
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        address: '',
        location: '',
        password: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || '',
                contact: user.contact || '',
                address: user.address || '',
                location: user.location || '',
            }));
        }
    }, [user]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        if (formData.password && formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const updatedData: any = {
                name: formData.name,
                contact: formData.contact,
                address: formData.address,
                location: formData.location,
            };
            if (formData.password) {
                updatedData.password = formData.password;
            }

            const response = await api.put('/auth/profile', updatedData);

            // Update local storage and context
            // Assuming the response returns the updated user object with token
            localStorage.setItem('user', JSON.stringify(response.data));
            // Trigger a reload or context update if possible, 
            // for simplicity we just alert heavily or reuse login if it accepts partial updates
            // But getting context to update might require a full page reload or exposing a setUser logic

            // Quick fix to update UI context: reload page
            alert('Profile Updated Successfully');
            window.location.reload();

        } catch (error: any) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Update failed');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="p-10 text-center">Please log in to view profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">My Profile</h1>

                {message && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{message}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Cannot be changed)</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact No</label>
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={onChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location (City/Area)</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={onChange}
                                placeholder="e.g. Dhaka, Banani"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={onChange}
                            placeholder="House, Road, Block..."
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={onChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
