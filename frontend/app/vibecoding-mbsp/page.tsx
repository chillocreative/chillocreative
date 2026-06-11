import type { Metadata } from 'next';
import SurveyForm from './SurveyForm';

export const metadata: Metadata = {
    title: 'Borang Tinjauan Peserta — Training Vibecoding MBSP',
    description:
        'Borang tinjauan latar belakang peserta program training Vibecoding untuk Majlis Bandaraya Seberang Perai (MBSP).',
    robots: { index: false, follow: false },
};

export default function VibecodingMbspPage() {
    return <SurveyForm />;
}
