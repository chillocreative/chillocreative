import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import { LayoutDashboard, Users, FolderKanban, FileText, Settings, LogOut, FileCheck } from 'lucide-react';

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'rahim-chillo-secret-1977'
);

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (!token) {
        redirect('/admin');
    }

    try {
        await jwtVerify(token, JWT_SECRET);
    } catch (error) {
        redirect('/admin');
    }

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col">
                <div className="p-6">
                    <Link href="/admin/dashboard" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                        Chillo CRM
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link href="/admin/dashboard" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/dashboard/leads" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                        <Users size={20} />
                        <span>Leads</span>
                    </Link>
                    <Link href="/admin/dashboard/quotations" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                        <FileCheck size={20} />
                        <span>Quotations</span>
                    </Link>
                    <Link href="/admin/dashboard/invoices" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                        <FileText size={20} />
                        <span>Invoices</span>
                    </Link>
                    <Link href="/admin/dashboard/projects" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                        <FolderKanban size={20} />
                        <span>Projects</span>
                    </Link>
                    <Link href="/admin/dashboard/settings" className="flex items-center space-x-3 p-3 rounded-lg text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <Link href="/api/auth/logout" prefetch={false} className="flex items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 md:px-8">
                    <h2 className="text-lg md:text-xl font-semibold">Admin Panel</h2>
                    <div className="flex items-center space-x-3 md:space-x-4">
                        <Link href="/api/auth/logout" prefetch={false} className="md:hidden p-2 text-gray-400 hover:text-red-400 transition-colors" title="Logout">
                            <LogOut size={20} />
                        </Link>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold">
                            RA
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 bg-gray-900">
                    {children}
                </div>
            </main>
        </div>
    );
}
