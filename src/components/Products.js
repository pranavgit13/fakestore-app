import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Products({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Sort state
  const [sortOrder, setSortOrder] = useState("");

  // 🔹 View state (grid / list)
  const [view, setView] = useState("grid");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    let url = "https://fakestoreapi.com/products";
    if (category !== "all") {
      url = `https://fakestoreapi.com/products/category/${category}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
        setSortOrder("");
      });
  }, [category]);

  if (loading) return <h3>Loading...</h3>;

  // 🔹 Sorting logic
  const sortedProducts = [...products];

  if (sortOrder === "low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      {/* 🔹 Sort + View Controls */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        
        {/* View Toggle */}
        <div>
          <button
            className={`btn btn-sm me-2 ${view === "grid" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`btn btn-sm ${view === "list" ? "btn-dark" : "btn-outline-dark"}`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>

        {/* Sort Dropdown */}
        <select
          className="form-select w-auto"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* 🔹 PRODUCTS DISPLAY */}
      <div className={view === "grid" ? "row" : "list-group"}>
        {sortedProducts.map(product => (
          <div
            key={product.id}
            className={
              view === "grid"
                ? "col-md-4 mb-4"
                : "list-group-item mb-3"
            }
          >
            <div className={`card ${view === "list" ? "flex-row p-3" : "h-100"}`}>
              
              <img
                src={product.image}
                alt={product.title}
                style={{
                  height: view === "grid" ? "200px" : "120px",
                  width: view === "grid" ? "100%" : "120px",
                  objectFit: "contain"
                }}
              />

              <div className="card-body">
                <h6>{product.title}</h6>

                {/* ⭐ READ-ONLY API Rating */}
                <div className="mb-1">
                  <span className="text-warning fw-bold">
                    ⭐ {product.rating?.rate}
                  </span>
                  <span className="text-muted ms-1">
                    ({product.rating?.count} reviews)
                  </span>
                </div>

                <p>₹ {product.price}</p>

                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-primary btn-sm"
                >
                  View
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Products;
