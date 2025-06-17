import React, { useContext, useEffect, useState } from 'react';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { removeItemApi } from '../local/api';
import EditItem from './EditItem';
import { editResponseContext } from '../Pages/context/ContextShare';
import { ToastContainer, toast, Bounce } from 'react-toastify';

export default function ItemsList() {

  const [removeStatus, setRemoveStatus] = useState({});
  const { editResponse } = useContext(editResponseContext);
  const [items, setItems] = useState([]);

  const handleDelete = async (id) => {
    const result = await removeItemApi(id);
    if (result.status === 200) {
      toast.success('Item Deleted Successfully');
      setRemoveStatus(result);
    } else {
      toast.warning('Something went wrong');
    }
  };

  useEffect(() => {
    axios.get('https://foodstroe-backend.onrender.com/all-items')
      .then(items => setItems(items.data))
      .catch(err => console.log(err));
  }, [removeStatus, editResponse]);

  return (
    <>
      <div className="container my-4">
        <h2 className="text-center mb-4">Items List</h2>
        <div className="row">
          {items.length === 0 ? (
            <h5 className="text-center">No items found!</h5>
          ) : (
            items.map((item) => (
              <div key={item._id} className=" col-md-6 col-lg-4 mb-4 ">
                <div className="card shadow-sm h-100 " style={{width:"100%"}}>
                  <img 
                    src={item.image}
                    className="card-img-top" 
                    alt={item.name} 
                    style={{ height: '100%', objectFit: 'cover', }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                      <strong>Prices:</strong><br/>
                      Small: ₹{item.prices[0]['Quater']}<br/>
                      Medium: ₹{item.prices[0]['Half']}<br/>
                      Large: ₹{item.prices[0]['Full']}
                    </p>
                    <p className="card-text">
                      <span className="btn btn-warning">{item.category}</span>
                    </p>
                    <div className="ms-auto d-flex justify-content-between">
                      <button className="btn btn-lg" onClick={() => handleDelete(item._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <EditItem items={item} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={4000}
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
  );
}
