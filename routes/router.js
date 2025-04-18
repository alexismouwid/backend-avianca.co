const express = require('express');
const router = express.Router();
const Vuelo = require('../models/Vuelo');
const VueloConEscala = require('../models/VueloConEscala');
 
router.post('/buscar-vuelos', async (req, res) => {
  try {
    const { origen, destino, fechaIda, fechaRegreso } = req.body;

    if (!origen || !destino || !fechaIda) {
      return res.status(400).json({ error: "Faltan parámetros requeridos: origen, destino o fechaIda" });
    }

    // 🔍 Búsqueda vuelos de ida
    const fechaInicioIda = new Date(fechaIda);
    fechaInicioIda.setHours(0, 0, 0, 0);
    const fechaFinIda = new Date(fechaIda);
    fechaFinIda.setHours(23, 59, 59, 999);

    const vuelosIdaDirectos = await Vuelo.find({
      origen,
      destino,
      fechaIda: { $gte: fechaInicioIda, $lte: fechaFinIda }
    });

    const vuelosIdaConEscala = await VueloConEscala.find({
      origen,
      destino,
      fecha: { $gte: fechaInicioIda, $lte: fechaFinIda }
    });

    let vuelosRegresoDirectos = [];
    let vuelosRegresoConEscala = [];

    // 🔁 Búsqueda vuelos de regreso si aplica
    if (fechaRegreso) {
      const fechaInicioRegreso = new Date(fechaRegreso);
      fechaInicioRegreso.setHours(0, 0, 0, 0);
      const fechaFinRegreso = new Date(fechaRegreso);
      fechaFinRegreso.setHours(23, 59, 59, 999);

      vuelosRegresoDirectos = await Vuelo.find({
        origen: destino,      // Invertido
        destino: origen,      // Invertido
        fechaIda: { $gte: fechaInicioRegreso, $lte: fechaFinRegreso }
      });

      vuelosRegresoConEscala = await VueloConEscala.find({
        origen: destino,      // Invertido
        destino: origen,      // Invertido
        fecha: { $gte: fechaInicioRegreso, $lte: fechaFinRegreso }
      });
    }

    res.status(200).json({
      ida: {
        directos: vuelosIdaDirectos,
        conEscala: vuelosIdaConEscala,
      },
      regreso: {
        directos: vuelosRegresoDirectos,
        conEscala: vuelosRegresoConEscala,
      }
    });
  } catch (error) {
    console.error('❌ Error al buscar vuelos:', error);
    res.status(500).json({ error: 'Error interno al buscar vuelos' });
  }
});

module.exports = router;


