
import React, { useEffect } from 'react'
import Item from '../Components/Item'
import { useSelector, useDispatch } from 'react-redux';
import './Home.css'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

export default function Home() {
  const [loggedInUser, setloggedInUser] = useState('')
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/all-items')
      .then(items => setItems(items.data))
      .catch(err => console.log(err)
      )
  }, [])
  useEffect(() => {
    if (sessionStorage.getItem("loggedInUser")) {
      setloggedInUser(sessionStorage.getItem("loggedInUser"))

    }
  }, [])



  return (
    <>

     <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100 bg">
        <div className="row align-items-center">
          <div className="col-md-6 " style={{ padding: "30px" }}>
        {  loggedInUser ?  <h2 className="fw-bold text-danger " > Welcome {loggedInUser} </h2>
        :
       <Link to={"/login"} style={{textDecoration:"none", fontFamily:"fantasy"}} ><h2>!!!  Touch me And Get It !!!  </h2></Link>
        
      }
           {loggedInUser && <div><h1 className="fw-bold text-danger">Delicious food <br />always <span style={{ fontFamily: 'fantasy' }}>tells a story</span> </h1>
             <h4 className="mt-3  fw-bold" style={{ color: "red" }}>
               Welcome to our restaurant, where every dish is crafted with passion and precision. Enjoy a culinary adventure filled with mouth-watering flavors and unforgettable moments.
            </h4>
          </div>}
          </div> 
          <div className="col-md-5 text-center">
            {loggedInUser? <img style={{ width: "100%", borderRadius: "50px" }}
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExczh3aTNoNTd2OHVscXJyYTlsMHVsdmJlbXNta2ZnejlwdWNnd3hwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5XLPWTWfj7h6M/giphy.gif"
              alt="Delicious Burger" className="img-fluid mt-5" />
              :
          <img src="https://purepng.com/public/uploads/large/purepng.com-chefcheftrained-professional-cookfood-preparationkitchenchefsexperienced-1421526669538jccuo.png" alt="" className='img-fluid'  style={{ maxHeight: '70vh', objectFit: 'cover' }} />

            }
          </div>
        </div>
      </div>

     
  { loggedInUser &&   <h2 className='text-center'>Our Menu</h2>}
      
{   loggedInUser &&    <h4 className='text-center'>Where Every Bite Hits the Spot</h4>
}     {loggedInUser && <a href="#section1">
        <div className='row bg'>

//         <div className='posters'>
//           <img className='poster' alt='poster' src='https://kitchen.sayidaty.net/uploads/small/8f/8f584bb7cc5256c5ac3fcb4571513616_w750_h500.jpg' />
//           <img className='poster' alt='poster' src='https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/chinese_chicken_curry_90700_16x9.jpg' />
//           <img className='poster' alt='poster' src='https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2021/2/14/alfaham.jpg' />
//           <img className='poster' alt='poster' src='https://t4.ftcdn.net/jpg/03/24/50/53/360_F_324505357_SWfRhx7862SwygH4jHJAbXPdgKA3nxm6.jpg' />
//           <img className='poster' alt='poster' src='https://images.deliveryhero.io/image/fd-pk/LH/r7bw-hero.jpg' />
//           <img className='poster' alt='poster' src='https://static.vecteezy.com/system/resources/previews/024/678/534/non_2x/shawarma-with-chicken-and-vegetables-arabic-style-generative-ai-free-photo.jpeg' />
//           <img className='poster' alt='poster' src='https://img.freepik.com/premium-photo/butter-naan-panner-butter-masala-indian-dish_651966-38.jpg' />
//         </div>
//       </div>
      </a>}
     {loggedInUser && <a href="/drink">
//       <div className="row bg">
//         <div className="posters">
//           <img className='poster' alt='poster' src='https://pod2.brvn.vn/media/2023/09/7up1.webp' />
//           <img className='poster' alt='poster' src='https://wallpapercave.com/wp/wp7947935.jpg' />
//           <img className='poster' alt='poster' src='https://images8.alphacoders.com/397/thumb-1920-397307.jpg' />
//           <img className='poster' alt='poster' src='https://wallpapercave.com/wp/wp3631978.jpg' />
//           <img className='poster' alt='poster' src='https://rare-gallery.com/uploads/posts/841890-Drinks-Lime-Mojito-Black-background-Two-Highball-glass.jpg' />
//           <img className='poster' alt='poster' src='https://images2.alphacoders.com/876/876244.jpg' />

//         </div>
//       </div>
      </a>}

{ loggedInUser &&     <h2 id="section1" className='text-center mt-4'>  Today's Special </h2>
}     {loggedInUser && <div className="row justify-content-center bg"  >
        {
          items.map((item => {
            return <div className="col-md-4" key={item._id}>
              <div>
                <Item item={item} />
              </div>
            </div>
          })
          )}

      </div>
}

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