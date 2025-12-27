'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

interface User {
    _id: string;
    name: string;
    email: string;
    token: string;
    contact?: string;
    address?: string;
    location?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: any) => void;
    register: (userData: any) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (userData: any) => {
        try {
            const response = await api.post('/auth/login', userData);
            const { token, ...userRest } = response.data;
            const userWithToken = { ...userRest, token };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userWithToken));
            setUser(userWithToken);
            router.push('/');
        } catch (error: any) {
            console.error('Login failed', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await api.post('/auth/register', userData);
            const { token, ...userRest } = response.data;
            const userWithToken = { ...userRest, token };

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(userWithToken));
            setUser(userWithToken);
            router.push('/');
        } catch (error: any) {
            console.error('Registration failed', error.response?.data?.message || error.message);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
