import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar({ setCategory, darkMode, setDarkMode }) {
  const { cart } = useContext(CartContext);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        backgroundColor: darkMode ? "#6F42C1" : "#000000", // Purple : Black
      }}
    >
      <div className="container">
        {/* Left side */}
        <Link
          className="navbar-brand"
          to="/"
          onClick={() => setCategory("all")}
        >
          FakeStore
        </Link>

        {/* Right side */}
        <div className="d-flex ms-auto align-items-center gap-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Categories
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setCategory("all")}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setCategory("electronics")}
                >
                  Electronics
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setCategory("jewelery")}
                >
                  Jewelery
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setCategory("men's clothing")}
                >
                  Men's Clothing
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setCategory("women's clothing")}
                >
                  Women's Clothing
                </button>
              </li>
            </ul>
          </div>

          <Link to="/orders" className="btn btn-outline-light">
            Your Orders
          </Link>

          <Link to="/cart" className="btn btn-warning">
            Cart ({cart.length})
          </Link>

          <button
            className="btn btn-outline-light"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
