const express = require('express');
const Reserva = require('../models/reserva');
const router = express.Router();

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

module.exports = router;


