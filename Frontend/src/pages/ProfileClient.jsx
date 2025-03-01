import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfileClient = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  

  if (loading) {
    return <div>Cargando...</div>; 
  }

  if (!user) {
    return <div>Por favor, inicia sesión para ver tu perfil.</div>; // Si no hay usuario, solicita iniciar sesión
  }

  // Función para manejar la edición del perfil
  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="container mt-5">
      <h2>Perfil de Cliente</h2>
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
    </div>
  );
};

export default ProfileClient;
