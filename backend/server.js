import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Product } from './models/Product.js';
import { CartItem } from './models/CartItem.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    seedDatabase();
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err.message));

const MOCK_PRODUCTS = [
  { name: 'Vibe T-Shirt', price: 24.99, description: 'Comfortable cotton t-shirt with a minimalist Vibe logo.', imageUrl: 'https://placehold.co/400x400/8b5cf6/white?text=Vibe+Tee' },
  { name: 'Vibe Hoodie', price: 59.99, description: 'Plush hoodie perfect for a chilly day. Stay vibin\'.', imageUrl: 'https://placehold.co/400x400/7c3aed/white?text=Vibe+Hoodie' },
  { name: 'Vibe Beanie', price: 19.99, description: 'Stylish beanie to keep your head warm.', imageUrl: 'https://placehold.co/400x400/a78bfa/white?text=Vibe+Beanie' },
  { name: 'Vibe Water Bottle', price: 29.99, description: 'Insulated steel water bottle. Hydrate in style.', imageUrl: 'https://placehold.co/400x400/c4b5fd/black?text=Vibe+Bottle' },
  { name: 'Vibe Tote Bag', price: 34.99, description: 'Durable canvas tote for all your needs.', imageUrl: 'https://placehold.co/400x400/ddd6fe/black?text=Vibe+Tote' },
];

async function seedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('No products found. Seeding database...');
      await Product.insertMany(MOCK_PRODUCTS);
      console.log('Database seeded with mock products.');
    } else {
      console.log('Database already contains products. Skipping seed.');
    }
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
}

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/cart', async (req, res) => {
  try {
    const items = await CartItem.find().populate('product');
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    res.json({ items, total: total.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

app.post('/api/cart', async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid input: productId and a positive quantity are required.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cartItem = await CartItem.findOne({ product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({
        product: productId,
        quantity: quantity
      });
      await cartItem.save();
    }
    const populatedItem = await CartItem.findById(cartItem._id).populate('product');
    res.status(201).json(populatedItem);

  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    const deletedItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }
    res.json({ message: 'Item removed from cart.' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

app.post('/api/checkout', async (req, res) => {
  const { cartItems, userInfo } = req.body;

  if (!cartItems || !userInfo || !userInfo.name || !userInfo.email) {
    return res.status(400).json({ message: 'Missing cart items or user info.' });
  }

  try {
    let serverTotal = 0;
    for (const item of cartItems) {
      const product = await Product.findById(item.product._id);
      if (product) {
        serverTotal += product.price * item.quantity;
      }
    }

    const mockReceipt = {
      user: userInfo,
      items: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: serverTotal.toFixed(2),
      timestamp: new Date().toISOString(),
      confirmationId: `VB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    };
    await CartItem.deleteMany({});

    res.json(mockReceipt);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
