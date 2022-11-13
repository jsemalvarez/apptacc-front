import React from "react";
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import FormCreateProduct from "./formCreateProduct";
import FormCreateStore from "./formCreateShop";

export const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <nav className="navbar navbar-expand-sm bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              APPTACC
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Comercio
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/producto">
                    Producto
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route exat path="/" element={<FormCreateStore />} />
          <Route exat path="/producto" element={<FormCreateProduct />} />
          <Route path="*" element={<FormCreateStore />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
