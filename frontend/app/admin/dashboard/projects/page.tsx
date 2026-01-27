import { prisma } from '@/lib/prisma';
import ProjectsClient from './ProjectsClient';

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { updatedAt: 'desc' },
    });

    return <ProjectsClient initialProjects={JSON.parse(JSON.stringify(projects))} />;
}
