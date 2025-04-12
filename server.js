const express = require('express');
const dotenv = require('dotenv');
const reservasRouter = require('./routes/reservasRouter');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config();
const app = express();

// 🛠️ Middleware de logging
app.use((req, res, next) => {
  console.log(`Ruta recibida: ${req.method} ${req.url}`);
  next();
});

// CORS
app.use(cors({
  origin: [ "http://localhost:5173", 'https://avianca-co-fn142.vercel.app'  ], 
  credentials: true
}));

// JSON body parser
app.use(express.json());

// Rutas
app.use('/reservas', reservasRouter);

// Base de datos
const PORT = process.env.PORT || 5000;
const databaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(databaseUrl)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡El servidor funciona!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

