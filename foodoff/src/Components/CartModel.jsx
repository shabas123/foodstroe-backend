import React from 'react'

function CartModel({isOpen, onClose, children }) {
  return (
     <div className={`right-modal d-none d-md-block ${isOpen ? 'open' : ''}`}>
      <div className="modal-content ">
        <button className="close-btn" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  )
}

export default CartModel