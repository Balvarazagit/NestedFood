import React, { useEffect, useState } from 'react';

const ManageApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('adminToken');

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/applications/all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Failed to fetch applications: ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Invalid data received from server');

      setApplications(data);
      setFilteredApps(data);
    } catch (err) {
      console.error('Error fetching applications', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    setError('');
    try {
      const res = await fetch(`${API_URL}/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error('Failed to update application status');

      alert(`Application ${status}`);
      fetchApplications();
    } catch (err) {
      console.error('Error updating application status', err);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this application?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/applications/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to delete application');

      alert('Application deleted');
      fetchApplications();
    } catch (err) {
      console.error('Error deleting application:', err);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    filterApplications(term, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const status = e.target.value;
    setStatusFilter(status);
    filterApplications(searchTerm, status);
  };

  const filterApplications = (term, status) => {
    let filtered = applications;

    if (status !== 'all') {
      filtered = filtered.filter((app) => app.status === status);
    }

    if (term) {
      filtered = filtered.filter(
        (app) =>
          app.driver?.name?.toLowerCase().includes(term) ||
          app.job?.title?.toLowerCase().includes(term) ||
          app.location?.toLowerCase().includes(term) ||
          app.number?.toLowerCase().includes(term)
      );
    }

    setFilteredApps(filtered);
    setCurrentPage(1); // Reset pagination
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApps.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 d-flex align-items-center text-primary">
        <i className="bi bi-person-lines-fill me-2"></i> Manage Applications
      </h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row mb-3">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, job, location, number..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-3 mb-2">
          <select className="form-select" value={statusFilter} onChange={handleStatusFilter}>
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="assigned">Assigned</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading Application...</p>
      </div>      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Driver Name</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Contact Number</th>
                  <th>Document</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((app) => (
                    <tr key={app._id}>
                      <td>{app.driver?.name || 'N/A'}</td>
                      <td>{app.job?.title || 'N/A'}</td>
                      <td>{app.job?.location || 'N/A'}</td>
                      <td>{app.number || 'N/A'}</td>
                      <td>
                        {app.documentImage ? (
                          <img
                            src={app.documentImage}
                            alt="Document"
                            className="rounded"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td>{app.status || 'pending'}</td>
                      <td>
                        <button
                          onClick={() => deleteApplication(app._id)}
                          className="btn btn-sm btn-danger"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No applications found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav>
              <ul className="pagination justify-content-center mt-3">
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(i + 1)} className="page-link">
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ManageApplications;
