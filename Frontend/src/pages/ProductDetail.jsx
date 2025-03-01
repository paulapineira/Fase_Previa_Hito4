import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import { useEffect, useState } from 'react';
import api from '../services/api';

const ProductDetail = () => {
  const { productId } = useParams(); // Obtenemos el id del producto desde la URL
  const [product, setProduct] = useState(null); // Estado para almacenar los datos del producto
  const [loading, setLoading] = useState(true); // Estado para manejar el loading

  useEffect(() => {
    // Realizamos la llamada a la API para obtener los detalles del producto
    api.get(`/productos/${productId}`)
      .then((response) => {
        setProduct(response.data); // Guardamos el producto en el estado
        setLoading(false); // Terminamos el loading
      })
      .catch((error) => {
        console.error("Error al obtener el producto:", error);
        setLoading(false); // Terminamos el loading en caso de error
      });
  }, [productId]); // Solo se ejecuta cuando cambia el productId

  // Mientras el producto se carga, mostramos un mensaje de loading
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no encontramos el producto, mostramos un mensaje
  if (!product) {
    return <div>Producto no encontrado. Sigue buscando, tenemos otras alternativas para ti.</div>;
  }

  return (
    <div className="product-detail-card">
      <img src={product.imagen} alt={product.nombre} className="product-image" />
      <div className="product-info">
        <h3>{product.nombre}</h3>
        <p>{product.descripcion}</p>
        <p>${product.precio}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
