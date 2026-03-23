
import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.slug}`} className="group relative block overflow-hidden rounded-lg">
      <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
        <h3 className="text-white text-2xl font-serif font-semibold">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
