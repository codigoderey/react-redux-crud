import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

// actions de redux
import { crearNuevoProductoAction } from "../actions/productoActions";

const NuevoProducto = ({ history }) => {
  // state del componente
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  // utilizar usedispatch te regresa una funcion
  const dispatch = useDispatch();

  // acceder el state del store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  // llamado el action de productoaction
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto));

  // cuando el usuario haga submnit
  const submitNuevoProdcuto = (e) => {
    e.preventDefault();
    // validar formulario
    if (nombre.trim() === "" || precio <= 0) {
      return Swal.fire(
        "Error",
        "Debes incluir un nombre y precio mayor que 0",
        "error"
      );
    }

    // si no hay errores
    // crear nuevo producto
    agregarProducto({
      nombre,
      precio,
    });

    // redireccionar hacia los productos
    history.push("/");
  };
  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center my-2 font-weight-bold">
              Agregar Producto
            </h2>{" "}
            <form onSubmit={submitNuevoProdcuto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control"
                  placeholder="Nombre producto"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control"
                  placeholder="Precio producto"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? <p class="alert alert-danger p-2">Hubo un error</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
