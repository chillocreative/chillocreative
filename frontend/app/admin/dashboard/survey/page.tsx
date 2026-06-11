import { prisma } from '@/lib/prisma';
import SurveyClient from './SurveyClient';

export const dynamic = 'force-dynamic';

export default async function SurveyAdminPage() {
    const responses = await prisma.surveyResponse.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return <SurveyClient initialResponses={JSON.parse(JSON.stringify(responses))} />;
}
