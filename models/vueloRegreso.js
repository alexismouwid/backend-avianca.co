// models/VueloRegreso.js
const mongoose = require('mongoose');

const vueloRegresoSchema = new mongoose.Schema({
  idVuelo: String,
  origen: String,
  destino: String,
  fechaIda: { type: Date, required: true },         // Puede llamarse igual, si aplica
  fechaRegreso: { type: Date, required: true },
  horaDespegue: String,
  tiempoVuelo: String,
  aerolinea: String,
  modeloAvion: String,
  numeroAsientos: Number,
  ocupados: { type: Number, default: 0 },
  precioCOP: Number,
});

module.exports = mongoose.model('VueloRegreso', vueloRegresoSchema);

