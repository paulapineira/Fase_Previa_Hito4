/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Asegúrate de tener configurado tu archivo de API

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario almacenado en localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'))
    console.log('Usuario almacenado:', storedUser)
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log('Enviando solicitud de login...')
      const response = await api.post('/usuarios/login', { 
        correo: email, 
        contraseña: password 
      })
      console.log('Respuesta de la API:', response.data)
      if (response.status !== 200) {
        throw new Error('Error en la respuesta de la API');
      }
      const { token, id_usuario, rol } = response.data
      console.log('ID de usuario:', id_usuario)
  
      const user = { email, token, id_usuario, rol }
      setUser(user);  // Establece el usuario en el estado del contexto
      localStorage.setItem('user', JSON.stringify(user))
  
      // Redirigir según el rol
      navigate(rol === 'cliente' ? '/profile-client' : '/profile-admin');
    } catch (error) {
      alert('Credenciales incorrectas');
      console.error('Error al iniciar sesión:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Eliminar el usuario del localStorage al hacer logout
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
