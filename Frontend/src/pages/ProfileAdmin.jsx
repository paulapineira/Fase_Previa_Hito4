import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import api from '../services/api';

const ProfileAdmin = () => {
  const { user } = useAuth();  // Accede al usuario desde el authcontext
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Si no hay usuario, redirige al login
    }
  }, [user, navigate]);

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (product.name && product.price && product.stock) {
      setLoading(true);  // Activar carga
      setError(null);  // Limpiar errores

      try {
        // Console log para ver los datos que se están enviando al backend
        console.log('Datos enviados al backend:', {
          nombre: product.name,
          descripcion: product.description,
          precio: parseFloat(product.price),
          stock: parseInt(product.stock),
          imagen: product.image,
        });

        // Enviar el producto a la API
        const response = await api.post('/productos', {
          nombre: product.name,
          descripcion: product.description,
          precio: parseFloat(product.price),
          stock: parseInt(product.stock),
          imagen: product.image,
        });
        console.log(response.data);

        alert('Producto creado exitosamente');
        setProduct({
          name: '',
          description: '',
          price: '',
          stock: '',
          image: '',
        });
      } catch (error) {
        console.error('Error al crear el producto:', error);
        setError('Hubo un error al crear el producto.');
      } finally {
        setLoading(false);  // Desactivar carga
      }
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  };

  if (!user) return <div>Cargando...</div>;  // Esperar a que el usuario esté disponible

  return (
    <div className="container mt-5">
      <h2>Perfil de Administrador</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={user.email} 
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={user.nombre} 
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Dirección</label>
        <input
          type="text"
          className="form-control"
          id="address"
          value={user.direccion}
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Teléfono</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={user.telefono} 
          disabled
        />
      </div>

      <h3>Crear un nuevo producto</h3>
      {error && <div className="alert alert-danger">{error}</div>}  {/* Mostrar mensaje de error */}
      <form onSubmit={handleSubmitProduct}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre del Producto</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleProductChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleProductChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleProductChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleProductChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Imagen URL</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={product.image}
            onChange={handleProductChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Creando...' : 'Crear Producto'}
        </button>
      </form>

      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate('/')}
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default ProfileAdmin;
