import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Producto from "./Producto";

// actions de redux
import { obtenerProductosAction } from "../actions/productoActions";

const Productos = () => {
  const productos = useSelector((state) => state.productos.productos);
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  // utilizar usedispatch te regresa una funcion
  const dispatch = useDispatch();

  useEffect(() => {
    // consultar api
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, [dispatch]);

  // obtener el state

  return (
    <Fragment>
      {cargando ? <p className="text-center mt-5">Cargando...</p> : null}
      {error ? (
        <p className="font-weight-bold alert alert-danger text-center mt-5">
          Hubo un error, inténte de nuevo ...
        </p>
      ) : null}
      <h1 className="text-center my-5">Listado de productos</h1>
      <table className="table table-stripes">
        <thead className="bg-primary table-dark">
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <Producto productos={productos} />
        </tbody>
      </table>
    </Fragment>
  );
};

export default Productos;
