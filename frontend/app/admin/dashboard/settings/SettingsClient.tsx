'use client';

import { useState, useEffect } from 'react';
import { User, Lock, Bell, Globe, Database, Shield, Save, Key, AppWindow, Receipt, Loader2, CheckCircle } from 'lucide-react';

export default function SettingsClient() {
    const [activeTab, setActiveTab] = useState('account');
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Account State
    const [profile, setProfile] = useState({
        name: '',
        username: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/admin/profile');
                if (res.ok) {
                    const data = await res.json();
                    setProfile({
                        name: data.name || '',
                        username: data.username || '',
                        email: data.email || '',
                        role: data.role || ''
                    });
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSaveAccount = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            const res = await fetch('/api/admin/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: profile.name,
                    username: profile.username,
                    email: profile.email
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Settings saved successfully!' });
                setProfile({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    role: data.role
                });
                // Update AdminShell and other components
                window.dispatchEvent(new Event('profileUpdated'));
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to save settings' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred' });
        } finally {
            setIsSaving(false);
            // Clear message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Settings...</p>
                </div>
            );
        }

        switch (activeTab) {
            case 'account':
                return (
                    <section className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-8 space-y-6 animate-in fade-in duration-300">
                        <div className="flex items-center space-x-4 border-b border-gray-700 pb-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                                {profile.name ? profile.name.substring(0, 2).toUpperCase() : 'RA'}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{profile.name || 'Rahim Admin'}</h3>
                                <p className="text-gray-500 text-sm capitalize">{profile.role || 'System Administrator'}</p>
                                <button className="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase">Change Avatar</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={profile.name}
                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
                                <input
                                    type="text"
                                    value={profile.username}
                                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                {message.type === 'success' ? <CheckCircle size={18} /> : <Shield size={18} />}
                                <span className="text-sm font-bold uppercase tracking-wide">{message.text}</span>
                            </div>
                        )}

                        <div className="pt-6 border-t border-gray-700 flex justify-end">
                            <button
                                onClick={handleSaveAccount}
                                disabled={isSaving}
                                className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50"
                            >
                                {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>
                    </section>
                );
            case 'security':
                return (
                    <section className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-8 space-y-6 animate-in fade-in duration-300">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center">
                            <Key size={24} className="mr-3 text-purple-400" />
                            Security Configuration
                        </h3>
                        <p className="text-gray-400 text-sm">Enhance your account security with these advanced features.</p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-700">
                                <div>
                                    <h4 className="text-white font-bold">Two-Factor Authentication</h4>
                                    <p className="text-xs text-gray-500">Adds an extra layer of protection to your account.</p>
                                </div>
                                <button className="px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/30 rounded-lg font-bold text-xs uppercase hover:bg-purple-500/20 transition-all">Enable</button>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Session Management</h4>
                                <div className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <AppWindow size={24} className="text-blue-400" />
                                        <div>
                                            <p className="text-sm font-bold text-white">Current Session: Chrome on Windows</p>
                                            <p className="text-xs text-gray-500">Kuala Lumpur, Malaysia • 157.245.153.209</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/20 uppercase">Active</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-700">
                            <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest px-1 mb-4">Danger Zone</h4>
                            <button className="flex items-center space-x-2 px-6 py-2.5 bg-red-500/10 text-red-500 border border-red-500/30 rounded-xl font-bold hover:bg-red-500/20 transition-all">
                                <span>Logout from all devices</span>
                            </button>
                        </div>
                    </section>
                );
            case 'general':
                return (
                    <section className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-8 space-y-8 animate-in fade-in duration-300">
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center">
                                <Globe size={24} className="mr-3 text-blue-400" />
                                Platform Preferences
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Timezone</label>
                                    <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>(GMT+08:00) Kuala Lumpur, Singapore</option>
                                        <option>(GMT+00:00) UTC</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Currency</label>
                                    <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>MYR - Malaysian Ringgit</option>
                                        <option>USD - US Dollar</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Agency Details</h4>
                                <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-gray-700">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Agency Name</label>
                                        <input type="text" defaultValue="Chillo Creative" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Default Tax ID</label>
                                        <input type="text" placeholder="Optional" className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-700 flex justify-end">
                            <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 uppercase tracking-wider text-sm">
                                <Save size={18} />
                                <span>Save Settings</span>
                            </button>
                        </div>
                    </section>
                );
            case 'notifications':
                return (
                    <section className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-8 space-y-6 animate-in fade-in duration-300">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center">
                            <Bell size={24} className="mr-3 text-yellow-400" />
                            Notifications Hub
                        </h3>
                        <p className="border-l-4 border-blue-500 bg-blue-500/5 p-4 text-blue-300 text-sm">
                            <strong>Future Feature:</strong> WhatsApp & Telegram notification automation is currently being prepared for your CRM.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-bold">Email Alerts</p>
                                    <p className="text-xs text-gray-500">Receive lead updates via email.</p>
                                </div>
                                <div className="w-12 h-6 bg-purple-600 rounded-full relative"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div></div>
                            </div>
                            <div className="flex items-center justify-between opacity-50 grayscale">
                                <div>
                                    <p className="text-white font-bold">WhatsApp Automation <span className="ml-2 text-[10px] bg-gray-700 px-1 py-0.5 rounded uppercase">Coming Soon</span></p>
                                    <p className="text-xs text-gray-500">Auto-contacting new leads via WhatsApp API.</p>
                                </div>
                                <div className="w-12 h-6 bg-gray-700 rounded-full relative"><div className="w-4 h-4 bg-gray-500 rounded-full absolute left-1 top-1"></div></div>
                            </div>
                        </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="space-y-1">
                {[
                    { id: 'account', icon: User, label: 'Account' },
                    { id: 'security', icon: Lock, label: 'Security' },
                    { id: 'notifications', icon: Bell, label: 'Notifications' },
                    { id: 'general', icon: Globe, label: 'General' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all font-bold uppercase text-xs tracking-widest ${activeTab === item.id
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            }`}
                    >
                        <item.icon size={18} />
                        <span>{item.label}</span>
                    </button>
                ))}
            </aside>

            <div className="md:col-span-3">
                {renderContent()}
            </div>
        </div>
    );
}
