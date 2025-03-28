const fs = require("fs");
const readline = require("readline");
const yargs = require("yargs");

const argv = yargs.option("file", {
  alias: "f",
  describe: "Nombre del archivo JSON donde se guardaran los productos",
  type: "string",
  demandOption: true,
  default: "productos.json",
}).argv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const preguntar = (pregunta) => {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => resolve(respuesta));
  });
};

const guardarProducto = async () => {
  try {
    const nombre = await preguntar("Ingrese el nombre del producto: ");
    const precio = parseFloat(await preguntar("Ingrese el precio: "));
    const cantidad = parseInt(await preguntar("Ingrese la cantidad: "));
    const nuevoProducto = { nombre, precio, cantidad };

    rl.close();

    const nombreArchivo = argv.file;

    let productos = [];

    if (fs.existsSync(nombreArchivo)) {
      const contenido = fs.readFileSync(nombreArchivo, "utf-8");
      productos = JSON.parse(contenido);
      console.log("--------------");
      console.log("Este archivo JSON ya existe: ", productos);
      console.log("--------------");
    }

    productos.push(nuevoProducto);

    fs.writeFileSync(nombreArchivo, JSON.stringify(productos, null, 2));

    console.log(`Se guardo el producto en ${nombreArchivo}`);

    readArchivo(nombreArchivo);
  } catch (err) {
    console.error("Error al guardar el producto:", err);
  }
};

const readArchivo = (nameArchivo) => {
  try {
    const contenido = fs.readFileSync(nameArchivo, "utf-8");
    const productosActuales = JSON.parse(contenido);

    console.log("--------------");
    console.log("\nContenido del archivo JSON:");
    console.log(JSON.stringify(productosActuales, null, 2));
  } catch (err) {
    console.log("Error al leer el archivo: ", err);
  }
};

guardarProducto();
