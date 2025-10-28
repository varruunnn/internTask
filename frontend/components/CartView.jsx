import React, { useState, useEffect, useCallback } from 'react'
import CartItem from './CartItem'

export default function CartView({ cart, onRemoveFromCart, onCheckoutClick }) {
  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-300" />
        <h2 className="mt-6 text-2xl font-semibold text-gray-700">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h2>
      <ul className="bg-white rounded-lg shadow-md border border-gray-200 divide-y divide-gray-200">
        {cart.items.map(item => (
          <CartItem key={item._id} item={item} onRemoveFromCart={onRemoveFromCart} />
        ))}
      </ul>
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="flex justify-between items-center text-2xl font-semibold text-gray-900">
          <span>Total:</span>
          <span>${cart.total}</span>
        </div>
        <p className="text-gray-500 text-sm mt-2">Shipping and taxes calculated at checkout.</p>
        <button
          onClick={onCheckoutClick}
          className="w-full bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-colors mt-6"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
