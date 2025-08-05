import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button, Form, Spinner, Card, Row, Col, Container } from 'react-bootstrap';

const UserDetails = () => {
  const location = useLocation();
  const userId = location?.state;
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
    role: '',
    address: '',
    city: '',
    country: '',
    dob: '',
  });

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user details');
      const data = await response.json();
      setUser(data);
      setUpdatedUser({
        ...data,
        dob: new Date(data.dob).toISOString().substr(0, 10),
        profilePicture: '', // Clear to let user re-upload if needed
      });
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleRoleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      role: e.target.value,
    });
  };

  const handleUpdateUser = async () => {
    setIsSaving(true);
    const token = localStorage.getItem('adminToken');
    const formData = new FormData();

    formData.append('name', updatedUser.name);
    formData.append('email', updatedUser.email);
    formData.append('phoneNumber', updatedUser.phoneNumber);
    if (updatedUser.profilePicture) {
      formData.append('profilePicture', updatedUser.profilePicture);
    }
    formData.append('role', updatedUser.role);
    formData.append('address', updatedUser.address);
    formData.append('city', updatedUser.city);
    formData.append('country', updatedUser.country);
    formData.append('dob', updatedUser.dob);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update user details');

      alert('User updated successfully');
      await fetchUserDetails();
      setShowModal(false);
    } catch (err) {
      console.error('Error updating user:', err);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ml-2">Loading...</span>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">User Details</h2>
      <Card className="p-4 shadow">
        <Row>
          <Col md={4} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
            <img
              src={user.profilePicture || 'https://via.placeholder.com/200'}
              alt="Profile"
              className="img-fluid rounded-circle"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <Row className="mb-3">
              <Col sm={6}><strong>Name:</strong><p>{user.name}</p></Col>
              <Col sm={6}><strong>Email:</strong><p>{user.email}</p></Col>
            </Row>
            <Row className="mb-3">
              <Col sm={6}><strong>Phone:</strong><p>{user.phoneNumber}</p></Col>
              <Col sm={6}><strong>Role:</strong><p>{user.role}</p></Col>
            </Row>
            <Row className="mb-3">
              <Col sm={6}><strong>City:</strong><p>{user.city}</p></Col>
              <Col sm={6}><strong>Country:</strong><p>{user.country}</p></Col>
            </Row>
            <Row className="mb-3">
              <Col sm={12}><strong>Address:</strong><p>{user.address}</p></Col>
            </Row>
            <Row className="mb-3">
              <Col sm={6}><strong>Date of Birth:</strong><p>{new Date(user.dob).toLocaleDateString()}</p></Col>
            </Row>
            <div className="text-end">
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Edit Details
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={updatedUser.name} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={updatedUser.email} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phoneNumber" value={updatedUser.phoneNumber} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" name="dob" value={updatedUser.dob} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" value={updatedUser.city} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" name="country" value={updatedUser.country} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" value={updatedUser.address} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={updatedUser.role} onChange={handleRoleChange}>
                <option value="driver">Driver</option>
                <option value="owner">Owner</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload New Profile Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    profilePicture: e.target.files[0],
                  })
                }
              />
              {updatedUser.profilePicture && typeof updatedUser.profilePicture === 'object' && (
                <div className="mt-2 text-muted">Selected: {updatedUser.profilePicture.name}</div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateUser} disabled={isSaving}>
            {isSaving ? (
              <>
                <Spinner animation="border" size="sm" /> Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserDetails;
