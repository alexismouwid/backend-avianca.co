const express = require('express');
const Reserva = require('../models/reserva');
const router = express.Router();
const VueloIda = require('../models/vueloIda');
const VueloRegreso = require('../models/vueloRegreso');

//Guardar una reserva
router.post('/', async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.status(201).json(reserva);
  }catch(e){
    res.status(400).json({ error: e.message });
  }
});

//Obtener todas las reservas
 

router.get('/', async (req, res) => {
  try{
     const reservas = await Reserva.find();
    res.json(reservas);
  }catch(e) {
    res.status(400).json({ error: e.message });
  }
});

router.post('/disponibles', async (req, res) => {
  try {
    const { origen, destino, fechaIda } = req.body;

    // Normaliza la fecha (asegúrate que sea un Date válido)
    const fechaInicio = new Date(fechaIda);
    const fechaFin = new Date(fechaIda);
    fechaFin.setDate(fechaFin.getDate() + 1);

    const vuelosIda = await VueloIda.find({
      origen,
      destino,
      fechaIda: {
        $gte: fechaInicio,
        $lt: fechaFin
      },
      $expr: { $lt: ["$ocupados", "$numeroAsientos"] }
    });

    res.status(200).json({ ida: vuelosIda, vuelta: [] });
  } catch (error) {
    console.error("Error buscando vuelos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;


