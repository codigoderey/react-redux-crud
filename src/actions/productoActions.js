// importar los types
import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDITAR_PRODUCTO,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR,
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

/**FUNCION PARA AGREGAR PRODUCTOS */
// crear nuevos productos
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());
    try {
      // insertar en la api
      await clienteAxios.post("/productos", producto);

      // actualizar el state
      dispatch(agregarProductoExito(producto));

      // alerta
      Swal.fire("Correcto", "El producto se agregó correctmente", "success");
    } catch (error) {
      console.log(error.message);
      dispatch(agregarProductoError(true));
      // alerta
      Swal.fire("Error", "No se pudo añadir, inténtalo de nuevo", "error");
    }
  };
}

// agregar el producto
const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

// si se guarda en la base de datos
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

// si hubo un error
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

/**FUNCION QUE DESCARGA PRODUCTOS DE LA BASE DE DATOS */
// crear nuevos productos
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(descargaProductosExitosa(respuesta.data));
    } catch (error) {
      console.log(error.message);
      dispatch(descargarProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargaProductosExitosa = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargarProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: true,
});

/**FUNCION QUE ELIMINA LOS PRODUCTOS */
export function borrarProdcutoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProdcutoEliminar(id));
    console.log(id);

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
    } catch (error) {
      console.log(error.message);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProdcutoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

/**FUNCION QUE EDITA LOS PRODUCTOS */
export function editarProdcutoAction(producto) {
  return (dispatch) => {
    dispatch(obtenerProdcutoEditar(producto));
  };
}

const obtenerProdcutoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

/**EDITAR REGISTRO EN EL STATE Y EN LA API */
export function editarProductoNow(producto) {
  return async (dispatch) => {
    dispatch(editarProducto());

    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(producto));
    } catch (error) {
      console.log(error.message);
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDITAR_PRODUCTO,
});

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto,
});
