import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../../lib/api';
import type { BlogPost } from '../../types';
import { Skeleton } from '../ui/Skeleton';
import { ArrowRight } from '../Icons';

const BlogSection: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getBlogPosts(4);
            setPosts(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <section className="py-16 bg-brand-secondary">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold text-center mb-12 text-brand-primary">Blog Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i}>
                            <Skeleton className="aspect-[4/3] w-full rounded-lg mb-4" />
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2 mb-4" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    )) : posts.map(post => (
                        <div key={post.id} className="bg-brand-background/50 rounded-lg overflow-hidden flex flex-col p-4">
                            <Link to={`/blog/${post.id}`} className="block mb-4">
                                <img src={post.image} alt={post.title} className="aspect-[4/3] w-full object-cover rounded-md" />
                            </Link>
                            <div className="flex flex-col flex-grow">
                                <p className="text-xs text-brand-muted mb-2">{post.date}</p>
                                <h3 className="font-semibold text-brand-text mb-2 flex-grow">
                                    <Link to={`/blog/${post.id}`} className="hover:text-brand-primary">{post.title}</Link>
                                </h3>
                                <p className="text-sm text-brand-muted mb-4">{post.excerpt}</p>
                                <Link to={`/blog/${post.id}`} className="mt-auto text-sm font-semibold text-brand-primary hover:text-brand-accent flex items-center">
                                    READ MORE <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
