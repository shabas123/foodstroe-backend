import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import OrderList from './OrderList';
import AddItems from './AddItems';
import User from './User';
import ItemsList from './ItemsList';  // fixed typo
import EditItem from './EditItem';

export default function Adminscreen() {
  return (
    <div className="d-flex mt-5" style={{ minHeight: "100v" }}>
      {/* Sidebar */}
      <div style={{ width: "280px", backgroundColor: "black", color: "", padding: "30px" }}> 

        <ul className="">
          <li className="mb-4 d-none d-md-block">
            <Link to="/admin/user" style={{ color: "#fff", textDecoration: "none", fontSize: "25px" }}>Users</Link>
          </li>
          <li className="mb-4 d-none d-md-block">
            <Link to="/admin/itemlist" style={{ color: "#fff", textDecoration: "none", fontSize: "25px" }}>All Items</Link>
          </li>
          <li className="mb-4 d-none d-md-block">
            <Link to="/admin/additems" style={{ color: "#fff", textDecoration: "none", fontSize: "25px" }}>Add Item</Link>
          </li>
          <li className="mb-4 d-none d-md-block">
            <Link to="/admin/orderlist" style={{ color: "#fff", textDecoration: "none", fontSize: "25px" }}>Orders</Link>
          </li>
         
  
        </ul>
      </div>

    
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "black" }}>
        <Routes>
          <Route path="orderlist" element={<OrderList />} />
          <Route path="additems" element={<AddItems />} />
          <Route path="user" element={<User />} />
          <Route path="itemlist" element={<ItemsList />} />
          <Route path="edititem/:itemid" element={<EditItem />} />
        </Routes>
      </div>
    </div>
  )
}
