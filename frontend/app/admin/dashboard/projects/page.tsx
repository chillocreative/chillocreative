import { prisma } from '@/lib/prisma';
import { LayoutGrid, List, Plus, Clock, CheckCircle2, AlertCircle, DollarSign, Briefcase } from 'lucide-react';

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: { updatedAt: 'desc' },
    });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Project Tracker</h1>
                    <p className="text-gray-400 mt-2">Monitor progress of active client projects</p>
                </div>
                <button className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all transform hover:scale-[1.02]">
                    <Plus size={20} />
                    <span>New Project</span>
                </button>
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all shadow-lg group">
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-lg ${project.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                                        project.status === 'Review' ? 'bg-yellow-500/10 text-yellow-400' :
                                            project.status === 'Development' ? 'bg-blue-500/10 text-blue-400' :
                                                'bg-gray-500/10 text-gray-400'
                                    }`}>
                                    <Briefcase size={20} />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-gray-900/50 border border-gray-700 ${project.status === 'Completed' ? 'text-green-400' :
                                        project.status === 'Review' ? 'text-yellow-400' :
                                            project.status === 'Development' ? 'text-blue-400' :
                                                'text-gray-400'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase">{project.title}</h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{project.description}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-700 flex justify-between items-center text-xs">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 uppercase font-bold tracking-tight">Client</span>
                                    <span className="text-gray-300 uppercase">{project.clientName}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-gray-500 uppercase font-bold tracking-tight">Budget</span>
                                    <span className="text-blue-400 font-bold flex items-center justify-end">
                                        <DollarSign size={10} />
                                        {Number(project.budget || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar Placeholder */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    <span>Progress</span>
                                    <span>{project.status === 'Completed' ? '100%' : project.status === 'Review' ? '85%' : project.status === 'Development' ? '45%' : '10%'}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${project.status === 'Completed' ? 'bg-green-500' :
                                                project.status === 'Review' ? 'bg-yellow-500' :
                                                    project.status === 'Development' ? 'bg-blue-500' :
                                                        'bg-gray-700'
                                            }`}
                                        style={{ width: project.status === 'Completed' ? '100%' : project.status === 'Review' ? '85%' : project.status === 'Development' ? '45%' : '10%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 border-t border-gray-700 px-6 py-3 flex justify-between items-center">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                                <Clock size={14} />
                                <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                            </div>
                            <button className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase">Details &rarr;</button>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="bg-gray-800 rounded-2xl border border-gray-700 p-12 text-center">
                    <AlertCircle size={48} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-bold text-white uppercase">No Active Projects</h3>
                    <p className="text-gray-500 mt-2">Start a new project to track progress and budgets.</p>
                </div>
            )}
        </div>
    );
}
