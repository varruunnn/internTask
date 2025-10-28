import React, { useState } from 'react'
import axios from 'axios';
import { ShoppingCart, Trash2, X, Loader2, AlertCircle } from 'lucide-react';
export default function ProductItem({ product, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    await onAddToCart(product._id, 1);
    setIsAdding(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-56 object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/8b5cf6/white?text=Image+Error'; }}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-violet-700">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex justify-center items-center bg-violet-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isAdding ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};