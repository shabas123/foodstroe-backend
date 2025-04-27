import React, { useEffect, useState } from 'react';
import { getAllOrderAPI } from '../local/api';

export default function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
      fetchOrders();
    }, []);

    const fetchOrders = async () => {
      const result = await getAllOrderAPI();
      if (result.status === 200) {
        setOrders(result.data);
      }else {
        
      }
    };

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <div className="text-center">
                    <h5>No orders found. Start ordering now!</h5>
                    <img src="https://cdn.dribbble.com/users/17630/screenshots/4220480/media/3558a23a45db3c8073f76e8864c8adcc.gif" alt="No orders" className="img-fluid mt-3" style={{maxWidth: '300px'}} />
                </div>
            ) : (
                <div className="row">
                    {orders.map((order, index) => (
                        <div key={order._id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">Order #{index + 1}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Order ID: {order._id.slice(-6)}</h6>
                                    <div className="mb-2">
                                        <strong>Items:</strong>
                                        {order.items && order.items.length > 0 ? (
                                            <ul className="list-unstyled mb-1">
                                                {order.items.map((item, idx) => (
                                                    <li key={idx}>🛒 {item.name} × {item.quantity}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p>No items found</p>
                                        )}
                                    </div>
                                    <div className="mb-2">
                                        <strong>Total:</strong> ₹{order.total}
                                    </div>
                                    <div className="mt-auto">
                                        <span className='btn btn-warning'>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
