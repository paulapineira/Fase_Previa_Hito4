Requerimientos
 1. Crear un nuevo proyecto de npm e instalar todas las dependencias que necesitarás.
 2. Utilizar el paquete pg para gestionar la comunicación con la base de datos PostgreSQL.
 3. Implementar la autenticación y autorización de usuarios con JWT.
 4. Usar el paquete CORS para permitir las consultas de orígenes cruzados.
 5. Utilizar middlewares para validar las credenciales o token en cabeceras en las rutas que aplique.
 6. Realizar test de por lo menos 4 rutas de la API REST comprobando los códigos de estados de diferentes escenarios

Para leventar Backend:

Instalar dependencias con npm install
Levantar servidor con node index.js

Para conección con Postgresql:
.env:

PG_USER = postgres
PG_HOST = localhost
PG_DATABASE = lentes
PG_PASSWORD = postgres
PG_PORT = 5432
PORT=3000
JWT_SECRET=secreto

Pruebas para usuarios:
Para crear usuario cliente:
POST http://localhost:3000/usuarios/register

con la siguiente estructura:
{
  "nombre": "Ana Pérez",
  "correo": "anaperez@example.com",
  "contraseña": "pass1234",
  "direccion": "Calle Loto 23",
  "telefono": "1234560000",
  "rol": "cliente"
}

Respuesta:
{
  "id_usuario": 10,
  "nombre": "Ana Pérez",
  "correo": "anaperez@example.com",
  "contraseña": "$2b$10$gt.mWY3W2l3IQfUb88.KnOvLNo4vpHhEz2sD/mWWBYz4anKFXR9cm",
  "direccion": "Calle Loto 23",
  "telefono": "1234560000",
  "rol": "cliente"
}

Para crear usuario administrador:
POST http://localhost:3000/usuarios/register

con la siguientes estructura:
{
  "nombre": "Ana Luz",
  "correo": "analuz@example.com",
  "contraseña": "admin456",
  "direccion": "Calle Admin 13",
  "telefono": "980000210",
  "rol": "administrador"
}

Respuesta:
{
  "message": "Usuario creado exitosamente",
  "user": {
    "id_usuario": 11,
    "nombre": "Ana Luz",
    "correo": "analuz@example.com",
    "contraseña": "$2b$10$IM1C8wwLp/vogIdA8Tuy3uaJ/7ySPszXlRGOZZdS6uyJeGb0SoA7q",
    "direccion": "Calle Admin 13",
    "telefono": "980000210",
    "rol": "administrador"
  }
}

Solicitud POST para obtener el token de cliente (Login)
POST http://localhost:3000/usuarios/login

Body: cliente
{
    "correo": "luisarojas@example.com",
    "contraseña": "pass456"
}

Respuesta:
{
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxMiwiY29ycmVvIjoibHVpc2Fyb2phc0BleGFtcGxlLmNvbSIsInJvbCI6ImNsaWVudGUiLCJpYXQiOjE3NDAzMzg0NzgsImV4cCI6MTc0MDM0MjA3OH0.2rJqiQ0bupHzlDkWV3T-G1htC9w2s2sDjDr2qkHH3UM"
}

Solicitud POST para obtener el token de administrador (Login)
POST http://localhost:3000/usuarios/login

Body: administrador
{
  "correo": "analuz@example.com",
  "contraseña": "admin456"
}

Respuesta:
{
  "message": "Autenticación exitosa",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c3VhcmlvIjoxMSwiY29ycmVvIjoiYW5hbHV6QGV4YW1wbGUuY29tIiwicm9sIjoiYWRtaW5pc3RyYWRvciIsImlhdCI6MTc0MDAxNjc5NywiZXhwIjoxNzQwMDIwMzk3fQ.8Imewpb3jcxvsIr2qnjv_P0rPfQ1l0YBcxaBCU2efjY"
}

Eliminar un usuario si no eres admin: DELETE
http://localhost:3000/usuarios/2

headers: 

Authorization

Bearer <token_cliente>

como es cliente, respuesta:
{
  "message": "Acceso denegado. Se requiere ser administrador."
}

Pruebas para productos:
Agregar Lente: POST
http://localhost:3000/productos

Body:
{
  "nombre": "Nuevo Producto",
  "descripcion": "Descripción del producto",
  "precio": 100,
  "stock": 20,
  "id_categoria": 1,
  "imagen": "producto_imagen.jpg",
  "habilitado": true
}

Repuesta:
{
  "product": {
    "id_producto": 123,
    "nombre": "Nuevo Producto",
    "descripcion": "Descripción del producto",
    "precio": 100,
    "stock": 20,
    "id_categoria": 1,
    "imagen": "producto_imagen.jpg",
    "habilitado": true
  },
  "message": "Producto creado"
}

Modificar Lente: PUT
http://localhost:3000/productos/7

Body:
{
    "nombre": "Lente de prueba",
    "descripcion": "Descripción del lente de prueba",
    "precio": 3500,
    "stock": 50,
    "id_categoria": 2,
    "imagen": "url_imagen.png",
    "habilitado": false
}

Respuesta:
{
  "product": {
    "id_producto": 7,
    "nombre": "Lente de prueba",
    "descripcion": "Descripción del lente de prueba",
    "precio": "3500.00",
    "stock": 50,
    "id_categoria": 2,
    "imagen": "url_imagen.png",
    "habilitado": false
  },
  "message": "Producto actualizado"
}

Eliminar lente: DELETE
http://localhost:3000/productos/7

Respuesta:
{
  "product": {
    "id_producto": 7,
    "nombre": "Lente de prueba",
    "descripcion": "Descripción del lente de prueba",
    "precio": "3500.00",
    "stock": 50,
    "id_categoria": 2,
    "imagen": "url_imagen.png",
    "habilitado": false
  },
  "message": "Producto eliminado exitosamente"
}

Pruebas para pedidos:
Crear pedido:POST
http://localhost:3000/pedidos

Body:
{
  "id_usuario": 1,
  "direccion_envio": "Av. Siempre Viva 742",
  "estado": "pendiente"
}

Respuesta:
{
  "message": "Pedido creado exitosamente",
  "pedido": {
    "id_pedido": 1,
    "id_usuario": 1,
    "fecha_pedido": "2025-02-20T02:31:45.198Z",
    "estado": "pendiente",
    "direccion_envio": "Av. Siempre Viva 742"
  }
}

{
  "message": "Pedido creado exitosamente",
  "pedido": {
    "id_pedido": 3,
    "id_usuario": 5,
    "fecha_pedido": "2025-02-20T19:26:38.695Z",
    "estado": "pendiente",
    "direccion_envio": "Av. Siempre Viva 742"
  }
}

Obtener pedido: GET
http://localhost:3000/pedidos/1

resp:
{
  "id_pedido": 1,
  "id_usuario": 1,
  "fecha_pedido": "2025-02-20T02:31:45.198Z",
  "estado": "pendiente",
  "direccion_envio": "Av. Siempre Viva 742"
}

Actualizar un pedido: PUT
http://localhost:3000/pedidos/3

Body:
{
  "estado": "enviando",
  "direccion_envio": "Calle Nueva 13"
}

Respuesta:
{
  "message": "Pedido actualizado",
  "pedido": {
    "id_pedido": 3,
    "id_usuario": 5,
    "fecha_pedido": "2025-02-20T19:26:38.695Z",
    "estado": "enviando",
    "direccion_envio": "Calle Nueva 13"
  }
}

Tests:
![image](https://github.com/user-attachments/assets/c553adaf-cc56-4d3b-8e02-bd9c23852519)


