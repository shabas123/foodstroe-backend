import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Adminscreen from './Components/Adminscreen';
import Order from './Components/Order';
import { useEffect, useState } from 'react';
import CartModel from './Components/CartModel';

function App() {

    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);
  return (
    <>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route  path="/cart" element={<Cart />} />
        <Route  path="/cartmodal" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<Adminscreen />} />
        <Route path="/order" element={<Order />} />
      </Routes>

      
    </>

    
  );
}

export default App;
