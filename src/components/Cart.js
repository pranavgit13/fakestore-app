import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, addToCart, decreaseQty, deleteItem } =
    useContext(CartContext);

  if (cart.length === 0) {
    return <h3>Your cart is empty 🛒</h3>;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div>
      <h3>Your Cart</h3>

      {cart.map(item => (
        <div key={item.id} className="card mb-3 p-3">
          <h6>{item.title}</h6>
          <p>Price: ₹ {item.price}</p>

          {/* Quantity Controls */}
          <div className="d-flex align-items-center gap-2 mb-2">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => decreaseQty(item.id)}
            >
              −
            </button>

            <span><strong>{item.qty}</strong></span>

            <button
              className="btn btn-secondary btn-sm"
              onClick={() => addToCart(item)}
            >
              +
            </button>
          </div>

          <p>
            <strong>
              Subtotal: ₹ {(item.price * item.qty).toFixed(2)}
            </strong>
          </p>

          {/* Delete Button */}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteItem(item.id)}
          >
            Delete Item
          </button>
        </div>
      ))}

      <h4 className="mt-3">Total: ₹ {total.toFixed(2)}</h4>

      {/* Checkout Button */}
      <Link to="/checkout" className="btn btn-primary mt-3">
        Proceed to Checkout
      </Link>
    </div>
  );
}

export default Cart;
