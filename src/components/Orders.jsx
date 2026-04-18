import { useState, useEffect } from "react";

function Orders({ loggedInUser }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loggedInUser) return;
    fetch(`http://localhost:8080/api/orders/user/${loggedInUser.email}`)
      .then(res => res.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [loggedInUser]);

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  if (loading) return <p style={{ padding: "20px" }}>Loading orders...</p>;

  return (
    <div style={{ maxWidth: "750px" }}>
      <h2>📦 My Orders</h2>

      {/* Summary card */}
      <div style={{
        display: "flex", gap: "20px", marginBottom: "25px", flexWrap: "wrap"
      }}>
        <div style={{
          background: "white", padding: "20px", borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)", flex: 1, textAlign: "center"
        }}>
          <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>Total Orders</p>
          <p style={{ margin: "5px 0 0", fontSize: "28px", fontWeight: "bold", color: "#ff9900" }}>
            {orders.length}
          </p>
        </div>
        <div style={{
          background: "white", padding: "20px", borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)", flex: 1, textAlign: "center"
        }}>
          <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>Total Spent</p>
          <p style={{ margin: "5px 0 0", fontSize: "28px", fontWeight: "bold", color: "#007600" }}>
            ₹{totalSpent.toLocaleString("en-IN")}
          </p>
        </div>
        <div style={{
          background: "white", padding: "20px", borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)", flex: 1, textAlign: "center"
        }}>
          <p style={{ margin: 0, color: "#888", fontSize: "13px" }}>Welcome back</p>
          <p style={{ margin: "5px 0 0", fontSize: "20px", fontWeight: "bold", color: "#0F1111" }}>
            {loggedInUser?.name}
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: "10px" }}>
          <p style={{ fontSize: "18px", color: "#888" }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        orders.map(order => (
          <div key={order.id} style={{
            background: "white", borderRadius: "10px", padding: "20px",
            marginBottom: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h4 style={{ margin: 0, color: "#ff9900" }}>Order #{order.id}</h4>
              <span style={{
                background: "#e6f4ea", color: "#007600", padding: "3px 10px",
                borderRadius: "12px", fontSize: "13px", fontWeight: "bold"
              }}>
                {order.status}
              </span>
            </div>
            <p style={{ margin: "4px 0", fontSize: "14px" }}><strong>Items:</strong> {order.itemsSummary}</p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}><strong>Delivery to:</strong> {order.deliveryAddress}</p>
            <p style={{ margin: "4px 0", fontSize: "14px" }}>
              <strong>Total:</strong>{" "}
              <span style={{ color: "#c0392b", fontWeight: "bold" }}>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
            </p>
            <p style={{ margin: "4px 0", fontSize: "12px", color: "#999" }}>
              Placed on: {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;