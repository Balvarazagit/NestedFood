import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    weight: '',
    rating: '',
    image: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 10;
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('adminToken');
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, weight, rating, image, category } = productForm;
    // if (!name || !description || !price || !weight || !rating || !image || !category) {
    //   setError('Please fill all product fields.');
    //   return;
    // }

    try {
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productForm)
      });

      if (!res.ok) throw new Error('Failed to post product');
      alert('Product posted successfully!');
      setProductForm({ name: '', description: '', price: '', weight: '', rating: '', image: '', category: '' });
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete product');
      alert('Product deleted!');
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 d-flex justify-content-between align-items-center flex-wrap text-success">
        <span><i className="bi bi-box-seam me-2"></i>Manage Products</span>
        <button className="btn btn-primary mt-2 mt-md-0" onClick={() => setShowModal(true)}>Add Product</button>
      </h2>

      <div className="card p-3 mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-success"></div>
          <p className="mt-2">Loading products...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Weight</th>
                  <th>Rating</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? currentProducts.map((p, index) => (
                  <tr key={p._id}>
                    <td>{indexOfFirst + index + 1}</td>
                    <td><img src={p.image} alt={p.name} style={{ width: 40, height: 40, objectFit: 'cover' }} /></td>
                    <td>{p.name}</td>
                    <td>₹{p.price}</td>
                    <td>{p.weight}</td>
                    <td>{p.rating}</td>
                    <td>{p.category}</td>
                    <td>
                      <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/products/${p._id}`)}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteProduct(p._id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="text-center">No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                    <i className="bi bi-chevron-left"></i>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                  <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {/* Modal for Add Product */}
      {showModal && (
  <div
    className="modal show fade d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <form onSubmit={handleProductSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Add New Product</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            {["name", "description", "price", "weight", "rating", "image_URL", "category"].map((field) => (
              <div className="mb-3" key={field}>
                {field === "category" ? (
                  <select
                    className="form-control"
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({ ...productForm, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Sweets">Sweets</option>
                  </select>
                ) : (
                  <input
                    type={field === "price" || field === "rating" ? "number" : "text"}
                    className="form-control"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={productForm[field]}
                    onChange={(e) =>
                      setProductForm({ ...productForm, [field]: e.target.value })
                    }
                    required
                  />
                )}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ManageProducts;
