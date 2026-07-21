import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ==========================
  // Thêm sản phẩm
  // ==========================
  const addToCart = (item) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (p) =>
          p.id === item.id && p.color === item.color && p.size === item.size,
      );

      if (index !== -1) {
        const newCart = [...prev];

        newCart[index].quantity += item.quantity;

        return newCart;
      }

      return [...prev, item];
    });
  };

  // ==========================
  // Xóa sản phẩm
  // ==========================
  const removeFromCart = (id, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.color === color && item.size === size),
      ),
    );
  };

  // ==========================
  // Cập nhật số lượng
  // ==========================
  const updateQuantity = (id, color, size, quantity) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.color === color && item.size === size) {
          return {
            ...item,
            quantity,
          };
        }

        return item;
      }),
    );
  };

  // ==========================
  // Xóa toàn bộ giỏ hàng
  // ==========================
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
