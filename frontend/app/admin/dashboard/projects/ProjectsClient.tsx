'use client';

import { useState } from 'react';
import { Plus, Clock, Briefcase, DollarSign, AlertCircle, X, CheckCircle2, ChevronRight, MoreVertical, Trash2, Eye, Edit, User, Layout, Save, RefreshCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
    const [projects, setProjects] = useState(initialProjects);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null);
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
                body: JSON.stringify({
                    ...data,
                    budget: parseFloat(data.budget as string) || 0,
                    startDate: data.startDate ? new Date(data.startDate as string).toISOString() : new Date().toISOString()
                }),
            });
            if (res.ok) {
                const { project } = await res.json();
                setProjects([project, ...projects]);
                setIsAddModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProject = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch(`/api/projects/${selectedProject.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    budget: parseFloat(data.budget as string) || 0,
                }),
            });
            if (res.ok) {
                const { project } = await res.json();
                setProjects(projects.map(p => p.id === project.id ? project : p));
                setIsEditModalOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm('Are you sure? This will delete all associated data.')) return;
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

    const getProgress = (status: string) => {
        switch (status) {
            case 'Completed': return 100;
            case 'Review': return 80;
            case 'Development': return 50;
            case 'Planning': return 20;
            case 'On Hold': return 10;
            default: return 0;
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Project Matrix</h1>
                    <p className="text-gray-400 mt-2 font-medium">Control center for all active builds and client requests</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center space-x-2 px-8 py-4 bg-white text-black rounded-2xl font-black transition-all shadow-xl hover:scale-[1.02] active:scale-[0.95] uppercase text-xs tracking-[0.2em]"
                >
                    <Plus size={18} strokeWidth={3} />
                    <span>Initialize Build</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p) => (
                    <div key={p.id} className="bg-gray-800/40 border border-gray-700 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all shadow-2xl group relative backdrop-blur-sm">
                        <div className="p-8 space-y-6">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-2xl ${p.status === 'Completed' ? 'bg-green-500/10 text-green-400' :
                                    p.status === 'On Hold' ? 'bg-red-500/10 text-red-500' :
                                        'bg-blue-500/10 text-blue-400'
                                    }`}>
                                    <Layout size={24} />
                                </div>
                                <div className="flex items-center space-x-1">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-400 shadow-inner">
                                        {p.status}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-tighter leading-none italic">{p.title}</h3>
                                <p className="text-gray-500 text-xs mt-3 line-clamp-2 leading-relaxed font-medium">{p.description || 'No specific requirements logged.'}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-700/50">
                                <div>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Client</p>
                                    <p className="text-white text-sm font-black uppercase truncate">{p.clientName}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Budget</p>
                                    <p className="text-blue-400 text-sm font-black">RM {Number(p.budget || 0).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    <span>Build Progress</span>
                                    <span>{getProgress(p.status)}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden p-0.5 border border-gray-700">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)] ${p.status === 'Completed' ? 'bg-green-500' :
                                            p.status === 'On Hold' ? 'bg-red-500' :
                                                'bg-blue-500'
                                            }`}
                                        style={{ width: `${getProgress(p.status)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/60 border-t border-gray-700 px-8 py-5 flex justify-between items-center group-hover:bg-gray-900 transition-colors">
                            <div className="flex items-center space-x-2 text-[10px] text-gray-500 font-bold">
                                <Clock size={14} className="text-blue-500" />
                                <span>SYNCED {new Date(p.updatedAt).toLocaleDateString('en-GB')}</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => { setSelectedProject(p); setIsEditModalOpen(true); }}
                                    className="p-2.5 bg-gray-800 text-gray-400 hover:text-white border border-gray-700 hover:border-blue-500 rounded-xl transition-all"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteProject(p.id)}
                                    className="p-2.5 bg-gray-800 text-gray-400 hover:text-red-500 border border-gray-700 hover:border-red-500 rounded-xl transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modals */}
            {isAddModalOpen && (
                <ProjectFormModal
                    title="Initialize New Build"
                    onClose={() => setIsAddModalOpen(false)}
                    onSubmit={handleAddProject}
                    loading={loading}
                />
            )}

            {isEditModalOpen && selectedProject && (
                <ProjectFormModal
                    title="Sync Project Data"
                    onClose={() => setIsEditModalOpen(false)}
                    onSubmit={handleUpdateProject}
                    loading={loading}
                    initialData={selectedProject}
                />
            )}
        </div>
    );
}

function ProjectFormModal({ title, onClose, onSubmit, loading, initialData }: any) {
    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[100] p-4 font-sans">
            <div className="bg-gray-800 border-2 border-gray-700 rounded-[3rem] w-full max-w-2xl shadow-huge overflow-hidden animate-in zoom-in duration-300">
                <div className="p-10 border-b border-gray-700/50 flex justify-between items-center bg-gray-900/40">
                    <div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{title}</h2>
                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest mt-2 flex items-center">
                            <RefreshCcw size={12} className="mr-2" /> Global Sync Active
                        </p>
                    </div>
                    <button onClick={onClose} className="w-12 h-12 rounded-2xl bg-gray-700/50 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 transition-all"><X size={24} /></button>
                </div>
                <form onSubmit={onSubmit} className="p-10 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Project Name / Identity</label>
                        <input name="title" defaultValue={initialData?.title} required placeholder="e.g. SKYNET OVERHAUL" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none font-black text-xl tracking-tight transition-all uppercase" />
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Client Entity</label>
                            <input name="clientName" defaultValue={initialData?.clientName} required placeholder="Who is it for?" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none font-bold uppercase" />
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Project Budget (MYR)</label>
                            <input name="budget" type="number" step="0.01" defaultValue={Number(initialData?.budget)} placeholder="0.00" className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-blue-400 focus:border-blue-500 outline-none font-black text-xl transition-all" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Technical Brief / Requests</label>
                        <textarea name="description" defaultValue={initialData?.description} rows={4} placeholder="Log the client requests and technical debt here..." className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-[2rem] py-4 px-6 text-white focus:border-blue-500 outline-none font-medium resize-none leading-relaxed" />
                    </div>

                    <div className="grid grid-cols-2 gap-8 text-xs">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Current Lifecycle Status</label>
                            <select name="status" defaultValue={initialData?.status || 'Planning'} className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none font-black uppercase tracking-widest">
                                <option>Planning</option>
                                <option>Development</option>
                                <option>Review</option>
                                <option>Completed</option>
                                <option>On Hold</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-1">Initiation Date</label>
                            <input name="startDate" type="date" defaultValue={initialData?.startDate ? new Date(initialData.startDate).toISOString().split('T')[0] : ''} className="w-full bg-gray-900/50 border-2 border-gray-700 rounded-2xl py-4 px-6 text-white focus:border-blue-500 outline-none font-bold" />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button type="submit" disabled={loading} className="w-full bg-white hover:bg-gray-200 active:scale-[0.98] text-black font-black py-6 rounded-3xl transition-all shadow-xl shadow-white/5 uppercase tracking-[0.4em] text-sm flex items-center justify-center gap-3">
                            {loading ? <RefreshCcw className="animate-spin text-black" /> : <Save size={20} strokeWidth={3} />}
                            {loading ? 'INITIALIZING...' : 'SYNC TO MATRIX'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
