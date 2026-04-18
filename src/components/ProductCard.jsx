import { useState } from "react";

// Guaranteed inline SVG fallback — works even if /placeholder.png is missing
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='160' viewBox='0 0 200 160'%3E%3Crect width='200' height='160' fill='%23f0f2f2'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='%23aaa'%3E📦%3C/text%3E%3Ctext x='50%25' y='65%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%23bbb'%3ENo Image%3C/text%3E%3C/svg%3E";

function ProductCard({ product, addToCart, cart, updateQuantity }) {
  const cartItem = cart ? cart.find(item => item.id === product.id) : null;
  const quantity = cartItem ? cartItem.quantity : 0;

  const rating = ((product.id % 3) + 3.2).toFixed(1);
  const reviews = ((product.id * 37) % 800) + 50;

  // Track whether we've already fallen back, to prevent infinite onError loops.
  // React's synthetic onError is NOT cleared by setting element.onerror = null,
  // so a state flag is the correct approach.
 // ProductCard.jsx
const [imgSrc, setImgSrc] = useState(
  product.imageUrl?.trim() || product.image_url?.trim() || FALLBACK_IMG
);
  const [hasFailed, setHasFailed] = useState(false);

  const handleImgError = () => {
    if (!hasFailed) {
      setHasFailed(true);
      setImgSrc(FALLBACK_IMG);
    }
  };

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
        overflow: "hidden",
        transition: "box-shadow 0.2s",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      onMouseEnter={e =>
        (e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)")
      }
      onMouseLeave={e =>
        (e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.08)")
      }
    >
      <div style={{ background: "#f7f8f8", padding: "10px", textAlign: "center" }}>
        <img
          src={imgSrc}
          onError={handleImgError}
          alt={product.name}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "contain",
            display: "block"
          }}
        />
      </div>

      <div
        style={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "500", color: "#0F1111" }}>
          {product.name}
        </p>

        <p style={{ margin: "0 0 4px", fontSize: "12px", color: "#565959" }}>
          {product.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "4px", margin: "6px 0" }}>
          <span style={{ color: "#ff9900", fontSize: "13px" }}>
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </span>
          <span style={{ color: "#007185", fontSize: "12px" }}>{reviews}</span>
        </div>

        <div style={{ margin: "6px 0" }}>
          <span style={{ fontSize: "13px", color: "#0F1111" }}>₹</span>
          <span style={{ fontSize: "22px", fontWeight: "500", color: "#0F1111" }}>
            {Math.floor(product.price).toLocaleString("en-IN")}
          </span>
          <span style={{ fontSize: "13px", color: "#0F1111" }}>
            .{String((product.price % 1).toFixed(2)).slice(2)}
          </span>
        </div>

        <p
          style={{
            fontSize: "12px",
            margin: "2px 0 6px",
            color: product.stock > 0 ? "#007600" : "#cc0c39",
            fontWeight: "500",
          }}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <span
          style={{
            background: "#e8f4f8",
            color: "#007185",
            fontSize: "11px",
            padding: "2px 7px",
            borderRadius: "3px",
            marginBottom: "10px",
            display: "inline-block",
          }}
        >
          {product.category}
        </span>

        <div style={{ marginTop: "auto" }}>
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              style={{
                width: "100%",
                padding: "8px",
                background: product.stock > 0 ? "#FFD814" : "#f0f2f2",
                color: "#0F1111",
                border: `1px solid ${product.stock > 0 ? "#FCD200" : "#d5d9d9"}`,
                borderRadius: "20px",
                cursor: product.stock > 0 ? "pointer" : "not-allowed",
                fontWeight: "500",
                fontSize: "13px",
                display: "block",
              }}
            >
              Add to Cart
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                style={{
                  padding: "5px 13px",
                  fontSize: "18px",
                  background: "#f0f2f2",
                  border: "1px solid #d5d9d9",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                −
              </button>
              <span style={{ fontWeight: "bold", fontSize: "15px" }}>{quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                style={{
                  padding: "5px 13px",
                  fontSize: "18px",
                  background: "#FFD814",
                  border: "1px solid #FCD200",
                  borderRadius: "20px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
