import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Review input states
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  // 🔹 Edit state
  const [editIndex, setEditIndex] = useState(null);

  // 🔹 Stored reviews
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews-${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  // 🔹 Save reviews
  useEffect(() => {
    localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  if (loading) return <h3>Loading...</h3>;
  if (!product) return <h3>Product not found</h3>;

  // 🔹 Add / Update Review
  const handleSubmit = () => {
    if (!review.trim()) return;

    if (editIndex !== null) {
      // Update review
      const updated = [...reviews];
      updated[editIndex] = {
        rating,
        review,
        date: new Date().toLocaleString()
      };
      setReviews(updated);
      setEditIndex(null);
    } else {
      // Add review
      setReviews(prev => [
        { rating, review, date: new Date().toLocaleString() },
        ...prev
      ]);
    }

    setReview("");
    setRating(5);
  };

  // 🔹 Edit Review
  const handleEdit = (index) => {
    setEditIndex(index);
    setRating(reviews[index].rating);
    setReview(reviews[index].review);
  };

  // 🔹 Delete Review
  const handleDelete = (index) => {
    setReviews(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ objectFit: "contain", maxHeight: "350px" }}
          />
        </div>

        {/* Product Info */}
        <div className="col-md-7">
          <h3>{product.title}</h3>

          <p className="text-warning fw-bold">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>

          <h4>₹ {product.price}</h4>
          <p>{product.description}</p>

          <button
            className="btn btn-success me-2"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* 🔹 Add / Edit Review */}
      <div className="mt-5">
        <h4>{editIndex !== null ? "Edit Review" : "Add Your Review"}</h4>

        <select
          className="form-select w-auto mb-2"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          className="form-control mb-2"
          rows="3"
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button className="btn btn-dark me-2" onClick={handleSubmit}>
          {editIndex !== null ? "Update Review" : "Submit Review"}
        </button>

        {editIndex !== null && (
          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditIndex(null);
              setReview("");
              setRating(5);
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* 🔹 Reviews List */}
      <div className="mt-4">
        <h4>Customer Reviews</h4>

        {reviews.length === 0 && <p>No reviews yet.</p>}

        {reviews.map((r, index) => (
          <div key={index} className="border rounded p-3 mb-2">
            <strong>⭐ {r.rating}</strong>
            <p className="mb-1">{r.review}</p>
            <small className="text-muted">{r.date}</small>

            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;
