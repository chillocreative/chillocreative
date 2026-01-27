import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import AdminShell from '@/components/admin/AdminShell';

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
        <AdminShell>
            {children}
        </AdminShell>
    );
}
