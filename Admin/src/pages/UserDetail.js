import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const API_URL = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', mobilenumber: '' });

  const fetchUser = async () => {
      try {
          const res = await fetch(`${API_URL}/users/${id}`);
          const data = await res.json();
          setUser(data);
          setFormData({
          name: data.name,
          email: data.email,
          role: data.role,
          mobilenumber: data.mobilenumber,
        });
    } catch (error) {
        console.error('Failed to load user:', error);
    }
};
useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const updatedUser = await res.json();
        fetchUser()
        setShowModal(false);
      }
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (!user) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <Link to="/users" className="btn btn-outline-secondary mb-3">
        <i className="bi bi-arrow-left"></i> Back to Users
      </Link>
      <div className="card shadow">
        <div className="card-body">
          <h4 className="card-title text-success">{user.name}</h4>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Mobile:</strong> {user.mobilenumber}</p>
          <button className="btn btn-warning mt-3" onClick={() => setShowModal(true)}>
            Update User
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update User</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Name" />
                <input className="form-control mb-2" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" />
                <input className="form-control mb-2" value={formData.mobilenumber} onChange={(e) => setFormData({...formData, mobilenumber: e.target.value})} placeholder="Mobile" />
                <input className="form-control" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} placeholder="Role" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
