
import React, { useState, useMemo } from 'react';
import { useDataStore } from '../../store/dataStore';
import { Star, Trash2, Search, ExternalLink, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const AdminReviews: React.FC = () => {
    const { products, deleteReview } = useDataStore();
    const [searchTerm, setSearchTerm] = useState('');

    const allReviews = useMemo(() => {
        const reviews: any[] = [];
        products.forEach(product => {
            if (product.reviews) {
                product.reviews.forEach(review => {
                    reviews.push({
                        ...review,
                        productId: product.id,
                        productName: product.name,
                        productImage: product.images[0]
                    });
                });
            }
        });
        return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [products]);

    const filteredReviews = allReviews.filter(review => 
        review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (productId: string, reviewId: string) => {
        if (window.confirm('Are you sure you want to remove this reflection?')) {
            deleteReview(productId, reviewId);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-black text-brand-primary">Community Reflections</h1>
                    <p className="text-brand-muted font-medium">Manage all product reviews and feedback.</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <input 
                            type="text" 
                            placeholder="Search reviews, users, or products..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/10 transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-400">
                        <MessageSquare className="w-4 h-4" />
                        <span>{filteredReviews.length} Total Reflections</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-stone-50/50">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Product</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Reviewer</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Rating</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Comment</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {filteredReviews.map((review) => (
                                <tr key={`${review.productId}-${review.id}`} className="hover:bg-stone-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <Link to={`/admin/products/${review.productId}`} className="flex items-center gap-3 group/prod">
                                            <img src={review.productImage} alt="" className="w-10 h-10 rounded-lg object-cover border border-stone-100" />
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-brand-primary truncate group-hover/prod:text-brand-secondary transition-colors">{review.productName}</p>
                                                <p className="text-[9px] text-stone-400">ID: {review.productId}</p>
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-brand-footer flex items-center justify-center text-[10px] font-bold text-brand-primary">
                                                {review.userName.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold text-brand-primary">{review.userName}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star 
                                                    key={i} 
                                                    className={cn(
                                                        "w-3 h-3",
                                                        i < review.rating ? "text-brand-secondary fill-brand-secondary" : "text-stone-200"
                                                    )} 
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-xs text-brand-muted line-clamp-2 max-w-xs leading-relaxed italic">"{review.comment}"</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">{review.date}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link 
                                                to={`/product/${review.productId}`} 
                                                target="_blank"
                                                className="p-2 text-stone-400 hover:text-brand-primary transition-colors"
                                                title="View on Store"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(review.productId, review.id)}
                                                className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                                                title="Delete Review"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredReviews.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-8 h-8 text-stone-200" />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-brand-primary mb-2">No reflections found</h3>
                        <p className="text-brand-muted text-sm">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;
