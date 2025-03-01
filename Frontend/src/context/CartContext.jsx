import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del pedido (order)

  // Funcion para agregar productos al pedido(order)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id_producto === product.id_producto);
      if (existingProduct) {
        // Si el producto ya existe solo aumenta la cantidad
        return prevCart.map((item) =>
          item.id_producto === product.id_producto
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Funcion para eliminar un producto del pedido
  const removeFromCart = (id_producto) => {
    setCart((prevCart) => {
      // Encontramos el producto que se está eliminando
      const existingProduct = prevCart.find((item) => item.id_producto === id_producto);
  
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Si hay más de una unidad, disminuimos la cantidad
          return prevCart.map((item) =>
            item.id_producto === id_producto
              ? { ...item, quantity: item.quantity - 1 }  // Reducimos la cantidad del producto
              : item  // Mantenemos el resto del carrito igual
          );
        } else {
          // Si sólo queda una unidad, eliminamos el producto
          return prevCart.filter((item) => item.id_producto !== id_producto); // Filtramos el producto para eliminarlo
        }
      }
      return prevCart; // Si no se encuentra el producto, retornamos el pedido sin cambios
    });
  };
  
    // Función para limpiar el carrito
    const clearCart = () => {
      setCart([]);  // Limpiar el estado del carrito
      localStorage.removeItem('cart');  // Limpiar el carrito en el localStorage si lo tenías guardado
    };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
