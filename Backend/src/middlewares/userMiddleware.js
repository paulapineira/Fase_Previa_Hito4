const jwt = require('jsonwebtoken');

// Middleware para verificar que los datos del usuario sean válidos
const validateUserData = (req, res, next) => {
    const { nombre, correo, contraseña, direccion, telefono, rol } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !correo || !contraseña || !direccion || !telefono) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validación del formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ message: 'Correo electrónico inválido' });
    }

    // Validación de la contraseña (mínimo 6 caracteres)
    if (contraseña.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    // Si el rol no está definido, asignamos "cliente" por defecto
    const validRole = rol || 'cliente'; 

    req.body.rol = validRole; // Asignamos el rol (cliente si no se proporcionó)

    next();
};

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Guardamos el usuario decodificado en `req.user`
      next();
    } catch (error) {
      res.status(400).json({ message: 'Token inválido o expirado.' });
    }
};

module.exports = {
    validateUserData,
    verifyToken
};
