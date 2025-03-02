const lentesQueries = {
    // Obtener todos los productos
    getLentes: "SELECT * FROM productos ", 

    // Obtener un producto por su ID
    getLenteById: "SELECT * FROM productos WHERE id_producto = $1", 

    // Insertar un nuevo producto
    addLente: `INSERT INTO productos (nombre, descripcion, precio, stock, imagen)
               VALUES ($1, $2, $3, $4, $5) 
               RETURNING *`, // Utilizamos RETURNING * para devolver el producto insertado
    
    // Actualizar un producto existente
    updateLente: `UPDATE productos 
                 SET nombre = $1, descripcion = $2, precio = $3, stock = $4, imagen = $5 
                 WHERE id_producto = $6  
                 RETURNING *`, // Usamos RETURNING * para devolver el producto actualizado

    // Eliminar un producto
    deleteLente: "DELETE FROM productos WHERE id_producto = $1 RETURNING *" // Devolvemos el producto eliminado
};

module.exports = lentesQueries;

