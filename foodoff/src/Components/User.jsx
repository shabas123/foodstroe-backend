import React, { useEffect, useState } from 'react';
import { getAllUserAPI } from '../local/api';

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const result = await getAllUserAPI();
    if (result.status === 200) {
      setUsers(result.data);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">User List</h2>
      {users.length === 0 ? (
        <div className="text-center">
          <h5>No users found</h5>
        </div>
      ) : (
        <div className="row">
          {users.map((user, index) => (
            <div key={user._id} className="col-12 col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center d-flex flex-column">
                  <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Avatar" className="rounded-circle mb-3" style={{ width: '80px', height: '80px' }}/>
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text">{user.email}</p>
                  <span className={`badge ${user.isAdmin ? 'bg-success' : 'bg-secondary'}`}>
                    {user.isAdmin ? 'Admin' : 'Customer'}
                  </span>
                  <div className="mt-2">
                    <small>User ID: {user._id.slice(-6)}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
