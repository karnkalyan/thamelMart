
import React from 'react';
import { Mail, Trash2, CheckCircle, Clock } from 'lucide-react';
import { useDataStore } from '../../store/dataStore';
import { cn } from '../../lib/utils';

const AdminMessages: React.FC = () => {
    const { messages, markMessageRead, deleteMessage } = useDataStore();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-serif font-black text-brand-primary">Customer Inquiries</h1>
                <p className="text-sm text-brand-muted mt-1">Found {messages.filter(m => m.status === 'new').length} unread messages from the community.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {messages.length === 0 ? (
                    <div className="py-24 text-center bg-white rounded-[2rem] border border-stone-200 font-serif italic text-brand-muted">
                        No inquiries have been received yet.
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={cn(
                            "bg-white p-8 rounded-[2rem] border transition-all flex flex-col md:flex-row gap-8 relative overflow-hidden",
                            msg.status === 'new' ? "border-brand-secondary shadow-lg shadow-brand-secondary/5" : "border-stone-100"
                        )}>
                            {msg.status === 'new' && <div className="absolute top-0 left-0 w-2 h-full bg-brand-secondary"></div>}
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-footer flex items-center justify-center font-bold text-brand-primary">
                                            {msg.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-brand-primary">{msg.name}</h3>
                                            <p className="text-xs text-brand-muted font-mono">{msg.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-stone-400 text-[10px] font-black uppercase tracking-widest">
                                        <Clock className="w-3 h-3" /> {msg.date}
                                    </div>
                                </div>
                                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 italic text-sm text-brand-muted leading-relaxed">
                                    "{msg.message}"
                                </div>
                            </div>
                            <div className="flex md:flex-col justify-end gap-2">
                                {msg.status === 'new' && (
                                    <button 
                                        onClick={() => markMessageRead(msg.id)}
                                        className="inline-flex items-center px-4 py-2.5 bg-brand-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary/95 transition-all shadow-md"
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" /> Mark Handled
                                    </button>
                                )}
                                <button onClick={() => deleteMessage(msg.id)} className="inline-flex items-center px-4 py-2.5 border border-stone-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminMessages;
