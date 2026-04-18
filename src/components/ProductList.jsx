import { useState } from "react";
import ProductCard from "./ProductCard";

const CATEGORIES = ["All", "Electronics", "Clothing", "Footwear", "Accessories", "Miscellaneous"];

function ProductList({ products, addToCart, cart, updateQuantity }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = products
    .filter(p =>
      activeCategory === "All" ||
      p.category?.toLowerCase() === activeCategory.toLowerCase()
    )
    .filter(p => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      );
    });

  return (
    <div>
      {/* Search Bar */}
      <div style={{ display: "flex", marginBottom: "16px", maxWidth: "600px" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          style={{
            flex: 1,
            padding: "11px 16px",
            fontSize: "15px",
            border: "2px solid #ff9900",
            borderRight: "none",
            borderRadius: "5px 0 0 5px",
            outline: "none"
          }}
        />
        <button
          onClick={() => setSearchTerm("")}
          style={{
            padding: "11px 18px",
            background: "#ff9900",
            border: "none",
            borderRadius: "0 5px 5px 0",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          {searchTerm ? "✕" : "🔍"}
        </button>
      </div>

      {/* Category Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontWeight: "bold", color: "#555", marginRight: "5px" }}>Filter:</span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "6px 16px",
              background: activeCategory === cat ? "#ff9900" : "white",
              color: activeCategory === cat ? "white" : "#333",
              border: `1px solid ${activeCategory === cat ? "#ff9900" : "#ccc"}`,
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: activeCategory === cat ? "bold" : "normal"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <p style={{ color: "#555", fontSize: "14px", marginBottom: "15px" }}>
        {searchTerm && <span>Results for "<strong>{searchTerm}</strong>" — </span>}
        <strong>{filtered.length}</strong> product{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>
          <p style={{ fontSize: "18px" }}>No products found.</p>
          <button
            onClick={() => { setActiveCategory("All"); setSearchTerm(""); }}
            style={{
              padding: "8px 20px",
              background: "#ff9900",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px"
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    alignItems: "start"
  }}
>
          {filtered.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              cart={cart}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;