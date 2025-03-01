import { useEffect, useState } from 'react';
import './MySales.css';

const MySales = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener los pedidos
    const fetchPedidos = async () => {
      try {
        const response = await fetch('http://localhost:3000/pedidos');
        if (!response.ok) {
          throw new Error('Error al obtener los pedidos');
        }
        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []); // Este useEffect se ejecuta solo una vez al cargar el componente

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className="container mt-5">
      <h2>Mis ventas</h2>
      {pedidos.length === 0 ? (
        <p>No has realizado pedidos aún.</p> 
      ) : (
        <div className="row">
          {/* Mostrar los pedidos */}
          {pedidos.map((pedido) => (
            <div key={pedido.id_pedido} className="col-12 col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Pedido #{pedido.id_pedido}</h5>
                  <p className="card-text"><strong>Fecha del Pedido:</strong> {new Date(pedido.fecha_pedido).toLocaleString()}</p>
                  <p className="card-text"><strong>Estado:</strong> {pedido.estado}</p>
                  <p className="card-text"><strong>Dirección de Envío:</strong> {pedido.direccion_envio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySales;
