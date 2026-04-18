import { useState } from "react";

function Cart({ cart, removeFromCart, setPage, setCart,loggedInUser }) {
 const [customerName, setCustomerName] = useState(loggedInUser?.name || "");
const [customerEmail, setCustomerEmail] = useState(loggedInUser?.email || "");

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = () => {
    if (!customerName || !customerEmail || !deliveryAddress) {
      alert("Please fill in all fields including delivery address!");
      return;
    }

    const itemsSummary = cart.map(item => `${item.name} x${item.quantity}`).join(", ");

    const order = {
      customerName: customerName,
      customerEmail: customerEmail,
      totalAmount: total,
      itemsSummary: itemsSummary,
      deliveryAddress: deliveryAddress
    };

    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    })
      .then(res => res.json())
      .then(data => {
        setSuccessMsg("Order placed! Order ID: #" + data.id);
        setCart([]);
      })
      .catch(err => alert("Error placing order: " + err));
  };

  if (successMsg) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2 style={{ color: "green" }}>✅ {successMsg}</h2>
        <p>Thank you for shopping with ShopEasy!</p>
        <button onClick={() => { setPage("home"); setSuccessMsg(""); }}
          style={{ padding: "10px 25px", background: "#ff6b35", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>
          Continue Shopping
        </button>
        <button onClick={() => { setPage("orders"); setSuccessMsg(""); }}
          style={{ padding: "10px 25px", background: "#333", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          View Orders
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>🛒 Your Cart is Empty</h2>
        <button onClick={() => setPage("home")}
          style={{ padding: "10px 25px", background: "#ff6b35", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Shop Now
        </button>
      </div>
    );
  }

  const inputStyle = {
    display: "block", width: "100%", padding: "10px",
    margin: "10px 0", borderRadius: "5px",
    border: "1px solid #ddd", boxSizing: "border-box", fontSize: "14px"
  };

  return (
    <div style={{ maxWidth: "650px", margin: "0 auto" }}>
      <h2>🛒 Your Cart</h2>
      <div style={{ background: "white", borderRadius: "10px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        {cart.map(item => (
          <div key={item.id} style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "12px 0", borderBottom: "1px solid #eee"
          }}>
            <div>
              <strong>{item.name}</strong>
              <p style={{ margin: "3px 0", color: "#888", fontSize: "14px" }}>Qty: {item.quantity}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span style={{ fontWeight: "bold", color: "#e44d26" }}>₹{(item.price * item.quantity).toFixed(2)}</span>
              <button onClick={() => removeFromCart(item.id)}
                style={{ background: "none", border: "1px solid red", color: "red", borderRadius: "4px", padding: "4px 10px", cursor: "pointer" }}>
                Remove
              </button>
            </div>
          </div>
        ))}
        <h3 style={{ textAlign: "right", marginTop: "15px" }}>Total: ₹{total.toFixed(2)}</h3>
      </div>

      <div style={{ background: "white", borderRadius: "10px", padding: "20px", marginTop: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h3>📋 Customer Details</h3>

        <input type="text" placeholder="Your Full Name *" value={customerName}
  onChange={e => setCustomerName(e.target.value)}
  readOnly={!!loggedInUser}
  style={{ ...inputStyle, background: loggedInUser ? "#f5f5f5" : "white" }} />

<input type="email" placeholder="Your Email *" value={customerEmail}
  onChange={e => setCustomerEmail(e.target.value)}
  readOnly={!!loggedInUser}
  style={{ ...inputStyle, background: loggedInUser ? "#f5f5f5" : "white" }} />
        <textarea
          placeholder="Delivery Address * (House No, Street, City, Pincode)"
          value={deliveryAddress}
          onChange={e => setDeliveryAddress(e.target.value)}
          rows={3}
          style={{ ...inputStyle, resize: "vertical", fontFamily: "Arial, sans-serif" }}
        />
        <button onClick={placeOrder}
          style={{ width: "100%", padding: "12px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>
          ✅ Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;