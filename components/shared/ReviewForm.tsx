
import React, { useState } from 'react';
import { Star, X } from '../Icons';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';
import type { Review } from '../../types';

interface ReviewFormProps {
  onSubmit: (review: Omit<Review, 'id' | 'date' | 'isVerified'>) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userName, setUserName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !userName || !comment) {
      setError('Please fill in all fields and provide a rating.');
      return;
    }
    setError('');
    onSubmit({ userName, rating, comment });
    // Reset form
    setRating(0);
    setUserName('');
    setComment('');
  };

  return (
    <div className="bg-stone-50 p-6 sm:p-8 rounded-xl border border-stone-200 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif font-bold text-brand-text">Write a Review</h3>
        <button onClick={onCancel} className="text-brand-muted hover:text-brand-text transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-md border border-red-100">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-muted mb-3">
            Your Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="focus:outline-none transition-transform hover:scale-110"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  className={cn(
                    "w-8 h-8 transition-colors",
                    (hover || rating) >= star 
                      ? "text-brand-secondary fill-brand-secondary" 
                      : "text-stone-300"
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="userName" className="block text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">
            Your Name
          </label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="e.g. Tenzin Gyatso"
            className="w-full bg-white px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none text-sm transition-all"
          />
        </div>

        <div>
          <label htmlFor="comment" className="block text-xs font-bold uppercase tracking-widest text-brand-muted mb-2">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            className="w-full bg-white px-4 py-3 border border-stone-300 rounded-md focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none text-sm transition-all resize-none"
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button type="submit" className="flex-1 h-12">
            Submit Review
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
