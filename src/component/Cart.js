import React,{useState} from 'react';
import { useCart } from '../CartContext';

const Cart = () => {
    const { cart } = useCart();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    console.log("usecart",cart)
    const handleCheckout = () => {
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'productList' : cart,
                    'userData':formData
                })
            });
            console.log("responsez:::",response)
            if (response.ok) {
                // Handle success, e.g., show success message
                alert("Data added successfully")
                console.log('Checkout successful!');
            } else {
                // Handle error, e.g., show error message
                console.error('Checkout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        }
    };

    return (
        <div className="product-card">
            <h1>Shopping Cart</h1>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item.name} - ${item.price}
                    </li>
                ))}
                
            </ul>
            <button className="checkout-button" onClick={handleCheckout}>Checkout ({cart.length}) items</button>
            {showForm && (
                <form onSubmit={handleSubmit} className="checkout-form">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="form-input" required />
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required />
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            )}
        </div>
    );
};

export default Cart;
