import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';  // Importar jwt-decode para decodificar lo que viene en el token
import { useCart } from './CartContext'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const cartContext = useCart(); 

  const { clearCart } = cartContext || {}; //se va a ocupar cuando el usuario hace logout, para limpiar mis pedidos

  useEffect(() => {
    // Verificar si hay un usuario almacenado en localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Usuario almacenado:', storedUser);

    if (storedUser) {
      // Decodificar el token para obtener el rol y otros datos
      const decodedToken = jwtDecode(storedUser.token);
      console.log('Token decodificado:', decodedToken);

      // Extraer el rol, id_usuario, nombre, direccion y telefono desde el token
      const { rol, id_usuario, nombre, direccion, telefono } = decodedToken;

      console.log('Rol del usuario:', rol);
      console.log('ID del usuario:', id_usuario);

      // Establecer el usuario y el rol, y otros datos en el estado
      setUser({ ...storedUser, rol, id_usuario, nombre, direccion, telefono });
      
      // Redirigir al home o página adecuada si el usuario ya está autenticado
      if (window.location.pathname === '/login') {
        navigate('/');  // Redirige al home o a la página por defecto
      }
    } else {
      // Si no hay usuario en localStorage, y estamos en la página de login, no hacemos nada
      if (window.location.pathname !== '/login') {
        navigate('/login');  // Redirigir al login si no hay usuario autenticado
      }
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      console.log('Enviando solicitud de login...');
      const response = await api.post('/usuarios/login', { 
        correo: email, 
        contraseña: password 
      });
      console.log('Respuesta de la API:', response.data);

      if (response.status !== 200) {
        throw new Error('Error en la respuesta de la API');
      }

      const { token } = response.data;
      console.log('Token:', token);

      // Decodificar el token para obtener los datos
      const decodedToken = jwtDecode(token);
      console.log('Token decodificado:', decodedToken);

      // se extraen el id_usuario, nombre, correo, rol y otros datos del token decodificado
      const user = {
        email,
        token,
        id_usuario: decodedToken.id_usuario,
        rol: decodedToken.rol,
        nombre: decodedToken.nombre,
        direccion: decodedToken.direccion,
        telefono: decodedToken.telefono,
      };

      // Establecer el usuario en el estado del contexto
      setUser(user);

      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir a la ruta adecuada según el rol
      navigate(user.rol === 'cliente' ? '/profile-client' : '/profile-admin');
    } catch (error) {
      alert('Credenciales incorrectas');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');  // Eliminar el usuario del localStorage
    if (clearCart) clearCart();  // limpiar mis pedidos
    navigate('/login');  // Redirigir al login
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
