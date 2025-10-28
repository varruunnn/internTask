import React, { useState, useEffect, useCallback } from 'react'
import { ShoppingCart, Trash2, X, Loader2, AlertCircle } from 'lucide-react';

export default function CartItem({ item, onRemoveFromCart }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemoveFromCart(item._id);
  };

  return (
    <li className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/100x100/8b5cf6/white?text=Vibe'; }}
        />
        <div>
          <h4 className="font-medium text-gray-900">{item.product.name}</h4>
          <p className="text-sm text-gray-600">
            {item.quantity} x ${item.product.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-lg font-medium text-gray-900">
          ${(item.quantity * item.product.price).toFixed(2)}
        </span>
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-100 disabled:text-gray-300"
          aria-label="Remove item"
        >
          {isRemoving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
        </button>
      </div>
    </li>
  );
};
