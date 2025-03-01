import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner'; 
import './Home.css';
import { useEffect, useState } from 'react';
import api from '../services/api'

const Home = () => {
  const { addToCart } = useCart();
  const [productsData, setProductsData] = useState([])

  useEffect(() => {
    api.get("/productos")
      .then((response) => {
        const products = response.data;
          // Verifica si hay productos duplicados por producto_id
        const ids = products.map(product => product.id_producto);
        const hasDuplicates = new Set(ids).size !== ids.length;
        if (hasDuplicates) {
          console.warn("Hay duplicados en los producto_id");
        }
  
        setProductsData(products);
      })
      .catch(error => console.error("Error al cargar productos:", error));
  }, [])  

  return (
    <div className="home-container">
      <Banner /> 
      <div className="container product-section">
        <h1 className="text-center">Bienvenido a Lentes AP!</h1>
        <p className="text-center">Explora nuestros lentes y rockea tu verano.</p>
        
        <div className="row">
          {productsData.map((product) => (
            <div key={product.id_producto} className="col-12 col-md-4 mb-4">
              <ProductCard
                id={product.id_producto}       
                name={product.nombre}
                description={product.descripcion}  
                price={product.precio}
                image={product.imagen}    
                onAddToCart={() => addToCart(product)} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
