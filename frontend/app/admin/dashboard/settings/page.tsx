import { User, Lock, Bell, Globe, Database, Shield } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold text-white">CRM Settings</h1>
                <p className="text-gray-400 mt-2">Manage your account and platform preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Settings Navigation */}
                <aside className="space-y-1">
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-purple-600 text-white font-bold transition-all">
                        <User size={18} />
                        <span>Account</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
                        <Lock size={18} />
                        <span>Security</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
                        <Bell size={18} />
                        <span>Notifications</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-all">
                        <Globe size={18} />
                        <span>General</span>
                    </button>
                </aside>

                {/* Settings Content */}
                <div className="md:col-span-3 space-y-6">
                    {/* Profile Section */}
                    <section className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-8 space-y-6">
                        <div className="flex items-center space-x-4 border-b border-gray-700 pb-6">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold shadow-lg">
                                RA
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white uppercase">Rahim Admin</h3>
                                <p className="text-gray-500 text-sm">System Administrator</p>
                                <button className="mt-2 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase">Change Avatar</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    defaultValue="Rahim Admin"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Username</label>
                                <input
                                    type="text"
                                    defaultValue="rahim"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    defaultValue="admin@chillocreative.com"
                                    className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-700 flex justify-end">
                            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] shadow-lg">
                                Update Profile
                            </button>
                        </div>
                    </section>

                    {/* Integration Status Section */}
                    <section className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl p-8 space-y-6">
                        <h3 className="text-lg font-bold text-white uppercase flex items-center">
                            <Shield size={20} className="mr-2 text-green-400" />
                            System Status
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <Database size={18} className="text-blue-400" />
                                    <span className="text-sm font-medium text-gray-300">MySQL Database</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase py-1 px-2 bg-green-500/10 text-green-400 rounded-md border border-green-500/20">Connected</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-700">
                                <div className="flex items-center space-x-3">
                                    <Globe size={18} className="text-purple-400" />
                                    <span className="text-sm font-medium text-gray-300">WordPress API</span>
                                </div>
                                <span className="text-[10px] font-bold uppercase py-1 px-2 bg-green-500/10 text-green-400 rounded-md border border-green-500/20">Online</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
