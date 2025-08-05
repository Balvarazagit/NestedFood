import React, { useEffect, useState } from "react";

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      // Refresh orders after update
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6">All Orders</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border text-left">User</th>
            <th className="px-4 py-2 border text-left">Products</th>
            <th className="px-4 py-2 border text-left">Total</th>
            <th className="px-4 py-2 border text-left">Status</th>
            <th className="px-4 py-2 border text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 border">{order?.user.name || "N/A"}</td>
              <td className="px-4 py-2 border">
                {order.items.map((item) => (
                  <div key={item.product?._id} className="flex items-center gap-2 mb-2">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-6 h-6 rounded object-cover"
                      style={{width:"100px"}}
                    />
                    <span className="text-sm">
                      {item.product?.name} x {item.quantity}
                    </span>
                  </div>
                ))}
              </td>
              <td className="px-4 py-2 border">₹{order?.totalAmount}</td>
              <td className="px-4 py-2 border">
                <select
                  className="border rounded p-1 text-sm"
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  {["pending", "shipped", "delivered", "canceled"].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-2 border">
                {new Date(order.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrderList;
