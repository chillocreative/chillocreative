import SettingsClient from './SettingsClient';

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-5xl">
            <div>
                <h1 className="text-3xl font-bold text-white">CRM Settings</h1>
                <p className="text-gray-400 mt-2">Manage your account and platform preferences</p>
            </div>

            <SettingsClient />
        </div>
    );
}
