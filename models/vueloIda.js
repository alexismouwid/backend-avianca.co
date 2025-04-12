const mongoose = require('mongoose');

const vueloIdaSchema = new mongoose.Schema({
  idVuelo: String,
  origen: String,
  destino: String,
  fechaIda: { type: Date, required: true },         // 👈 tipo Date
  fechaRegreso: { type: Date, default: null },      // 👈 tipo Date
  horaDespegue: String,
  tiempoVuelo: String,
  aerolinea: String,
  modeloAvion: String,
  numeroAsientos: Number,
  ocupados: { type: Number, default: 0 },
  precioCOP: Number,
});

module.exports = mongoose.model('VueloIda', vueloIdaSchema);

