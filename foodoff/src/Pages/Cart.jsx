import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import './Cart.css';
import Order from '../Components/Order';
import { orderAPI } from '../local/api';
import { toast } from 'react-toastify';

function Cart() {
    const cartstate = useSelector(state => state.cartReducer);
    const cartItems = cartstate.cartItems;
    const [loggedInUser, setloggedInUser] = useState('')
    
    var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
    const dispatch = useDispatch();

    useEffect(() => {
       if (sessionStorage.getItem("loggedInUser")) {
         setloggedInUser(sessionStorage.getItem("loggedInUser"))
   
       }
     }, [])
   
     const handlePlaceOrder = async () => {
     
        try {
            const orderData = {
                userId: loggedInUser,
                items: cartItems, 
                total: subtotal 
            };

            const response = await orderAPI(orderData)
            if (response.status === 201) {
                toast.success(`Your Order For Prepairing`)
                dispatch({ type: 'CLEAR_CART' }); 
                sessionStorage.removeItem('cartItems');   
                localStorage.removeItem('cartItems');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Something went wrong. Please try again!');
        }
    };
    return (
        <div className='cart-container container-fluid mt-5 '>
            <div className="row justify-content-center p-2 p-md-3">
                <div className="col-12 col-md-8 col-lg-6 order-summary mb-3 mb-lg-0 pe-lg-3">
                    <h2 className="order-header">Order Summary</h2>

                    <div className="cart-items-container">
                        {(!loggedInUser || cartItems.length === 0) ? (
                           <img src="https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif" alt=""  className='img-fluid'/>
                        ) : (
                            cartItems.map(item => {
                                return (
                                    <div key={item.id} className="cart-item-container ">
                                       <div className="item-image-container">
                                            <img src={item.image} alt={item.name} className="item-image img-fluid" />
                                        </div>

                                        <div className="item-details">
                                            <h3 className="item-name">{item.name} <small>[{item.varient}]</small></h3>
                                            <p className="item-price">{item.quantity} × ₹{item.prices[0][item.varient]} = ₹{item.price}</p>

                                            <div className="quantity-control">
                                                <span className="quantity-label">Quantity: </span>
                                                <div className="quantity-buttons">
                                                    <button 
                                                        className="quantity-button btn border"
                                                        onClick={() => dispatch(addToCart(item, item.quantity - 1, item.varient))}
                                                        aria-label=""
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <span className="quantity-value">{item.quantity}</span>
                                                    <button 
                                                        className="quantity-button btn "
                                                        onClick={() => dispatch(addToCart(item, item.quantity + 1, item.varient))}
                                                        aria-label="Increase quantity"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="item-actions">
                                            <button 
                                                className="btn"
                                                onClick={() => dispatch(deleteFromCart(item))}
                                                aria-label="Remove item"
                                            >
                                                <FontAwesomeIcon icon={faTrash} className="delete-icon" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4 order-summary ms-3" style={{alignItems:"center"}}>
                    <h2 className="order-header">Payment Method</h2>
                    <div className="payment-summary">
                        <h3 className="subtotal">SubTotal: ₹{subtotal}</h3>
                        <h3 className="subtotal">To Pay: ₹{subtotal}</h3>
                    </div>

                    <div className="payment-options">   
                    </div>
                    <button className='order-button w-100 mt-3' disabled={cartItems.length === 0} onClick={handlePlaceOrder}>
                        Place order <Order subtotal={subtotal} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;