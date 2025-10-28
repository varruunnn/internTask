import React from 'react'
import { X } from 'lucide-react'

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-screen overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Order Successful!</h2>
          <p className="text-gray-600 mt-2">Thank you for your purchase, {receipt.user.name}.</p>
          <p className="text-sm text-gray-500 mt-1">Confirmation ID: <span className="font-medium text-gray-700">{receipt.confirmationId}</span></p>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
            {receipt.items.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                <span className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center text-xl font-bold text-gray-900 border-t border-gray-200 mt-4 pt-4">
            <span>Total:</span>
            <span>${receipt.total}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-colors mt-8"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};