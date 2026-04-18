import { useState } from "react";

// Change these to whatever you want
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "snist123";

function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError("❌ Invalid username or password");
    }
  };

  const inputStyle = {
    display: "block", width: "100%", padding: "10px",
    margin: "10px 0", borderRadius: "5px",
    border: "1px solid #ddd", boxSizing: "border-box", fontSize: "14px"
  };

  return (
    <div style={{ maxWidth: "380px", margin: "60px auto", textAlign: "center" }}>
      <div style={{
        background: "white", padding: "35px", borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
      }}>
        <h2 style={{ marginBottom: "5px" }}>🔐 Admin Login</h2>
        <p style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>
          This area is restricted to admins only
        </p>

        {error && (
          <p style={{ color: "red", background: "#ffe0e0", padding: "8px", borderRadius: "5px" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={inputStyle}
        />
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: "50px" }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute", right: "12px", top: "50%",
              transform: "translateY(-50%)", cursor: "pointer",
              color: "#888", fontSize: "13px"
            }}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: "100%", padding: "12px", background: "#007bff",
            color: "white", border: "none", borderRadius: "5px",
            cursor: "pointer", fontSize: "16px", fontWeight: "bold", marginTop: "10px"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;