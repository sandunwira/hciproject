import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';
import * as DiceBear from '@dicebear/core';
import * as identiconStyle from '@dicebear/identicon';

import Navbar from '../components/Navbar';
import DesignPreview from '../components/DesignPreview';

function ProfilePage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        if (!user) {
            navigate('/login', { state: { message: 'Please login to view your profile' } });
            return;
        }

        const fetchProfileAndDesigns = async () => {
            setLoading(true);
            try {
                // Fetch profile information
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileError) throw profileError;
                setProfile(profileData);

                // Fetch saved designs (You'll need to create this table in Supabase)
                const { data: designsData, error: designsError } = await supabase
                    .from('designs')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (designsError) throw designsError;
                setDesigns(designsData || []);
            } catch (err) {
                console.error('Error fetching profile data:', err);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndDesigns();
    }, [user, navigate]);

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-blue-500">Loading profile...</div>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {error && (
                        <div className="mb-6 bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col md:flex-row md:items-center">
                                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                                    <img
                                        src={DiceBear.createAvatar(identiconStyle, {
                                            seed: user.id,
                                            backgroundColor: ['3B82F6'],
                                            backgroundType: ['solid'],
                                        }).toDataUri()}
                                        alt="Profile"
                                        className="h-24 w-24 rounded-full border-2 border-blue-500"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {profile?.display_name || 'Designer'}
                                    </h1>
                                    <p className="text-gray-400">@{profile?.username}</p>
                                    <p className="text-gray-400 mt-1">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">My Designs</h2>
                            <Link 
                                to="/create" 
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition-colors"
                            >
                                Create New Design
                            </Link>
                        </div>

                        {designs.length === 0 ? (
                            <div className="bg-gray-800 rounded-lg p-8 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                <p className="mt-2 text-gray-400">You haven't created any designs yet</p>
                                <Link 
                                    to="/create" 
                                    className="mt-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition-colors"
                                >
                                    Create Your First Design
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {designs.map((design) => (
                                    <div key={design.id} className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
                                        <div className="h-50 bg-gray-700 flex items-center justify-center">
                                            {design.thumbnail_url ? (
                                                <img 
                                                    src={design.thumbnail_url} 
                                                    alt={design.name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <DesignPreview 
                                                    design={design} 
                                                    className="w-full h-full p-4"
                                                />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-medium text-white">{design.name}</h3>
                                            <p className="text-sm text-gray-400 mt-1">
                                                {new Date(design.created_at).toLocaleDateString()}
                                            </p>
                                            <div className="mt-4 flex justify-between">
                                                <Link 
                                                    to={`/design/${design.id}`}
                                                    className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                                                >
                                                    View Design
                                                </Link>
                                                <Link 
                                                    to={`/edit/${design.id}`}
                                                    className="text-gray-400 hover:text-white text-sm font-medium"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;
