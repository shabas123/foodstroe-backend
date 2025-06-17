import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemById } from '../actions/itemAction';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Item from './Item';
import { updateItemAPI } from '../local/api';
import { editResponseContext } from '../Pages/context/ContextShare';
import { ToastContainer } from 'react-bootstrap';
import { Bounce, toast } from 'react-toastify';


export default function EditItem({ items }) {

  const { setEditResponse } = useContext(editResponseContext)
  const { itemid } = useParams();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // console.log(items);




  const [itemDetails, setItemDetails] = useState({
    name: items?.name,
    varients: items?.varients || [],
    prices: items?.prices ? items.prices[0] : { Quater: '', Half: '', Full: '' },
    category: items?.category,
    image: items?.image,
  })
  console.log(itemDetails);

  useEffect(() => {
    dispatch(getItemById(itemid));
  }, [dispatch, itemid]);


  const handleUpdate = async () => {
    const { name, varients, prices, category, image } = itemDetails
    console.log(name, varients, prices, category, image)
    if (!name || !varients || !prices || !category) {
      alert('Complete the form ');
    } else {
      const reqBody = new FormData();
      reqBody.append("name", name);
      reqBody.append("varients", JSON.stringify(varients));
      reqBody.append("prices", JSON.stringify(prices));
      reqBody.append("category", category);
      reqBody.append("image", image);

      const result = await updateItemAPI(items._id, reqBody)
      console.log(result);

      if (result.status == 200) {
        setEditResponse(result)
        toast.success('Item updated successfully!');

        setTimeout(() => {
          handleClose();
        }, 1000)

      } else if (result.status == 400) {
        toast.warning(`Smothing Wrong`)
      }

    }

  }
  return (
    <>

      <FontAwesomeIcon icon={faEdit} className='btn btn-lg' onClick={handleShow} />


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-md-6 ">
                <div className="mt-2">
                  <img src={items.image} alt="Preview" className="w-32 h-32 object-cover rounded img-fluid" />
                </div>

              </div>
              <div className="col-md-6 mt-3 ">
                <div className="mb-3">
                  <input onChange={(e) => setItemDetails({ ...itemDetails, name: e.target.value })} value={itemDetails.name} type="text" className='form-control' placeholder='Name' />
                </div>
                <div className="mb-3">
                  <input
                    onChange={(e) =>
                      setItemDetails({ ...itemDetails, varients: e.target.value.split(',').map(v => v.trim()) })
                    }
                    value={itemDetails.varients.join(', ')}
                    type="text"
                    className='form-control'
                    placeholder='Varients '
                  />
                </div>
                <div className="mb-3">
                  <input onChange={(e) => setItemDetails({ ...itemDetails, prices: { ...itemDetails.prices, Quater: e.target.value } })} value={itemDetails.prices.Quater} type="text" className='form-control' placeholder='Quater prices' />
                </div>
                <div className='mb-3'>
                  <input
                    type="text"
                    className='form-control mb-1'
                    placeholder='Half Price'
                    value={itemDetails.prices.Half}
                    onChange={(e) => setItemDetails({
                      ...itemDetails,
                      prices: { ...itemDetails.prices, Half: e.target.value }
                    })}
                  />
                  <div className="mb-3">

                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className='form-control'
                      placeholder='Full Price'
                      value={itemDetails.prices.Full}
                      onChange={(e) => setItemDetails({
                        ...itemDetails,
                        prices: { ...itemDetails.prices, Full: e.target.value }
                      })}
                    />
                  </div>

                </div>
                <div className="mb-3">
                  <input onChange={(e) => setItemDetails({ ...itemDetails, category: e.target.value })} value={itemDetails.category} type="text" className='form-control' placeholder='Category' />
                </div>

              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
  );
}
