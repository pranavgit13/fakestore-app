import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PaymentSuccess from "./components/PaymentSuccess";
import Orders from "./components/Orders";

function App() {
  const [category, setCategory] = useState("all");

  // 🔥 ADDED: theme state (logic untouched)
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <BrowserRouter>
        <Navbar
          setCategory={setCategory}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Products category={category} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
