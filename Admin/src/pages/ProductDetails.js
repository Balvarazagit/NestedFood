import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [editProduct, setEditProduct] = useState({});
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        setProduct(data);
        setEditProduct(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to fetch product');
      }
    };
    fetchProduct();
  }, [id, API_URL]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(editProduct),
      });

      if (!res.ok) throw new Error('Failed to update product');
      const updated = await res.json();
      setProduct(updated);
      setShowModal(false);
      alert('Product updated successfully!');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error updating product');
    }
  };

  if (error) {
    return <div className="alert alert-danger mt-4 container">{error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-success" />
        <p className="mt-2">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/products" className="btn btn-outline-secondary mb-3">
        <i className="bi bi-arrow-left"></i> Back to Products
      </Link>

      <div className="card mb-4 shadow">
        <div className="row g-0">
          <div className="col-md-4 p-3">
            <img
              src={product.image}
              className="img-fluid rounded"
              alt={product.name}
              style={{ maxHeight: '350px', objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title text-success">{product.name}</h3>
              <p className="card-text text-muted">{product.description}</p>
              <hr />
              <h5 className="text-primary">₹{product.price}</h5>
              <p><strong>Weight:</strong> {product.weight}</p>
              <p><strong>Rating:</strong> {product.rating} ⭐</p>
              <p><strong>Category:</strong> {product.category}</p>
              <button
                className="btn btn-warning mt-3"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-pencil-square"></i> Edit Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Product</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  {['name', 'description', 'price', 'weight', 'rating', 'category', 'image'].map((field) => (
                    <div className="mb-3" key={field}>
                      <input
                        type={field === 'price' || field === 'rating' ? 'number' : 'text'}
                        className="form-control"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={editProduct[field] || ''}
                        onChange={(e) => setEditProduct({ ...editProduct, [field]: e.target.value })}
                        required
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update Product</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
