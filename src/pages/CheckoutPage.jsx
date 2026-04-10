import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setOrderComplete(true);
      clearCart();
    }, 1000);
  };

  if (orderComplete) {
    return (
      <div className="checkout-page container success-view">
        <div className="success-icon">✨</div>
        <h2>Order Confirmed!</h2>
        <p>Thank you for choosing Floriq. Your beautiful blooms are being prepared.</p>
        <button className="btn-primary" onClick={() => navigate('/')}>Return Home</button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page container empty-view">
        <p>Your cart is empty. Please add some items before checking out.</p>
        <button className="btn-primary" onClick={() => navigate('/shop')}>Back to Shop</button>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-form-container">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required placeholder="you@example.com" />
              </div>
            </div>

            <div className="form-section">
              <h3>Shipping Address</h3>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" required />
                </div>
                <div className="form-group half">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" required />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label htmlFor="city">City</label>
                  <input type="text" id="city" required />
                </div>
                <div className="form-group half">
                  <label htmlFor="zip">ZIP Code</label>
                  <input type="text" id="zip" required />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3>Payment (Mock)</h3>
              <p className="payment-note">This is a mock checkout. No real payment will be processed.</p>
              <div className="form-group">
                <label htmlFor="cardName">Name on Card</label>
                <input type="text" id="cardName" required />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" pattern="\d*" maxLength="16" required />
              </div>
            </div>

            <button type="submit" className="btn-primary place-order-btn">
              Place Order • ${subtotal.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3>Order Details</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
