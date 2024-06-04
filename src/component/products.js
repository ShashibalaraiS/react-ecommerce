import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { cart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3001/productList')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        console.log(`Product with ID ${product} added to cart`);
    };
    const handleRedirectToCart =()=>{
        navigate('/cart');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-container">
            <div className='cartDiv'>
            <button className="checkout-buttons" onClick={handleRedirectToCart}>Checkout ({cart.length}) items</button>
            </div>
           
            {products.map(product => (
                <div key={product.id} className="product-card">
                    <h2>{product.name}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p><br></br>
                    <button className="button-add-to-cart" onClick={() => handleAddToCart(product)} >Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default Products;
