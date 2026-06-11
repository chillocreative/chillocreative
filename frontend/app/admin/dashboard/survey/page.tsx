import { prisma } from '@/lib/prisma';
import SurveyClient from './SurveyClient';

export const dynamic = 'force-dynamic';

export default async function SurveyAdminPage() {
    let responses: unknown[] = [];
    try {
        responses = await prisma.surveyResponse.findMany({
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        // Jangan crash halaman jika jadual belum dimigrasi / DB tidak dapat dicapai.
        console.error('Gagal memuatkan tinjauan MBSP:', error);
    }

    return <SurveyClient initialResponses={JSON.parse(JSON.stringify(responses))} />;
}
