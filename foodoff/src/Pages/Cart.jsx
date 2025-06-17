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
        <> 
       {loggedInUser ? <div className='cart-container container-fluid ' >
            <div className="row justify-content-center p-2 p-md-3" >
                <div className="col-12 col-md-12 order-summary mb-3 mb-lg-0 pe-lg-3 " >
                    <h4 className="fw-bold mb-3 text-black">Your Cart</h4>
                    <div className="cart-items-container">
                        {(!loggedInUser || cartItems.length === 0) ? (
                            <img src="https://static.wixstatic.com/media/7742ef_dfe620d0354b471b8620fcb2c3a46e62~mv2.gif" alt="" className='img-fluid' />
                        ) : (
                            cartItems.map(item => {
                                return (
                                    <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                                        <div className="item-image-container">
                                            <img src={item.image} className="item-image img-fluid " />
                                        </div>


                                        <div className="d-flex m align-items-start">
                                            <div>
                                                <div className="text-black text-end ">{item.name}</div>
                                                <div className="fw-medium text-end text-dark">[{item.varient}]</div>

                                            </div>

                                            {/* Quantity and Price */}
                                            <div className="text-end">
                                                <div className="d-flex  align-items-center border rounded-pill px-2 py-1 gap-2">
                                                    <button className="btn p-1" onClick={() => dispatch(addToCart(item, item.quantity - 1, item.varient))}>
                                                        <FontAwesomeIcon icon={faMinus} className="text-danger" />
                                                    </button>
                                                    <span className="fw-semibold text-black">{item.quantity}</span>
                                                    <button className="btn  p-1" onClick={() => dispatch(addToCart(item, item.quantity + 1, item.varient))}>
                                                        <FontAwesomeIcon icon={faPlus} className="text-success" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Delete Button */}
                                            <div className="fw text-black  mt-1">₹{item.price}</div>

                                            <button className="btn text-danger" onClick={() => dispatch(deleteFromCart(item))}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>

                                        </div>


                                    </div>
                                    
                                );
                            })
                        )}
                    </div>
                <div class="d-flex justify-content-between align-items-center p-3 bg-white ">
                            <div>
                                <div class="fs-4 fw-bold text-black">Total: ₹{subtotal} <i class="bi bi-info-circle"></i></div>
                            </div>
                            <button class="order-button w-50 mt-3" disabled={cartItems.length === 0} onClick={handlePlaceOrder}>Place Order  <Order subtotal={subtotal} /> </button>
                        </div>
                    </div>
                </div>
            </div>
                :
                <div class="cart-login " style={{ marginTop: "120px" }}>
                    <div class="login-prompt fw-bold">Please Login</div>
                    <div class="login-instruction">Please login to access the cart.</div>
                    <a href="./login"><button class="login-btn w-100 " >Login</button></a>
                </div>
            }
            </>
    );
}

export default Cart;