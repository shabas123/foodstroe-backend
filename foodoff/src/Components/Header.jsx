import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button, Dropdown, Form, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faPerson, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import CartModel from "./CartModel";
import Cart from "../Pages/Cart";
const AppNavbar = () => {

  const cartstate = useSelector(state => state.cartReducer)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedTable, setSelectedTable] = useState('');
  const [isCalling, setIsCalling] = useState(false);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleCallWaiter = () => {
    if (!selectedTable) {
      alert('Please select a table first');
      return;
    }

    setIsCalling(true);

    console.log(`Calling waiter for table ${selectedTable}`);


    setTimeout(() => {
      setIsCalling(false);
    }, 3000);
  };
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',

    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
      color: 'black',
    },
    inputGroup: {
      marginBottom: '20px',
      width: '200px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '16px',
      color: 'black'
    },
    select: {
      width: '100%',
      padding: '10px ',
      paddingleft: '20px',
      borderRadius: '10px',
      border: '1px solid #ccc',
      fontSize: '16px',
    },
    button: {
      padding: '12px 44px',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonCalling: {
      padding: '12px 24px',
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
    },
  };

  const [loggedInUser, setloggedInUser] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const updateLoginStatus = () => {
      setloggedInUser(sessionStorage.getItem("loggedInUser"));
    };
    window.addEventListener("userLoginChange", updateLoginStatus);
    updateLoginStatus();
    return () => {
      window.removeEventListener("userLoginChange", updateLoginStatus);
    };
  }, []);


  const handleLogout = (e) => {

    toast.success("Logout successfully")
    sessionStorage.removeItem("loggedInUser")
    window.dispatchEvent(new Event("userLoginChange"));
    setTimeout(() => {
      navigate('/register');
    }, 1000);
  };

  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (sessionStorage.getItem("loggedInUser")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  },);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <CartModel isOpen={modalOpen} onClose={() => setModalOpen(false)}>

                    <Cart />
                  </CartModel>
      <nav className="navbar navbar-expand-lg bg-black shadow-sm px-4 mb-4 " >
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center gap-2 " href="/" style={{ fontSize: "30px", color: "white", fontFamily: "cursive", padding: "20px" }}>Chicako <span style={{ color: "yellow", fontFamily: "fantasy" }}>  Burg</span>
            <img style={{ height: "120px" }} src="https://media1.giphy.com/media/fAWL3ANw4NbreH9TGB/200.webp?cid=ecf05e47bnkz4z8j7oizywqhco22q8vvg688xd2isx70mxxd&ep=v1_gifs_related&rid=200.webp&ct=g" alt="" className="img-fluid" />

          </a>
          <button className="navbar-toggler d-none d-md-block   d-md-none mb-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center gap-3 mb-5">
              <li className="nav-item position-relative">
                 <button onClick={()=>{setModalOpen(true)}} className="nav-link nav-hover me-2 position-relative" style={{ color: "white", fontSize: "24px" }}></button>
                
                  <FontAwesomeIcon icon={faCartShopping} style={{ color: "#f4f7fa", }} /> {cartstate.cartItems.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" style={{ fontSize: "18px" }}>
                      {cartstate.cartItems.length} </span>
                  )}
              </li>


              {isLogin && <li className="nav-item me-2 ">
                <button onClick={handleShow} className="btn btn-outline-warning text-white  fs-5  d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faPerson} />
                  Waiter
                </button>
              </li>}
              {isLogin == false ?
                <li className="nav-item text-white ">
                  <a style={{ color: "white", fontSize: "30px" }} className="nav-link nav-hover me-2 " href="/login">
                    <FontAwesomeIcon icon={faUser} style={{ color: "#f0f2f5", }} />
                  </a>
                </li>
                :
                <li className="nav-item ">
                  <FontAwesomeIcon onClick={handleLogout} type="button" icon={faPowerOff} size="sm" style={{ fontSize: "28px" }} />


                </li>
              }


            </ul>
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>  </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.container}>
            <h1 style={styles.title}>Call Waiter</h1>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Table</label>
              <select
                value={selectedTable}
                onChange={handleTableChange}
                style={styles.select}
              >
                <option value="">Select Table</option>
                <option value="1">Table 1</option>
                <option value="2">Table 2</option>
                <option value="3">Table 3</option>
                <option value="4">Table 4</option>
                <option value="5">Table 5</option>
              </select>
            </div>

            <button
              onClick={handleCallWaiter}
              style={isCalling ? styles.buttonCalling : styles.button}
              disabled={isCalling}
            >
              {isCalling ? 'Calling...' : 'Call Now'}
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={5001}
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
};

export default AppNavbar;
