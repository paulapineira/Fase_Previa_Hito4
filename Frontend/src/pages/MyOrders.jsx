import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import ProductCard from '../components/ProductCard';
import api from '../services/api'
import './MyOrders.css';
import { useState } from 'react';

const MyOrders = () => {
  const { cart, removeFromCart, addToCart } = useCart()
  const [direccionEnvio, setDireccionEnvio] = useState('')
  const { user } = useAuth(); // Acceder al usuario logueado desde el authcontext


    // Calcular el total
    const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('No hay productos en tu carrito para proceder con la compra.');
      return;
    }

    if (!user) {
      alert('Por favor, inicie sesión para proceder con la compra.');
      return;
    }

    if (!direccionEnvio) { 
      alert('Por favor, ingresa una dirección de envío.');
      return;
    }

    const productosPedido = cart.map(producto => ({
      id_producto: producto.id_producto,
      cantidad: producto.quantity,
    }));

    try {
      const response = await api.post('/pedidos', {
        id_usuario: user.id_usuario, 
        direccion_envio: direccionEnvio,
        estado: 'pendiente',
        productos: productosPedido,
      });
      console.log(response.data)
      
      alert('Pedido realizado con éxito');
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      alert('Hubo un error al procesar el pedido. Intenta de nuevo.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Mis Pedidos</h2>
      {cart.length === 0 ? (
        <p>No tienes productos en tu pedido.</p>
      ) : (
        <>
 <div className="d-flex justify-content-between mt-3">
            <h4>Total: {Math.floor(total)}</h4> {/* Mostrar el total sin decimales */}
          </div>
          <div className="row">
            {cart.map((order) => (
              <div key={order.id_producto} className="col-12 col-md-4 mb-4">
                <ProductCard
                  id={order.id_producto} 
                  name={order.nombre}
                  description={order.descripcion}
                  price={order.precio}
                  image={order.imagen}
                  onAddToCart={() => addToCart(order)}
                  showRemoveButton={true}
                />
                <div className="d-flex justify-content-between mt-2">
                  <span>Cantidad: {order.quantity}</span>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(order.id_producto)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label htmlFor="direccionEnvio">Dirección de Envío:</label>
            <input
              type="text"
              id="direccionEnvio"
              value={direccionEnvio}
              onChange={(e) => setDireccionEnvio(e.target.value)}
              required
              placeholder="Ingresa tu dirección de envío"
            />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-success" onClick={handleCheckout}>
              Proceder con la compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;