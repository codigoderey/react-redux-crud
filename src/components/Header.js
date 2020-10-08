import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <h1>
          <Link className="text-light" to={"/"}>
            CRUD - React, Redux, Rest API & Axios
          </Link>
        </h1>
      </div>

      <Link
        to="/productos/nuevo"
        className="btn btn-danger nuevo-post d-block d-md-inline-block"
      >
        Agregar Producto +
      </Link>
    </nav>
  );
};

export default Header;
