import { useState } from "react";

function AuthPage({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    display: "block", width: "100%", padding: "11px",
    margin: "10px 0", borderRadius: "5px",
    border: "1px solid #ccc", boxSizing: "border-box",
    fontSize: "14px", outline: "none"
  };

  const handleSubmit = () => {
    setError("");
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    const body = isLogin
      ? { email, password }
      : { name, email, password };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.error) {
          setError(data.error);
        } else {
          onLoginSuccess(data); // pass user object up to App
        }
      })
      .catch(() => {
        setLoading(false);
        setError("Server error. Make sure backend is running.");
      });
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#EAEDED",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "white", padding: "35px", borderRadius: "10px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)", width: "360px"
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ fontWeight: "bold", fontSize: "26px" }}>shop</span>
          <span style={{ fontWeight: "bold", fontSize: "26px", color: "#ff9900" }}>Easy</span>
        </div>

        <h2 style={{ margin: "0 0 20px", fontSize: "20px", color: "#0F1111" }}>
          {isLogin ? "Sign in to your account" : "Create your account"}
        </h2>

        {error && (
          <div style={{ background: "#ffe0e0", color: "#c0392b", padding: "10px", borderRadius: "5px", marginBottom: "12px", fontSize: "13px" }}>
            {error}
          </div>
        )}

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", padding: "11px",
            background: loading ? "#ccc" : "#FFD814",
            border: "1px solid #FCD200", borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold", fontSize: "15px", marginTop: "10px", color: "#0F1111"
          }}
        >
          {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
        </button>

        <hr style={{ margin: "20px 0", borderColor: "#eee" }} />

        <p style={{ textAlign: "center", fontSize: "14px", color: "#555" }}>
          {isLogin ? "New to shopEasy?" : "Already have an account?"}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            style={{ color: "#c45500", fontWeight: "bold", cursor: "pointer", marginLeft: "5px" }}
          >
            {isLogin ? "Create account" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;