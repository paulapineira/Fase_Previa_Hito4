// /tests/server.spec.js

const request = require('supertest');
const app = require('../index')// Importamos el servidor desde index.js

describe('API de la tienda de lentes', () => {

  describe('GET /productos', () => {
    it('debería devolver estado 200 y un array de lentes', async () => {
        const res = await request(app).get('/productos');
        expect(res.status).toBe(200);  // Verificar que el código de estado es 200
        expect(Array.isArray(res.body)).toBe(true) // Verificamos que sea un array
    });

    it('debería devolver estado 404 si no hay productos', async () => {
      const res = await request(app).get('/productos');
      if (res.body.length === 0) {
        expect(res.status).toBe(404); // Si no hay productos, esperamos 404
      }
    });
  });

  describe('GET /productos/:id', () => {

    it('debería devolver estado 404 si el lente no existe', async () => {
      const lensId = 999; // Asumiendo que el lente con ID 999 no existe
      const res = await request(app).get(`/productos/${lensId}`);
      expect(res.status).toBe(404); // Verificamos que la respuesta sea 404
    });
  });

  describe('POST /productos', () => {

    it('debería devolver estado 400 si los datos son inválidos', async () => {
      const invalidLens = { name: '', color: 'Rojo' }; // Falta precio
      const res = await request(app).post('/productos').send(invalidLens);
      expect(res.status).toBe(400); // Verificamos que la respuesta sea 400 (Bad Request)
    });
  });

  describe('DELETE /productos/:id', () => {

    it('debería devolver estado 404 si el lente no existe', async () => {
      const lensId = 999; // Asumiendo que el lente con ID 999 no existe
      const res = await request(app).delete(`/productos/${lensId}`);
      expect(res.status).toBe(404); // Verificamos que la respuesta sea 404 (Not Found)
    });
  });

});
