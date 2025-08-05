import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Spinner, Alert, Card } from 'react-bootstrap';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('adminToken');

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    title: '',
    location: '',
    salary: '',
    experience: '',
    logo: null,
  });

  const fetchJobDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch job details');
      const data = await res.json();
      setJob(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const handleOpenEditModal = () => {
    setEditData({
      title: job.title || '',
      description: job.description || '',
      location: job.location || '',
      salary: job.salary || '',
      experience: job.experience || '',
      logo: null,
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      setEditData({ ...editData, logo: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', editData.title);
      formData.append('description', editData.description);
      formData.append('location', editData.location);
      formData.append('salary', editData.salary);
      formData.append('experience', editData.experience);
      if (editData.logo) {
        formData.append('logo', editData.logo);
      }

      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update job');
      setShowEditModal(false);
      fetchJobDetails();
      alert('Job updated successfully!');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error updating job.');
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading Job Details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!job) {
    return <div className="text-center mt-5">No Job Found</div>;
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </Button>

        <h2 className="text-center flex-grow-1">Job Details</h2>

        <Button variant="primary" onClick={handleOpenEditModal}>
          <FaEdit className="me-2" />
          Edit
        </Button>
      </div>

      <Card className="shadow p-4">
        {job.logo && (
          <div className="text-center mb-4">
            <img
              src={job.logo}
              alt="Company Logo"
              style={{
                width: '120px',
                height: '120px',
                objectFit: 'cover',
                borderRadius: '50%',
                border: '2px solid #007bff',
              }}
            />
          </div>
        )}

        <h3 className="text-primary mb-3">{job.title}</h3>


        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <strong>Location:</strong> {job.location}
          </div>
          <div className="col-md-6 mb-3">
            <strong>Salary:</strong> ₹{job.salary}
          </div>
          <div className="col-md-6 mb-3">
            <strong>Experience Required:</strong> {job.experience} years
          </div>
          <div className="col-md-6 mb-3">
            <strong>Status:</strong> {job.status}
          </div>
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Job</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleUpdateJob}>
          <Modal.Body>
            <div className="row">
              <div className="col-12 mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={editData.title}
                  onChange={handleEditInputChange}
                  required
                />
              </div>

      

              <div className="col-md-6 mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={editData.location}
                  onChange={handleEditInputChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Salary (₹)</Form.Label>
                <Form.Control
                  type="number"
                  name="salary"
                  value={editData.salary}
                  onChange={handleEditInputChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Required Experience (years)</Form.Label>
                <Form.Control
                  type="number"
                  name="experience"
                  value={editData.experience}
                  onChange={handleEditInputChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <Form.Label>Update Logo</Form.Label>
                <Form.Control
                  type="file"
                  name="logo"
                  onChange={handleEditInputChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default JobDetails;
