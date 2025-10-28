import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { ShoppingCart, Trash2, X, Loader2, AlertCircle } from 'lucide-react';
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import ProductList from '../components/ProductList'
import CartView from '../components/CartView'
import CheckoutForm from '../components/CheckoutForm'
import ReceiptModal from '../components/ReceiptModal'

axios.defaults.baseURL = 'http://localhost:5001';

function App() {
  const [view, setView] = useState('products'); 
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [receipt, setReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Could not load products. Please try again later.');
    }
  }, []);

  const fetchCart = useCallback(async () => {
    try {
      const res = await axios.get('/api/cart');
      setCart(res.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Could not load your cart. Please try again later.');
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      await Promise.all([fetchProducts(), fetchCart()]);
      setIsLoading(false);
    };
    loadData();
  }, [fetchProducts, fetchCart]);
  const handleAddToCart = async (productId, quantity) => {
    try {
      await axios.post('/api/cart', { productId, quantity });
      await fetchCart(); 
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart.');
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await axios.delete(`/api/cart/${cartItemId}`);
      await fetchCart(); 
    } catch (err) {
      console.error('Error removing from cart:', err);
      alert('Failed to remove item from cart.');
    }
  };

  const handleCheckout = async (userInfo) => {
    try {
      const res = await axios.post('/api/checkout', {
        cartItems: cart.items,
        userInfo
      });
      setReceipt(res.data); 
      setCart({ items: [], total: 0 }); 
      setView('products'); 
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Checkout failed. Please try again.');
    }
  };
  const renderView = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    switch (view) {
      case 'cart':
        return <CartView cart={cart} onRemoveFromCart={handleRemoveFromCart} onCheckoutClick={() => setView('checkout')} />;
      case 'checkout':
        return <CheckoutForm onSubmit={handleCheckout} onCancel={() => setView('cart')} />;
      case 'products':
      default:
        return <ProductList products={products} onAddToCart={handleAddToCart} />;
    }
  };

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setView('products')}
            >
              <svg className="h-10 w-10 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-3xl font-bold text-gray-900">Vibe</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setView('products')}
                className={`text-lg font-medium ${view === 'products' ? 'text-violet-600' : 'text-gray-600'} hover:text-violet-600 transition-colors`}
              >
                Products
              </button>
              <button
                onClick={() => setView('cart')}
                className={`relative flex items-center text-lg font-medium ${view === 'cart' ? 'text-violet-600' : 'text-gray-600'} hover:text-violet-600 transition-colors`}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-violet-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
                <span className="ml-2 hidden sm:block">Cart</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderView()}
      </main>

      <footer className="bg-gray-800 text-gray-400 mt-16 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} Vibe Commerce. All rights reserved.</p>
          <p className="text-sm mt-1">Mock E-Com Site for Screening</p>
        </div>
      </footer>

      <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
    </div>
  );
}

export default App;
