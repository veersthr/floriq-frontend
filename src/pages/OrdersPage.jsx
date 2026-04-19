import { useEffect, useState } from 'react';
import { fetchWithAuth } from '../utils/api';
import { Package, Calendar, Clock, ChevronRight } from 'lucide-react';
import './OrdersPage.css';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchWithAuth('/api/orders/myorders');
        if (!response.ok) throw new Error('Failed to fetch orders');
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="orders-page container text-center"><p>Loading your orders...</p></div>;
  if (error) return <div className="orders-page container text-center"><p style={{ color: 'red' }}>{error}</p></div>;

  return (
    <div className="orders-page container">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track your flower deliveries and view your order history.</p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders text-center">
          <Package size={48} className="empty-icon" />
          <h3>No orders yet</h3>
          <p>When you buy beautiful blooms, they will appear here!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-main">
                <div className="order-info">
                  <div className="order-id-date">
                    <span className="order-id">Order #{order._id.slice(-8).toUpperCase()}</span>
                    <span className="order-date">
                      <Calendar size={14} />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="order-items-preview">
                    {order.items.map((item, idx) => (
                      <span key={idx} className="item-tag">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="order-stats">
                  <div className="order-total">${order.totalPrice.toFixed(2)}</div>
                  <div className={`status-badge ${order.status}`}>{order.status}</div>
                  {order.isPaid && <span className="payment-badge">Paid</span>}
                </div>
              </div>
              
              <div className="order-footer">
                <div className="delivery-info">
                  <Clock size={14} />
                  <span>Ship to: {order.customerName}</span>
                </div>
                <button className="view-details-btn">
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
