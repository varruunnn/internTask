import React from 'react'
import ProductItem from './ProductItem'

export default function ProductList({ products, onAddToCart }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <ProductItem key={product._id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}

