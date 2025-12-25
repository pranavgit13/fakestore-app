import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Orders() {
  const { orders, clearOrders } = useContext(CartContext);

  if (!orders || orders.length === 0) {
    return <h3>You have no orders yet 📦</h3>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Your Orders</h3>

        <button
          className="btn btn-danger btn-sm"
          onClick={clearOrders}
        >
          Clear Order History
        </button>
      </div>

      {orders.map(order => (
        <div key={order.orderId} className="card mb-3 p-3">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ₹ {order.total.toFixed(2)}</p>

          <hr />

          {order.items.map(item => (
            <p key={item.id}>
              {item.title} × {item.qty}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
