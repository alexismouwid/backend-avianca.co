const mongoose = require('mongoose');

const vueloSchema = new mongoose.Schema({
  idVuelo: {
    type: String,
    required: true,
  },
  origen: {
    type: String,
    required: true,
  },
  destino: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  horaDespegue: {
    type: String,
    required: true,
  },
  horaLlegada: {
    type: String,
    required: true,
  },
  duracion: {
    type: String,
    required: true,
  },
  precioCOP: {
    type: Number,
    required: true,
  },
  aerolinea: {
    type: String,
    required: true,
  },
  asientosDisponibles: {
    type: Number,
    required: true,
  },
  tramos: [{
    idVuelo: {
      type: String,
      required: true,
    },
    origen: {
      type: String,
      required: true,
    },
    escala: {
      type: String,
    },
    destino: {
      type: String,
    },
    duracion: {
      type: String,
      required: true,
    },
  }],
  modeloAvion: {
    type: String,
    required: true,
  },
});

const VueloConEscala = mongoose.model('VueloConEscala', vueloSchema);
module.exports = VueloConEscala;

