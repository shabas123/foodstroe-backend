
import React, { useEffect } from 'react'
import Item from '../Components/Item'
import { useSelector, useDispatch } from 'react-redux';
import './Home.css'
import { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHouse, faPowerOff } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const Navigate = useNavigate();
  const [loggedInUser, setloggedInUser] = useState('')
  const [items, setItems] = useState([]);
  const cartstate = useSelector(state => state.cartReducer)

  useEffect(() => {
    axios.get('https://foodstroe-backend.onrender.com/all-items')
      .then(items => setItems(items.data))
      .catch(err => console.log(err)
      )
  }, [])
  useEffect(() => {
    if (sessionStorage.getItem("loggedInUser")) {
      setloggedInUser(sessionStorage.getItem("loggedInUser"))

    }
  }, [])



  const handleLogout = (e) => {
    console.log("Logout clicked");

    toast.success("Logout successfully")
    sessionStorage.removeItem("loggedInUser")
    window.dispatchEvent(new Event("userLoginChange"));
    setTimeout(() => {
      Navigate('/register');
    }, 1000);
  };
  
//   useEffect(() => {
//   const isMobile = window.innerWidth < 768;
//   if (isMobile && !loggedInUser) {
//     const timer = setTimeout(() => {
//       Navigate('/login');
//     }, 3000);

//     return () => clearTimeout(timer);
//   }
// }, [loggedInUser, Navigate]);
 
 
  return (
    <>
 
      <div className="container-fluid d-flex align-items-center justify-content-center" >
        <div className="row align-items-center" style={{ textAlign: "center" }}>
          <div className="col-md-6 " style={{ padding: "30px" }}>
            {loggedInUser ? <h2 className="fw-bold text-success " > Welcome {loggedInUser} </h2>
              :
              <Link to={"/login"} style={{ textDecoration: "none", fontFamily: "fantasy" }} ><h2></h2></Link>

            }
            <div><h1 className="fw-bold text-danger">Delicious food <br />always <span style={{ fontFamily: 'fantasy' }}>tells a story</span> </h1>
              <h4 className="mt-3  fw-bold" style={{ color: "red", textAlign: "center" }}>
                Welcome to our restaurant, where every dish is crafted with passion and precision. Enjoy a culinary adventure filled with mouth-watering flavors and unforgettable moments.
              </h4>
            </div>
          </div>
          <div className="col-md-5 text-center">
             <img style={{ width: "100%", borderRadius: "50px" }}
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExczh3aTNoNTd2OHVscXJyYTlsMHVsdmJlbXNta2ZnejlwdWNnd3hwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5XLPWTWfj7h6M/giphy.gif"
              alt="Delicious Burger" className="img-fluid mt-5" />
              
              {/* <Link to={"/login"} style={{ textDecoration: "none", fontFamily: "fantasy" }} > <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHV3YzR5Zm8ybWhuemNvbG5vcWNoejdvNHUweGc0MnkyY2w2aHlpMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NN2Cmofk4LYbWhtmOB/giphy.gif" alt="" className='img-fluid d-md-none' style={{ height:"800px"}} /></Link> */}

          
          </div>
        </div>
      </div>

      <div className="container-fluid mt-4 r1">

        <h2 className='text-center text-black'>Our Menu</h2>

         <h4 className='text-center  text-black'>Where Every Bite Hits the Spot</h4>
          <a href="#section1">
          <div className='row'>

            <div className='posters'>
              <img className='poster' alt='poster' src='https://kitchen.sayidaty.net/uploads/small/8f/8f584bb7cc5256c5ac3fcb4571513616_w750_h500.jpg' />
              <img className='poster' alt='poster' src='https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chinese_chicken_curry_90700_16x9.jpg' />
              <img className='poster' alt='poster' src='https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2021/2/14/alfaham.jpg' />
              <img className='poster' alt='poster' src='https://t4.ftcdn.net/jpg/03/24/50/53/360_F_324505357_SWfRhx7862SwygH4jHJAbXPdgKA3nxm6.jpg' />
              <img className='poster' alt='poster' src='https://images.deliveryhero.io/image/fd-pk/LH/r7bw-hero.jpg' />
              <img className='poster' alt='poster' src='https://static.vecteezy.com/system/resources/previews/024/678/534/non_2x/shawarma-with-chicken-and-vegetables-arabic-style-generative-ai-free-photo.jpeg' />
              <img className='poster' alt='poster' src='https://img.freepik.com/premium-photo/butter-naan-panner-butter-masala-indian-dish_651966-38.jpg' />
              <img className='poster' alt='poster' src='https://kitchen.sayidaty.net/uploads/small/8f/8f584bb7cc5256c5ac3fcb4571513616_w750_h500.jpg' />
              <img className='poster' alt='poster' src='https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chinese_chicken_curry_90700_16x9.jpg' />
              <img className='poster' alt='poster' src='https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2021/2/14/alfaham.jpg' />
              <img className='poster' alt='poster' src='https://t4.ftcdn.net/jpg/03/24/50/53/360_F_324505357_SWfRhx7862SwygH4jHJAbXPdgKA3nxm6.jpg' />
              <img className='poster' alt='poster' src='https://images.deliveryhero.io/image/fd-pk/LH/r7bw-hero.jpg' />
              <img className='poster' alt='poster' src='https://static.vecteezy.com/system/resources/previews/024/678/534/non_2x/shawarma-with-chicken-and-vegetables-arabic-style-generative-ai-free-photo.jpeg' />
              <img className='poster' alt='poster' src='https://img.freepik.com/premium-photo/butter-naan-panner-butter-masala-indian-dish_651966-38.jpg' />

            </div>
          </div>
        </a>
        <a href="/drink">
          <div className="posters">
            <img className='poster' alt='poster' src='https://rare-gallery.com/uploads/posts/841890-Drinks-Lime-Mojito-Black-background-Two-Highball-glass.jpg' />
            <img className='poster' alt='poster' src='https://wallpapercave.com/wp/wp7947935.jpg' />
            <img className='poster' alt='poster' src='https://images8.alphacoders.com/397/thumb-1920-397307.jpg' />
            <img className='poster' alt='poster' src='https://wallpapercave.com/wp/wp3631978.jpg' />
            <img className='poster' alt='poster' src='https://images2.alphacoders.com/876/876244.jpg' />
            <img className='poster' alt='poster' src='https://pod2.brvn.vn/media/2023/09/7up1.webp' />
            <img className='poster' alt='poster' src='https://rare-gallery.com/uploads/posts/841890-Drinks-Lime-Mojito-Black-background-Two-Highball-glass.jpg' />
            <img className='poster' alt='poster' src='https://wallpapercave.com/wp/wp7947935.jpg' />
            <img className='poster' alt='poster' src='https://images8.alphacoders.com/397/thumb-1920-397307.jpg' />
            <img className='poster' alt='poster' src='https://wallpapercave.com/wp/wp3631978.jpg' />
            <img className='poster' alt='poster' src='https://images2.alphacoders.com/876/876244.jpg' />
            <img className='poster' alt='poster' src='https://pod2.brvn.vn/media/2023/09/7up1.webp' />


          </div>
        </a>
         <div className="row justify-content-center"  >
          {
            items.map((item => {
              return <div className="col-md-2 col-6 mt-4" key={item._id} >
                <div>
                  <Item item={item} />
                </div>
              </div>
            })
            )}

        </div>
        

        {/* Bottom Navigation - Visible only on Mobile */}
     <div className="d-flex d-md-none justify-content-around align-items-center fixed-bottom bg-black shadow" style={{borderRadius:"15px"}}>
          <div className="text-center">
            <i className="bi bi-house-fill text-purple"></i><br />
            <FontAwesomeIcon icon={faHouse}  size="sm" style={{ color: "", fontSize:"28px"}} />          </div>
          <div className="text-center position-relative">
            <li className="nav-item position-relative">
              <a href="/cart" className="nav-link nav-hover me-2 position-relative" style={{ fontSize: "30px" }}>
                <FontAwesomeIcon icon={faCartShopping} size="sm" /> {cartstate.cartItems.length > 0 && (
                  <span className="badge bg-success position-absolute top-0 start-100 translate-middle rounded-pill" style={{ fontSize: "16px" }}>
                    {cartstate.cartItems.length} </span>
                )}
              </a>
            </li>
          </div>
            <div className="text-center">
            <i className="bi bi-grid"></i><br />
          <FontAwesomeIcon onClick={handleLogout} type="button" icon={faPowerOff} size="sm" style={{fontSize:"28px"}} />
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
  );
}