import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

// redux
import { useDispatch } from "react-redux";
import {
  borrarProdcutoAction,
  editarProdcutoAction,
} from "../actions/productoActions";

const Producto = ({ productos }) => {
  const dispatch = useDispatch();
  const history = useHistory(); // habilitar history para redireccion

  // confirmar si desea eliminarlo
  const confirmarEliminarProducto = (id) => {
    // preguntar al usuario

    // pasarlo al action
    Swal.fire({
      title: "Estás seguro?",
      text: "Luego no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Eliminado",
          "El archivo se ha eliminado exitosamente",
          "success"
        );
        dispatch(borrarProdcutoAction(id));
      }
    });
  };

  // funcion que redirige de forma programada
  const redireccionarEdicion = (producto) => {
    dispatch(editarProdcutoAction(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <Fragment>
      {productos.length === 0 ? (
        <tr>
          <th>No hay productos, añade uno nuevo</th>
        </tr>
      ) : (
        productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.nombre}</td>
            <td>
              <span className="font-weight-bold">${producto.precio}</span>
            </td>
            <td className="acciones">
              <button
                type="button"
                onClick={() => redireccionarEdicion(producto)}
                className="btn btn-primary mr-2"
              >
                Editar
              </button>
              <button
                type="button"
                to={`/productos/editar/${producto.id}`}
                className="btn btn-danger mr-2"
                onClick={() => confirmarEliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))
      )}
    </Fragment>
  );
};

export default Producto;
