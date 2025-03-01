// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';


// const ProfileAdmin = () => {
//   const [user, setUser] = useState(null);
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     image: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Verificamos si el usuario esta en el localStorage
//     const storedUser = JSON.parse(localStorage.getItem('user')); // se carga el usuario desde el localStorage
//     if (!storedUser) {
//       navigate('/login'); // Si no hay usuario redirigimos al login
//     } else {
//       setUser(storedUser); // Si hay usuario lo configuramos en el estado
//     }
//   }, [navigate]);

//   const handleProductChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmitProduct = (e) => {
//     e.preventDefault();

//     if (product.name && product.price && product.stock) {
//       alert('Producto creado (simulado)!');
//       setProduct({
//         name: '',
//         description: '',
//         price: '',
//         category: '',
//         stock: '',
//         image: '',
//       });
//     } else {
//       alert('Por favor, complete todos los campos requeridos.');
//     }
//   };

//   if (!user) return <div>Cargando...</div>;

//   return (
//     <div className="container mt-5">
//       <h2>Perfil de Administrador</h2>
//       <div className="mb-3">
//         <label htmlFor="email" className="form-label">Correo electrónico</label>
//         <input
//           type="email"
//           className="form-control"
//           id="email"
//           value={user.email}
//           disabled
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">Nombre</label>
//         <input
//           type="text"
//           className="form-control"
//           id="name"
//           value={user.name}
//           disabled
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="address" className="form-label">Dirección</label>
//         <input
//           type="text"
//           className="form-control"
//           id="address"
//           value={user.address}
//           disabled
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="phone" className="form-label">Teléfono</label>
//         <input
//           type="text"
//           className="form-control"
//           id="phone"
//           value={user.phone}
//           disabled
//         />
//       </div>

//       <h3>Crear un nuevo producto</h3>
//       <form onSubmit={handleSubmitProduct}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Nombre del Producto</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             value={product.name}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">Descripción</label>
//           <textarea
//             className="form-control"
//             id="description"
//             name="description"
//             value={product.description}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="price" className="form-label">Precio</label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             name="price"
//             value={product.price}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">Categoría</label>
//           <input
//             type="text"
//             className="form-control"
//             id="category"
//             name="category"
//             value={product.category}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="stock" className="form-label">Stock</label>
//           <input
//             type="number"
//             className="form-control"
//             id="stock"
//             name="stock"
//             value={product.stock}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="image" className="form-label">Imagen URL</label>
//           <input
//             type="text"
//             className="form-control"
//             id="image"
//             name="image"
//             value={product.image}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success">Crear Producto</button>
//       </form>

//       <button
//         className="btn btn-secondary mt-3"
//         onClick={() => navigate('/')}>
//         Volver al Inicio
//       </button>
//     </div>
//   );
// };

// export default ProfileAdmin;

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../services/api';

// const ProfileAdmin = () => {
//   const [user, setUser] = useState(null);
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//     stock: '',
//     image: '',
//   });
//   const [categories, setCategories] = useState([]);  // Para almacenar las categorías
//   const [loading, setLoading] = useState(false);  // Para manejar el estado de carga
//   const [error, setError] = useState(null);  // Para manejar errores
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Verificamos si el usuario esta en el localStorage
//     const storedUser = JSON.parse(localStorage.getItem('user')); // se carga el usuario desde el localStorage
//     if (!storedUser) {
//       navigate('/login'); // Si no hay usuario redirigimos al login
//     } else {
//       setUser(storedUser); // Si hay usuario lo configuramos en el estado
//     }

//     // Cargar categorías disponibles
//     const fetchCategories = async () => {
//       try {
//         const response = await api.get('/api/categories'); // Ruta que devuelve las categorías
//         setCategories(response.data); // Suponiendo que la respuesta tiene un campo 'data' con las categorías
//       } catch (error) {
//         console.error('Error al cargar las categorías:', error);
//         setError('No se pudieron cargar las categorías.');
//       }
//     };

//     fetchCategories();
//   }, [navigate]);

//   const handleProductChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmitProduct = async (e) => {
//     e.preventDefault();

//     if (product.name && product.price && product.stock && product.category) {
//       setLoading(true);  // Activar carga
//       setError(null);  // Limpiar errores

//       try {
//         // Enviar el producto a la API
//         const response = await api.post('/api/products', {
//           nombre: product.nombre,
//           descripcion: product.descripcion,
//           precio: parseFloat(product.precio),
//           stock: parseInt(product.stock),
//           id_categoria: product.categoria,
//           imagen: product.imagen,
//         })
//         console.log(response.data)

//         alert('Producto creado exitosamente');
//         setProduct({
//           name: '',
//           description: '',
//           price: '',
//           category: '',
//           stock: '',
//           image: '',
//         });

//       } catch (error) {
//         console.error('Error al crear el producto:', error);
//         setError('Hubo un error al crear el producto.');
//       } finally {
//         setLoading(false);  // Desactivar carga
//       }
//     } else {
//       alert('Por favor, complete todos los campos requeridos.');
//     }
//   };

//   if (!user) return <div>Cargando...</div>;

//   return (
//     <div className="container mt-5">
//       <h2>Perfil de Administrador</h2>
//       <div className="mb-3">
//         <label htmlFor="email" className="form-label">Correo electrónico</label>
//         <input
//           type="email"
//           className="form-control"
//           id="email"
//           value={user.correo}
//           disabled
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">Nombre</label>
//         <input
//           type="text"
//           className="form-control"
//           id="name"
//           value={user.nombre}
//           disabled
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="address" className="form-label">Dirección</label>
//         <input
//           type="text"
//           className="form-control"
//           id="address"
//           value={user.direccion}
//           disabled
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="phone" className="form-label">Teléfono</label>
//         <input
//           type="text"
//           className="form-control"
//           id="phone"
//           value={user.telefono}
//           disabled
//         />
//       </div>

//       <h3>Crear un nuevo producto</h3>
//       {error && <div className="alert alert-danger">{error}</div>}  {/* Mostrar mensaje de error */}
//       <form onSubmit={handleSubmitProduct}>
//         <div className="mb-3">
//           <label htmlFor="name" className="form-label">Nombre del Producto</label>
//           <input
//             type="text"
//             className="form-control"
//             id="name"
//             name="name"
//             value={product.nombre}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="description" className="form-label">Descripción</label>
//           <textarea
//             className="form-control"
//             id="description"
//             name="description"
//             value={product.descripcion}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="price" className="form-label">Precio</label>
//           <input
//             type="number"
//             className="form-control"
//             id="price"
//             name="price"
//             value={product.precio}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="category" className="form-label">Categoría</label>
//           <select
//             className="form-control"
//             id="category"
//             name="category"
//             value={product.categoria}
//             onChange={handleProductChange}
//             required
//           >
//             <option value="">Seleccione una categoría</option>
//             {categories.map((category) => (
//               <option key={category.id_categoria} value={category.id_categoria}>
//                 {category.nombre}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="stock" className="form-label">Stock</label>
//           <input
//             type="number"
//             className="form-control"
//             id="stock"
//             name="stock"
//             value={product.stock}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="image" className="form-label">Imagen URL</label>
//           <input
//             type="text"
//             className="form-control"
//             id="image"
//             name="image"
//             value={product.imagen}
//             onChange={handleProductChange}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-success" disabled={loading}>
//           {loading ? 'Creando...' : 'Crear Producto'}
//         </button>
//       </form>

//       <button
//         className="btn btn-secondary mt-3"
//         onClick={() => navigate('/')}
//       >
//         Volver al Inicio
//       </button>
//     </div>
//   );
// };

// export default ProfileAdmin;


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
    category: '',
    stock: '',
    image: '',
  });
  const [categories, setCategories] = useState([]);  // Para almacenar las categorías
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga
  const [error, setError] = useState(null);  // Para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Si no hay usuario, redirige al login
    }

    // Cargar categorías disponibles
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories'); // Ruta que devuelve las categorías
        setCategories(response.data); // Suponiendo que la respuesta tiene un campo 'data' con las categorías
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
        setError('No se pudieron cargar las categorías.');
      }
    };

    fetchCategories();
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

    if (product.name && product.price && product.stock && product.category) {
      setLoading(true);  // Activar carga
      setError(null);  // Limpiar errores

      try {
        // Enviar el producto a la API
        const response = await api.post('/api/products', {
          nombre: product.nombre,
          descripcion: product.descripcion,
          precio: parseFloat(product.precio),
          stock: parseInt(product.stock),
          id_categoria: product.categoria,
          imagen: product.imagen,
        });
        console.log(response.data);

        alert('Producto creado exitosamente');
        setProduct({
          name: '',
          description: '',
          price: '',
          category: '',
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
            value={product.nombre}
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
            value={product.descripcion}
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
            value={product.precio}
            onChange={handleProductChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Categoría</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={product.categoria}
            onChange={handleProductChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categories.map((category) => (
              <option key={category.id_categoria} value={category.id_categoria}>
                {category.nombre}
              </option>
            ))}
          </select>
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
            value={product.imagen}
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
