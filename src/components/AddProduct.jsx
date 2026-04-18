import { useState } from "react";

function AddProduct({ fetchProducts }) {
  const [product, setProduct] = useState({
    name: "", description: "", price: "", category: "", imageUrl: "", stock: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!product.name || !product.price) {
      alert("Name and Price are required!");
      return;
    }

    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        setMessage("✅ Product added: " + data.name);
        setProduct({ name: "", description: "", price: "", category: "", imageUrl: "", stock: "" });
        fetchProducts();
      })
      .catch(err => alert("Error: " + err));
  };

  const inputStyle = {
    display: "block", width: "100%", padding: "10px",
    margin: "10px 0", borderRadius: "5px",
    border: "1px solid #ddd", boxSizing: "border-box", fontSize: "14px"
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>⚙️ Admin - Add New Product</h2>
      <div style={{ background: "white", padding: "25px", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        {message && <p style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
        <input name="name" placeholder="Product Name *" value={product.name} onChange={handleChange} style={inputStyle} />
        <input name="description" placeholder="Description" value={product.description} onChange={handleChange} style={inputStyle} />
        <input name="price" placeholder="Price (₹) *" type="number" value={product.price} onChange={handleChange} style={inputStyle} />
        <input name="category" placeholder="Category (Electronics, Clothing...)" value={product.category} onChange={handleChange} style={inputStyle} />
        <input name="imageUrl" placeholder="Image URL (optional)" value={product.imageUrl} onChange={handleChange} style={inputStyle} />
        <input name="stock" placeholder="Stock Quantity" type="number" value={product.stock} onChange={handleChange} style={inputStyle} />
        <button onClick={handleSubmit}
          style={{ width: "100%", padding: "12px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;