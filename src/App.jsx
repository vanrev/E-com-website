import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import Orders from "./components/Orders";
import AdminLogin from "./components/AdminLogin";
import AuthPage from "./components/AuthPage";

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // null = not logged in

  useEffect(() => {
    fetchProducts();
  }, []);

  // App.jsx
const fetchProducts = () => {
  fetch("http://localhost:8080/api/products")
    .then(res => res.json())
    .then(data =>
      setProducts(
        data.map(p => ({
          ...p,
          imageUrl: p.imageUrl || p.image_url || ""
        }))
      )
    )
    .catch(err => console.log("Error:", err));
};
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleLoginSuccess = (user) => {
    setLoggedInUser(user);
    setPage("home");
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setCart([]);
    setPage("home");
  };

  // Show auth page if user tries to access cart/orders while not logged in
  if (!loggedInUser && (page === "cart" || page === "orders")) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div
  style={{
    width: "100%",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
    background: "#EAEDED"
  }}
>
      <Navbar
        page={page}
        setPage={setPage}
        cartCount={cart.length}
        loggedInUser={loggedInUser}
        onLogout={handleLogout}
      />
      <div style={{ width: "100%", background: "#EAEDED" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px 25px" }}>

          {page === "home" && (
            <ProductList
              products={products}
              addToCart={addToCart}
              cart={cart}
              updateQuantity={updateQuantity}
            />
          )}

          {page === "cart" && loggedInUser && (
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              setPage={setPage}
              setCart={setCart}
              loggedInUser={loggedInUser}
            />
          )}

          {page === "orders" && loggedInUser && (
            <Orders loggedInUser={loggedInUser} />
          )}

          {page === "admin" && (
            isAdminLoggedIn
              ? <AddProduct fetchProducts={fetchProducts} />
              : <AdminLogin onSuccess={() => setIsAdminLoggedIn(true)} />
          )}

          {page === "login" && (
            <AuthPage onLoginSuccess={handleLoginSuccess} />
          )}

        </div>
      </div>
    </div>
  );
}

export default App;