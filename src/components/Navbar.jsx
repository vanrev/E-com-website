import { useState } from "react";

function Navbar({ page, setPage, cartCount, loggedInUser, onLogout }) { 
   const [location, setLocation] = useState("Hyderabad");
  const [editingLocation, setEditingLocation] = useState(false);
  const [tempLocation, setTempLocation] = useState("Hyderabad");

  const handleLocationSave = () => {
    if (tempLocation.trim()) {
      setLocation(tempLocation.trim());
    }
    setEditingLocation(false);
  };

  return (
    <nav style={{ background: "#131921", position: "sticky", top: 0, zIndex: 100, width: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", padding: "8px 20px", gap: "10px" }}>

        {/* Logo */}
        <div
          onClick={() => setPage("home")}
          style={{ cursor: "pointer", border: "1px solid transparent", padding: "4px 8px", borderRadius: "3px" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
        >
          <span style={{ color: "white", fontWeight: "bold", fontSize: "22px" }}>shop</span>
          <span style={{ color: "#ff9900", fontWeight: "bold", fontSize: "22px" }}>Easy</span>
        </div>

        {/* Location widget */}
        <div style={{ position: "relative" }}>
          {editingLocation ? (
            <div style={{
              position: "absolute", top: "35px", left: 0,
              background: "white", padding: "12px", borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)", zIndex: 200,
              width: "220px"
            }}>
              <p style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: "bold", color: "#333" }}>
                Update Delivery Location
              </p>
              <input
                type="text"
                value={tempLocation}
                onChange={e => setTempLocation(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleLocationSave()}
                placeholder="Enter city or pincode"
                autoFocus
                style={{
                  width: "100%", padding: "8px", boxSizing: "border-box",
                  border: "2px solid #ff9900", borderRadius: "5px",
                  fontSize: "13px", outline: "none"
                }}
              />
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button onClick={handleLocationSave}
                  style={{ flex: 1, padding: "7px", background: "#ff9900", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", fontSize: "13px" }}>
                  Apply
                </button>
                <button onClick={() => setEditingLocation(false)}
                  style={{ flex: 1, padding: "7px", background: "#f0f2f2", border: "1px solid #ddd", borderRadius: "5px", cursor: "pointer", fontSize: "13px" }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : null}

          <div
            onClick={() => { setTempLocation(location); setEditingLocation(!editingLocation); }}
            style={{
              cursor: "pointer", border: "1px solid transparent",
              padding: "4px 8px", borderRadius: "3px",
              borderColor: editingLocation ? "white" : "transparent"
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
            onMouseLeave={e => e.currentTarget.style.borderColor = editingLocation ? "white" : "transparent"}
          >
            <div style={{ color: "#ccc", fontSize: "11px" }}>📍 Deliver to</div>
            <div style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}>{location}</div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <NavBtn label="Home" active={page === "home"} onClick={() => setPage("home")} />
        <NavBtn label="Orders" active={page === "orders"} onClick={() => setPage("orders")} />
        <NavBtn label="Admin" active={page === "admin"} onClick={() => setPage("admin")} />
            {loggedInUser ? (
  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
    <span style={{ color: "#ccc", fontSize: "13px" }}>
      Hello, <strong style={{ color: "white" }}>{loggedInUser.name.split(" ")[0]}</strong>
    </span>
    <button
      onClick={onLogout}
      style={{
        background: "none", border: "1px solid #888", color: "#ccc",
        padding: "4px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px"
      }}
    >
      Logout
    </button>
  </div>
) : (
  <NavBtn label="Sign In" active={page === "login"} onClick={() => setPage("login")} />
)}
        <div
          onClick={() => setPage("cart")}
          style={{
            display: "flex", alignItems: "center", gap: "4px",
            cursor: "pointer", border: "1px solid transparent",
            padding: "6px 10px", borderRadius: "3px",
            borderColor: page === "cart" ? "#ff9900" : "transparent"
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
          onMouseLeave={e => e.currentTarget.style.borderColor = page === "cart" ? "#ff9900" : "transparent"}
        >
          <span style={{ fontSize: "26px" }}>🛒</span>
          <div>
            {cartCount > 0 && (
              <div style={{ color: "#ff9900", fontWeight: "bold", fontSize: "16px", textAlign: "center" }}>
                {cartCount}
              </div>
            )}

            <span style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>Cart</span>
          </div>
        </div>
      </div>

      <div style={{ background: "#232f3e", padding: "6px 20px" }}>
        <span style={{ color: "white", fontSize: "13px" }}>
          🔥 Deals &nbsp;|&nbsp; Electronics &nbsp;|&nbsp; Clothing &nbsp;|&nbsp; Footwear &nbsp;|&nbsp; Accessories
        </span>
      </div>
    </nav>
  );
}

function NavBtn({ label, active, onClick }) {
  return (
    <div onClick={onClick} style={{
      color: "white", cursor: "pointer", padding: "6px 10px",
      border: `1px solid ${active ? "#ff9900" : "transparent"}`,
      borderRadius: "3px", fontSize: "14px", fontWeight: active ? "bold" : "normal"
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
      onMouseLeave={e => e.currentTarget.style.borderColor = active ? "#ff9900" : "transparent"}
    >
      {label}
    </div>
  );
}

export default Navbar;