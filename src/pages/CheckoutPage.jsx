import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { fetchWithAuth } from '../utils/api';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in to place an order.');
      setTimeout(() => navigate('/login'), 2500);
      return;
    }

    setLoading(true);
    
    // Structure items for the backend
    const formattedItems = cartItems.map(item => ({
      productId: item._id || item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }));

    const orderData = {
      customerName: e.target.firstName.value + ' ' + e.target.lastName.value,
      email: e.target.email.value,
      phone: '123-456-7890', // placeholder since UI doesn't have phone
      address: `${e.target.address.value}, ${e.target.city.value}, ${e.target.zip.value}`,
      items: formattedItems,
      totalPrice: subtotal
    };

    try {
      // 1. Create order in our database
      const response = await fetchWithAuth('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });

      const dbOrder = await response.json();
      if (!response.ok) throw new Error(dbOrder.message || 'Failed to create order');

      // 2. Create Razorpay order
      const paymentResponse = await fetchWithAuth('/api/payment/order', {
        method: 'POST',
        body: JSON.stringify({
          amount: subtotal,
          orderId: dbOrder._id
        })
      });

      const razorpayOrder = await paymentResponse.json();
      if (!paymentResponse.ok) throw new Error(razorpayOrder.message || 'Failed to create Razorpay order');

      // 3. Open Razorpay Checkout
      const options = {
        key: razorpayOrder.key, // Now dynamically fetched from backend
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Floriq",
        description: "Floral Arrangement Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            setLoading(true);
            const verifyRes = await fetchWithAuth('/api/payment/verify', {
              method: 'POST',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                db_order_id: dbOrder._id
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              setOrderComplete(true);
              clearCart();
            } else {
              setError(verifyData.message || "Verification failed");
            }
          } catch (err) {
            setError("Error verifying payment");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: orderData.customerName,
          email: orderData.email,
        },
        theme: {
          color: "#c07850",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        setError(response.error.description);
      });
      rzp1.open();

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', background: '#ffe4e4', padding: '10px', borderRadius: '8px' }}>{error}</div>}
      <div className="checkout-content">
        <div className="checkout-form-container">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3>Contact Information</h3>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required placeholder="you@example.com" defaultValue={user ? user.email : ''} />
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

            <button type="submit" disabled={loading} className="btn-primary place-order-btn">
              {loading ? 'Processing...' : `Place Order • $${subtotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3>Order Details</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item._id} className="summary-item">
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
