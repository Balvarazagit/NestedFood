import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';

const staticFields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
  { name: 'role', label: 'Role', type: 'select', required: true, options: ['driver', 'owner',] }
];

const AdminFormFields = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    label: '',
    type: 'text',
    required: 'true',
    order: '',
    options: ''
  });

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/form-fields`);
    const data = await res.json();
    setFields(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddField = async (e) => {
    e.preventDefault();

    const isStatic = staticFields.some(f => f.name === formData.name.toLowerCase());
    if (isStatic) {
      alert(`'${formData.name}' is a reserved/static field and cannot be added again.`);
      return;
    }

    const payload = {
      ...formData,
      required: formData.required === 'true',
      options: ['select', 'radio'].includes(formData.type)
        ? formData.options.split(',').map(opt => opt.trim())
        : []
    };

    const res = await fetch(`${process.env.REACT_APP_API_URL}/form-fields`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      setFormData({
        name: '',
        label: '',
        type: 'text',
        required: 'true',
        order: '',
        options: ''
      });
      fetchFields();
    } else {
      alert('Failed to add field');
    }
  };

  const handleDelete = async (id, name) => {
    if (staticFields.some(f => f.name === name)) {
      alert("Static fields cannot be deleted.");
      return;
    }

    if (!window.confirm('Are you sure you want to delete this field?')) return;

    const res = await fetch(`${process.env.REACT_APP_API_URL}/form-fields/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      fetchFields();
    } else {
      alert('Delete failed');
    }
  };

  const inputTypes = [
    'text', 'email', 'password', 'number', 'date', 'file',
    'checkbox', 'radio', 'select', 'textarea', 'url',
    'tel', 'range', 'color', 'datetime-local', 'month', 'time', 'week'
  ];

  return (
    <Container className="py-4">
      <h2 className="mb-4">Manage Registration Fields</h2>

      {/* --- Static Fields (read-only) --- */}
      <h5>Static Fields</h5>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Label</th>
            <th>Type</th>
            <th>Required</th>
            <th>Options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staticFields.map(field => (
            <tr key={field.name}>
              <td>{field.name}</td>
              <td>{field.label}</td>
              <td>{field.type}</td>
              <td>{field.required ? 'Yes' : 'No'}</td>
              <td>{field.options?.join(', ') || '-'}</td>
              <td><em>Locked</em></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* --- Dynamic Field Form --- */}
      <Form onSubmit={handleAddField}>
        <Row className="g-2 align-items-end">
          <Col md={2}>
            <Form.Label>Field Name</Form.Label>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Label>Label</Form.Label>
            <Form.Control
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </Col>
          <Col md={2}>
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={formData.type} onChange={handleChange}>
              {inputTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label>Required</Form.Label>
            <Form.Select name="required" value={formData.required} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Col>
          <Col md={1}>
            <Form.Label>Order</Form.Label>
            <Form.Control
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
            />
          </Col>

          {['select', 'radio'].includes(formData.type) && (
            <Col md={2}>
              <Form.Label>Options (comma-separated)</Form.Label>
              <Form.Control
                name="options"
                value={formData.options}
                onChange={handleChange}
              />
            </Col>
          )}

          <Col md={1}>
            <Button type="submit" className="w-100">Add</Button>
          </Col>
        </Row>
      </Form>

      {/* --- Dynamic Fields List --- */}
      <h5 className="mt-5">Dynamic Fields</h5>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Label</th>
            <th>Type</th>
            <th>Required</th>
            <th>Order</th>
            <th>Options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fields.map(field => (
            <tr key={field._id}>
              <td>{field.name}</td>
              <td>{field.label}</td>
              <td>{field.type}</td>
              <td>{field.required ? 'Yes' : 'No'}</td>
              <td>{field.order}</td>
              <td>{field.options?.join(', ')}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(field._id, field.name)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminFormFields;
