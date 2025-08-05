import './dashboard.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({}); // User data from API
  const API_URL = 'http://localhost:5000/api';
  const token = localStorage.getItem("token"); // Or "userToken" based on your app
  console.log(token)
const User = JSON.parse(localStorage.getItem("user")); // ✅ Correctly parse user
  const UserId = User?.id
  console.log(User)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/users/${UserId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleOrderClick = () => {
    navigate("/order-tracking");
  };

  const handleUserAccount = () => {
    navigate("/userAccount");
  };

  const handleOrder = ()=>{
    navigate("/myorders")
  }

  return (
    <div className="dashboard-container">
      <nav className="breadcrumb">
        <a href="/home">Home</a> &gt; <a href="/home">Pages</a> &gt; My Account
      </nav>
      <div className="dashboard-content">
        <aside className="sidebar">
          <button className="sidebar-button active">Dashboard</button>
          <button onClick={handleOrder} className="sidebar-button">Orders</button>
          <button className="sidebar-button" onClick={handleOrderClick}>Track Your Order</button>
          <button className="sidebar-button">My Address</button>
          <button className="sidebar-button" onClick={handleUserAccount}>Account details</button>
          <Link className="sidebar-button" to={"/login"}> Logout </Link>
        </aside>

        <main className="main-content">
          <h1>Hello {user.name || "User"}!</h1>
          <p>
            Welcome to your account dashboard. Here are your details:
          </p>

          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            {user.mobilenumber && <p><strong>Phone:</strong> {user.mobilenumber}</p>}
            {user.role && <p><strong>Role:</strong> {user.role}</p>}
          </div>

          <p>
            From here you can check <a href="/myorders">recent orders</a>, manage your 
            <a href="/addresses"> addresses</a>, and 
            <a href="/account-details"> edit account details</a>.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
