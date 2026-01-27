'use client';

import { useState } from 'react';
import { Plus, Clock, Briefcase, DollarSign, AlertCircle, X, CheckCircle2, ChevronRight, MoreVertical, Trash2, Eye, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [projects, setProjects] = useState(initialProjects);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const { project } = await res.json();
                setProjects([project, ...projects]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            // Re-fetch or update state
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(data.projects);
            setIsAddModalOpen(false);
            setLoading(false);
            router.refresh();
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm('Delete this project?')) return;
        try {
            const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProjects(projects.filter(p => p.id !== id));
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Project Tracker</h1>
                    <p className="text-gray-400 mt-2">Monitor progress of active client projects</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all transform hover:scale-[1.02]"
                >
                    <Plus size={20} />
                    <span>New Project</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-all shadow-lg group">
                        <div className="p-6 space-y-4">
                            <div className="flex justify-between items-start">
                                <div className={`p-2 rounded-lg ${project.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                                    project.status === 'Review' ? 'bg-yellow-500/10 text-yellow-400' :
                                        'bg-blue-500/10 text-blue-400'
                                    }`}>
                                    <Briefcase size={20} />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-gray-900/50 border border-gray-700 text-gray-400">
                                        {project.status}
                                    </span>
                                    <button
                                        onClick={() => handleDeleteProject(project.id)}
                                        className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                        title="Delete Project"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{project.title}</h3>
                                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{project.description || 'No description provided.'}</p>
                            </div>

                            <div className="pt-4 border-t border-gray-700 flex justify-between items-center text-xs">
                                <div className="flex flex-col">
                                    <span className="text-gray-500 uppercase font-bold tracking-tight">Client</span>
                                    <span className="text-gray-200 uppercase">{project.clientName}</span>
                                </div>
                                <div className="flex flex-col text-right">
                                    <span className="text-gray-500 uppercase font-bold tracking-tight">Budget</span>
                                    <span className="text-blue-400 font-bold flex items-center justify-end">
                                        <DollarSign size={10} />
                                        {Number(project.budget || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                    <span>Progress</span>
                                    <span>{project.status === 'Completed' ? '100%' : project.status === 'Review' ? '85%' : '45%'}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${project.status === 'Completed' ? 'bg-green-500' :
                                            project.status === 'Review' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                            }`}
                                        style={{ width: project.status === 'Completed' ? '100%' : project.status === 'Review' ? '85%' : '45%' }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900 border-t border-gray-700 px-6 py-3 flex justify-between items-center">
                            <div className="flex items-center space-x-2 text-xs text-gray-500 lowercase">
                                <Clock size={14} />
                                <span>Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all" title="View Details"><Eye size={16} /></button>
                                <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all" title="Edit Project"><Edit size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50">
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight">Launch New Project</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleAddProject} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Title</label>
                                <input name="title" required placeholder="e.g. E-commerce Overhaul" className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Client Name</label>
                                    <input name="clientName" required className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Budget ($)</label>
                                    <input name="budget" type="number" step="0.01" className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Description</label>
                                <textarea name="description" rows={3} className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="space-y-2">
                                    <label className="font-bold text-gray-400 uppercase tracking-wider">Start Date</label>
                                    <input name="startDate" type="date" className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="font-bold text-gray-400 uppercase tracking-wider">Status</label>
                                    <select name="status" className="w-full bg-gray-900 border border-gray-700 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-blue-500 outline-none font-bold uppercase">
                                        <option>Planning</option>
                                        <option>Development</option>
                                        <option>Review</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-4">
                                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20">
                                    {loading ? 'Creating...' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
