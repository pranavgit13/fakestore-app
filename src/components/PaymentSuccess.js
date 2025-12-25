import { Link } from "react-router-dom";

function PaymentSuccess() {
  return (
    <div className="text-center mt-5">
      <h2 className="text-success">🎉 Payment Successful!</h2>
      <p>Your order has been placed successfully.</p>

      <Link to="/" className="btn btn-primary mt-3">
        Continue Shopping
      </Link>
    </div>
  );
}

export default PaymentSuccess;
