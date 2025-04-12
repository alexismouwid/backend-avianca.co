const mongoose = require('mongoose');
const VueloIda = require('./models/vueloIda'); // Ajustá si usás otra ruta

mongoose.connect('mongodb+srv://alexisdev23:a81c784b@cluster0.dda7e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  try {
    const vuelos = await VueloIda.find();

    for (const vuelo of vuelos) {
      if (typeof vuelo.fechaIda === 'string') {
        vuelo.fechaIda = new Date(vuelo.fechaIda);
        // Agregá este campo si no existe
        if (typeof vuelo.ocupados !== 'number') {
          vuelo.ocupados = 0;
        }
        await vuelo.save();
      }
    }

    console.log("✅ Fechas convertidas a tipo Date correctamente");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();

