import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../actions/cartActions'
import { getAllItems } from '../actions/itemAction'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import Cart from '../Pages/Cart'
import CartModal from './CartModel'
import CartModel from './CartModel'

export default function Item({ item }) {

  const [quantity, setquantity] = useState(1)
  const [varient, setvarient] = useState('Quater')
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const [qty, setQty] = useState(0)

  useEffect(() => {
    dispatch(getAllItems())
  }, [dispatch])

  const handleAdd = () => setQty(1)

  const increaseQty = () => setQty(qty + 1)

  const decreaseQty = () => {
    if (qty === 1) setQty(0)
    else setQty(qty - 1)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function addtoCart() {
    dispatch(addToCart(item, quantity, varient))
    toast.success(`Added to Cart`)
    handleShow()
  }

  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
        <CartModel isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        
        <Cart/>
        </CartModel>
                </div>
              </div>
            </div>
      <div className="product-card">
        <div className="image-container">
          <div className="position-relative">
            <img className='card' src={item.image} alt={item.name} />
            <div className="position-absolute top-0 end-0 bg-success text-white px-2 py-1 m-2 rounded-pill large">
              <i className="bi bi-star-fill me-1"></i>Popular
            </div>
          </div>

          {qty === 0 ? (
            <button onClick={() => { addtoCart (); setModalOpen(true)}} className="add-btn">ADD</button>
          ) : (
            <div className="qty-control">
              <button onClick={decreaseQty}>-</button>
              <span>{qty}</span>
              <button onClick={increaseQty}>+</button>
            </div>
          )}
        </div>

        <div className="product-details">
          <p className="price" style={{ fontWeight: "bold" }}>₹ {item.prices[0][varient] * quantity}</p>
          <p className="name">{item.name}</p>

          <div className="flex-container">
            <div className='w-100'>
              <p className="name">Varients</p>
              <select className='form-control w-75 shadow' style={{ border: "1px solid #ff0080" }} value={varient} onChange={(e) => setvarient(e.target.value)}>
                {item.varients.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>

            <div className=''>
              <p className="name">Quantity</p>
              <select className='form-control ms-1 shadow' style={{ border: "1px solid #ff0080" }} value={quantity} onChange={(e) => setquantity(e.target.value)}>
                {[...Array(10).keys()].map((x, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>


      <ToastContainer
        position="top-center"
        autoClose={4001}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  )
}
