import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);

  // Available Coupons (percentage-based)
  const coupons = [
    { code: "SAVE5", percent: 5, minAmount: 500 },
    { code: "SAVE10", percent: 10, minAmount: 1000 },
    { code: "SAVE20", percent: 20, minAmount: 2000 }
  ];

  // Subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Apply coupon
  const applyCoupon = (coupon) => {
    if (subtotal < coupon.minAmount) {
      setMessage(
        `❌ Minimum order ₹${coupon.minAmount} required for ${coupon.code}`
      );
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon(coupon);
    setMessage(`✅ ${coupon.percent}% discount applied`);
  };

  // Calculations
  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.percent) / 100
    : 0;

  const totalPayable = Math.max(subtotal - discountAmount, 0);

  // Payment handler
  const handlePayment = () => {
    setProcessing(true);

    setTimeout(() => {
      placeOrder(totalPayable);
      navigate("/orders");
    }, 2500);
  };

  return (
    <div className="card p-4">
      <h3>Checkout</h3>

      <p>Subtotal: ₹ {subtotal.toFixed(2)}</p>
      <p>Discount: ₹ {discountAmount.toFixed(2)}</p>
      <h5>Total Payable: ₹ {totalPayable.toFixed(2)}</h5>

      <hr />

      {/* Coupon List */}
      <h5>Available Coupons</h5>

      {coupons.map(coupon => (
        <div
          key={coupon.code}
          className="d-flex justify-content-between align-items-center border p-2 mb-2"
        >
          <div>
            <strong>{coupon.code}</strong> — {coupon.percent}% OFF  
            <br />
            <small>Min order ₹{coupon.minAmount}</small>
          </div>

          <button
            className="btn btn-outline-success btn-sm"
            onClick={() => applyCoupon(coupon)}
          >
            Apply
          </button>
        </div>
      ))}

      {message && <p className="fw-bold mt-2">{message}</p>}

      {/* Payment Button */}
      <button
        className="btn btn-primary mt-3 w-100"
        onClick={handlePayment}
        disabled={processing || cart.length === 0}
      >
        {processing ? "Processing Payment..." : "Proceed to Payment"}
      </button>
    </div>
  );
}

export default Checkout;
