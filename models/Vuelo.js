const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
  idVuelo: { type: String, required: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  fechaIda: { type: Date, required: true },
  fechaRegreso: { type: Date, default: null },
  horaDespegue: { type: String, required: true },
  horaLlegada: { type: String, required: true },
  tiempoVuelo: { type: String, required: true },
  aerolinea: { type: String, required: true },
  modeloAvion: { type: String, required: true },
  numeroAsientos: { type: Number, required: true },
  precioCOP: { type: Number, required: true }
});

const Vuelo = mongoose.model('Vuelo', vueloSchema);

module.exports = Vuelo;


