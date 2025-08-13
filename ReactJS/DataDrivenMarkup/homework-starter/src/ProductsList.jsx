// ProductsList.jsx
import "./ProductsList.css";
import React from 'react';
import { ProductCard } from "./ProductCard";
import { products } from './products';

function ProductsList() {

    return (
        <div className="product-list">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    discount={product.discount}
                    imageUrl={product.imageUrl}
                />
            ))}
        </div>
    );
}

export default ProductsList;