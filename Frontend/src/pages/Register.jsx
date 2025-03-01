import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import api from '../services/api';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificación de contraseñas
    if (contraseña !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Verificación de longitud de la contraseña
    if (contraseña.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);  // Habilitar el estado de carga mientras se hace la solicitud

    try {
      // Llamada a la API para registrar al usuario
      const response = await api.post('/usuarios/register', {
        nombre,
        correo: correo,
        contraseña: contraseña,
        direccion,
        telefono
      });

      if (response.status === 201) {
        // Si el registro fue exitoso, redirigir al login
        alert('Registro exitoso. Por favor, inicia sesión.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al registrar', error);
      // Manejo de errores específicos del backend (como correo ya registrado)
      if (error.response && error.response.data) {
        alert(error.response.data.error || 'Hubo un error al registrarte. Intenta nuevamente.');
      } else {
        alert('Hubo un error al registrarte. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);  // Deshabilitar el estado de carga después de la solicitud
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Registrarse</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección:</label>
            <input
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-register" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
