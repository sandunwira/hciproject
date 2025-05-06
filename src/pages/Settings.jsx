import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../utils/Supabase';
import Navbar from '../components/Navbar';
import * as DiceBear from '@dicebear/core';
import * as identiconStyle from '@dicebear/identicon';

function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [userProfile, setUserProfile] = useState({
    display_name: '',
    email: '',
    username: ''
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (!user) return;
        
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        if (data) {
          setUserProfile({
            display_name: data.display_name || '',
            email: user.email || '',
            username: data.username || user.user_metadata?.username || ''
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage({
          type: 'error',
          text: 'Failed to load profile information'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // First update the profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          display_name: userProfile.display_name,
          username: userProfile.username
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update auth user metadata with username
      const { error: userMetadataError } = await supabase.auth.updateUser({
        data: { username: userProfile.username }
      });

      if (userMetadataError) throw userMetadataError;

      // If email has changed, update the auth user email
      if (userProfile.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: userProfile.email
        });

        if (emailError) throw emailError;
      }

      setMessage({ 
        type: 'success',
        text: userProfile.email !== user.email ? 
          'Profile updated successfully! Check your new email for confirmation.' : 
          'Profile updated successfully!' 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ 
        type: 'error',
        text: 'Failed to update profile. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate passwords
    if (passwordData.new !== passwordData.confirm) {
      setMessage({ 
        type: 'error',
        text: 'New passwords do not match.' 
      });
      setLoading(false);
      return;
    }

    if (passwordData.new.length < 6) {
      setMessage({ 
        type: 'error',
        text: 'Password must be at least 6 characters long.' 
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new
      });

      if (error) throw error;

      setMessage({ 
        type: 'success',
        text: 'Password updated successfully!' 
      });
      
      // Clear password fields
      setPasswordData({
        current: '',
        new: '',
        confirm: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({ 
        type: 'error',
        text: 'Failed to update password. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-6">Settings</h1>
          
          {message.text && (
            <div className={`mb-6 ${
              message.type === 'success' 
                ? 'bg-green-900/50 border border-green-500 text-green-300' 
                : 'bg-red-900/50 border border-red-500 text-red-300'
              } px-4 py-3 rounded`}
            >
              {message.text}
            </div>
          )}

          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              
              <div className="flex flex-col md:flex-row items-center mb-6">
                <div className="md:mr-8 mb-4 md:mb-0">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-700">
                    <img
                      src={DiceBear.createAvatar(identiconStyle, {
                        seed: user?.id || 'default',
                        backgroundColor: ['3B82F6'],
                        backgroundType: ['solid'],
                      }).toDataUri()}
                      alt="Profile Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <p className="text-gray-400 mb-1">Email</p>
                  <p className="text-white font-medium">{user?.email}</p>
                  <p className="text-gray-400 mt-3 mb-1">Member since</p>
                  <p className="text-white font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
              
              <form onSubmit={saveProfile}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userProfile.username}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Your username"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="display_name" className="block text-sm font-medium text-gray-400 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="display_name"
                    name="display_name"
                    value={userProfile.display_name}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Your display name"
                  />
                </div>
				
				<div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userProfile.email}
                    onChange={handleProfileChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Your email address"
                  />
                  {userProfile.email !== user?.email && (
                    <p className="text-xs text-yellow-400 mt-1">
                      You'll need to verify your new email address after saving.
                    </p>
                  )}
				</div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium disabled:bg-blue-800 disabled:cursor-not-allowed"
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              
              <form onSubmit={changePassword}>
                <div className="mb-4">
                  <label htmlFor="current" className="block text-sm font-medium text-gray-400 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current"
                    name="current"
                    value={passwordData.current}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="new" className="block text-sm font-medium text-gray-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new"
                    name="new"
                    value={passwordData.new}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    minLength={6}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="confirm" className="block text-sm font-medium text-gray-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm"
                    name="confirm"
                    value={passwordData.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    minLength={6}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium disabled:bg-blue-800 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Change Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
