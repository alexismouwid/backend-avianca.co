const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  origen: { type: String, required: true, trim: true },
  destino: { type: String, required: true, trim: true },
  fechaIda: { type: Date, required: true },
  fechaRegreso: { 
    type: Date, 
    validate: {
      validator: function(value) {
        return !this.tipoVuelo || this.tipoVuelo === 'ida' || value >= this.fechaIda;
      },
      message: 'La fecha de regreso debe ser posterior a la fecha de ida.'
    },
    default: null
  },
  cantidadPersonas: { 
    type: Number, 
    required: true, 
    min: [1, 'Debe haber al menos 1 persona en la reserva.'] 
  },
  tipoVuelo: { 
    type: String, 
    enum: ['ida', 'ida y vuelta'], 
    required: true 
  }
});

module.exports = mongoose.model('Reserva', reservaSchema);

