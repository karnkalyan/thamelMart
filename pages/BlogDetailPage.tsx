
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { Calendar, User, MessageSquare, ArrowLeft, Send } from 'lucide-react';
import Button from '../components/ui/Button';
import Markdown from 'react-markdown';

const BlogDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { blogs, addBlogComment } = useDataStore();
    const { user, isAuthenticated } = useAuthStore();
    const [commentText, setCommentText] = useState('');

    const post = blogs.find(b => b.id === id);

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-serif font-bold mb-4">Article Not Found</h2>
                <Link to="/" className="text-brand-primary hover:underline">Return Home</Link>
            </div>
        );
    }

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        addBlogComment(post.id, {
            userName: user?.name || 'Guest Explorer',
            text: commentText
        });
        setCommentText('');
    };

    return (
        <div className="bg-brand-background min-h-screen pb-20">
            <div className="h-[50vh] relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                    <div className="max-w-4xl">
                        <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 text-sm font-bold uppercase tracking-widest transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center justify-center gap-6 text-white/80 text-sm font-medium">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" /> {post.author || 'Thamel Mart Editorial'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-stone-100">
                        <div className="prose prose-stone max-w-none">
                            <p className="text-xl text-brand-muted font-serif italic mb-12 leading-relaxed border-l-4 border-brand-accent pl-8">
                                {post.excerpt}
                            </p>
                            <div className="text-brand-text leading-loose space-y-6 text-lg markdown-body">
                                {post.content ? (
                                    <Markdown>{post.content}</Markdown>
                                ) : (
                                    <p>The full story of this Himalayan treasure is being carefully documented. Check back soon for the complete narrative of craftsmanship and tradition.</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-20 pt-12 border-t border-stone-100">
                            <h3 className="text-2xl font-serif font-bold text-brand-primary mb-8 flex items-center gap-3">
                                <MessageSquare className="w-6 h-6 text-brand-accent" /> 
                                Community Voices ({post.comments?.length || 0})
                            </h3>

                            <div className="space-y-8 mb-12">
                                {post.comments && post.comments.length > 0 ? post.comments.map(comment => (
                                    <div key={comment.id} className="bg-stone-50 rounded-3xl p-6 border border-stone-100">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-brand-primary">{comment.userName}</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{comment.date}</span>
                                        </div>
                                        <p className="text-brand-muted leading-relaxed">{comment.text}</p>
                                    </div>
                                )) : (
                                    <p className="text-stone-400 italic text-center py-8">Be the first to share your thoughts on this story.</p>
                                )}
                            </div>

                            <div className="bg-brand-footer rounded-[2rem] p-8">
                                <h4 className="text-lg font-bold text-brand-primary mb-4">Leave a Reflection</h4>
                                <form onSubmit={handleCommentSubmit} className="space-y-4">
                                    <textarea 
                                        value={commentText}
                                        onChange={e => setCommentText(e.target.value)}
                                        placeholder={isAuthenticated ? "Share your thoughts..." : "Please log in to leave a comment"}
                                        disabled={!isAuthenticated}
                                        className="w-full bg-white border border-stone-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-brand-primary/10 min-h-[120px]"
                                    />
                                    <div className="flex justify-end">
                                        <Button 
                                            type="submit" 
                                            disabled={!isAuthenticated || !commentText.trim()}
                                            className="px-8"
                                        >
                                            <Send className="w-4 h-4 mr-2" /> Post Reflection
                                        </Button>
                                    </div>
                                    {!isAuthenticated && (
                                        <p className="text-center text-xs text-brand-muted">
                                            Already a member? <Link to="/login" className="text-brand-primary font-bold hover:underline">Log in here</Link>
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
