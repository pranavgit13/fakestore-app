import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  // 🛒 Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // 📦 Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 💾 Persist orders
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ➕ Add to cart
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➖ Decrease quantity
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter(item => item.qty > 0)
    );
  };

  // ❌ Delete item
  const deleteItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // ✅ Place order
  const placeOrder = (totalAmount) => {
    const newOrder = {
      orderId: Date.now(),
      items: cart,
      total: totalAmount,
      date: new Date().toLocaleString(),
      status: "Placed"
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
  };
  const clearOrders = () => {
  setOrders([]);
};


  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        decreaseQty,
        deleteItem,
        placeOrder,
        clearOrders
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
