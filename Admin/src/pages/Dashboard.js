import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0); // can be "applications" in your system
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      try {
        setLoading(true);
        const [productRes, userRes, orderRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/products`, { headers }),
          fetch(`${process.env.REACT_APP_API_URL}/users`, { headers }),
          fetch(`${process.env.REACT_APP_API_URL}/orders`, { headers }), // assuming `/orders` exists
        ]);

        if (!productRes.ok || !userRes.ok || !orderRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const productData = await productRes.json();
        const userData = await userRes.json();
        const orderData = await orderRes.json();

        setProductCount(Array.isArray(productData) ? productData.length : 0);
        setUserCount(Array.isArray(userData) ? userData.length : 0);
        setOrderCount(Array.isArray(orderData) ? orderData.length : 0);
      } catch (err) {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const pieData = {
    labels: ['Products', 'Users', 'Orders'],
    datasets: [
      {
        data: [productCount, userCount, orderCount],
        backgroundColor: ['#007bff', '#28a745', '#ffc107'],
      },
    ],
  };

  const barData = {
    labels: ['Products', 'Orders'],
    datasets: [
      {
        label: 'Count',
        backgroundColor: ['#007bff', '#ffc107'],
        data: [productCount, orderCount],
      },
    ],
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <div className="container py-4">{error}</div>;
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4">Admin Dashboard</h1>

      <div className="row">
        <div className="col-12 col-md-4 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Products</h5>
              <p className="card-text fs-4">{productCount}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text fs-4">{userCount}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text fs-4">{orderCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Distribution Chart</h5>
              <div style={{ position: 'relative', height: '300px' }}>
                <Pie data={pieData} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Products vs Orders</h5>
              <div style={{ position: 'relative', height: '300px' }}>
                <Bar data={barData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
