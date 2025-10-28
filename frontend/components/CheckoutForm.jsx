import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Trash2, X, Loader2, AlertCircle } from 'lucide-react';
export default function CheckoutForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill out all fields.'); // Simple validation
      return;
    }
    setIsSubmitting(true);
    await onSubmit({ name, email });
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border border-gray-200 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="jane.doe@example.com"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 flex justify-center items-center bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-colors disabled:bg-gray-400"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Place Order'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
