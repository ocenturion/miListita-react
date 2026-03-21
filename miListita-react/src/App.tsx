import { useState, useEffect } from "react";
import "./App.css";

interface Articulo {
  detalle: string;
  cantidad: number;
  precio: number;
}

function App() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [nuevoArticulo, setNuevoArticulo] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  const AgregarArticulo = () => {
    if (nuevoArticulo.trim() === "") return;

    const nuevo: Articulo = {
      detalle: nuevoArticulo,
      cantidad,
      precio,
    };
    setArticulos([...articulos, nuevo]);
    setNuevoArticulo("");
  };

  const total = articulos.reduce((acumulador, articulo) => {
    return acumulador + articulo.cantidad * articulo.precio;
  }, 0);

  useEffect(() => {
    // console.log(`Articulos actualizados: ${articulos}`);
  }, [articulos]);

  return (
    <div className="container">
      <label htmlFor="">Articulo:</label>
      <input
        type="text"
        value={nuevoArticulo}
        placeholder="Articulo"
        onChange={(e) => {
          setNuevoArticulo(e.target.value);
        }}
      />
      <label htmlFor="">Precio:</label>
      <input
        type="number"
        value={precio}
        placeholder="Precio"
        onChange={(e) => setPrecio(Number(e.target.value))}
      />
      <label htmlFor="">Cantidad:</label>
      <input
        type="number"
        value={cantidad}
        placeholder="Cantidad"
        onChange={(e) => setCantidad(Number(e.target.value))}
      />
      <button onClick={AgregarArticulo}>Agregar</button>

      <table>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {articulos.map((articulo, index) => (
            <tr key={index}>
              <td>
                <p>{articulo.detalle}</p>
                <p>{articulo.cantidad} x {articulo.precio}</p>
              </td>
              <td>${articulo.cantidad * articulo.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total: ${total}</h3>
    </div>
  );
}

export default App;
