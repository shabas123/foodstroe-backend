import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart} from '../actions/cartActions';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { getAllItems } from '../actions/itemAction';
export default function Item({item}) {

  const [ quantity, setquantity] = useState(1)
  const [ varient, setvarient] = useState('small')
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const dispatch = useDispatch()
  function addtoCart()
  {
  dispatch(addToCart(item , quantity , varient))
 toast.success(`Added to Cart`)
  }

  useEffect(()=>{
    dispatch(getAllItems())
  }, [dispatch])
 
  return (

    <>
    
      <div className='shadow-lg p-3 mb-5 bg-black rounded'
      key={item.id}>
        <div className="position-relative">
         <Card style={{ width: '100%', borderRadius: "40px" }} className='mt-4'></Card>
        <div onClick={handleShow}>
          
          <Card.Img variant="top" src={item.image} style={{ width: "100%", height: "220px", objectFit: "cover"}} />

          <Card.Title>{item.name}</Card.Title>
          <div className="position-absolute top-0 end-0 bg-success text-white px-2 py-1 m-2 rounded-pill large">
        <i className="bi bi-star-fill me-1"></i>Popular
    </div>
</div>
    
        </div>

        
        <div className="flex-container">
          <div className='w-100'>
            <h5>varients</h5>
            <select className='form-control w-50'value={varient} onChange={(e) => { setvarient(e.target.value) }} >
              {item.varients.map(varients => {
                return <option value={varients}>{varients}</option>
              })}
            </select>
          </div>
          <div className=''>
            <h5>Quantity</h5>
            <select className='form-control shadow' value={quantity} onChange={(e) => { setquantity(e.target.value) }} >
              {[...Array(10).keys()].map((x, i) => {
                return <option value={i + 1}>{i + 1}</option>
              })}
            </select>
          </div>
        </div>
        <div className="flex-container">
          <div className='m-2 '>
            <h5>Price :{item.prices[0][varient] * quantity}</h5>
          </div>

          <div className='ms-auto mt-2'>
            <button onClick={addtoCart} className='btn btn-danger '>Add to cart</button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{item.name}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={item.image} alt="" className='img-fluid' />
            
          </Modal.Body>

          <Modal.Footer>
            <button className='btn btn-danger' onClick={handleClose}>Add to cart</button>
          </Modal.Footer>
        </Modal>


      </div >




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
