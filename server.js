const express = require('express');
const dotenv = require('dotenv');
const reservasRouter = require('./routes/reservasRouter');
const mongoose = require('mongoose');
const cors = require('cors');




dotenv.config();
const app = express ();

app.use(cors());
app.use(express.json()); //para manejar json
app.use('/reservas', reservasRouter);

const PORT = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(databaseUrl) // Cambia "tudatabase" por el nombre de tu base de datos
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

app.get('/', (req, res) => {
  res.send('¡El servidor funciona!');
});
app.use((req, res, next) => {
  console.log(`Ruta recibida: ${req.method} ${req.url}`); // Verifica si las rutas llegan al servidor
  next();
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
})


