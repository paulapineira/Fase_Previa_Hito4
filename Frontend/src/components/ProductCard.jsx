/* eslint-disable react/prop-types */
import { Link , useNavigate} from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import './ProductCard.css'; 

const ProductCard = ({ id, name, description, price, image, onAddToCart, showRemoveButton, onRemove, quantity }) => {
    const { user } = useAuth();  // Usamos el contexto para obtener el usuario autenticado
    const navigate = useNavigate();
  
  
    // Funcion para manejar el click en "Agregar" desde el home
    const handleAddToCart = () => {
      if (!user) {  // Verificamos si no hay un usuario logeado
        // Si no esta logeado, mostramos el mensaje y redirigimos a la pagina de login
        alert('Debes estar logeado para agregar productos al carrito');
        navigate('/login');  // Redirige a la pagina de login
      } else {
        // Si esta logeado, agregamos al carrito
        onAddToCart();
      }
    };
  return (
    <div className="card">
      <img src={image} alt={name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">${price}</p>
        {quantity && <p className="card-text">Cantidad: {quantity}</p>}
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={handleAddToCart}>Agregar 🛒</button>
          <Link to={`/product/${id}`} className="btn btn-secondary">
            Ver más
          </Link>
          {showRemoveButton && onRemove && (
            <button className="btn btn-danger" onClick={onRemove}>
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

