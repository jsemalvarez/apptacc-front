import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const { REACT_APP_BASE_URL } = process.env;

const FormCreateProduct = () => {
  const initProduct = {
    comercioId: "",
    producName: "",
    producDesc: "",
    productCategory: "",
    productRating: "1",
    productCost: "",
    productImg: "",
  };
  const [product, setProduct] = useState(initProduct);
  const [isSending, setIsSending] = useState(false);
  const [comercios, setComercios] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const getComercios = async () => {
    try {
      const response = await fetch(
        `${REACT_APP_BASE_URL}/comercios?lat=-37.99046981482626&long=-57.558342038624005`
      );
      const data = await response.json();
      setComercios(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategorias = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/categorias/producto`);
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorias();
    getComercios();
  }, []);

  const onChangeInput = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async () => {
    try {
      setIsSending(true);

      const comercioId = product.comercioId || comercios[0].id;
      const data = {
        nombre: product.producName,
        descripcion: product.producDesc,
        precio: product.productCost,
        categoria: product.productCategory || categorias[0],
        rating: product.productRating,
        imagen: product.productImg,
      };

      const config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      };

      await fetch(
        `${REACT_APP_BASE_URL}/comercios/${comercioId}/productos`,
        config
      );

      setIsSending(false);
      setProduct({ ...initProduct });
      Swal.fire({
        icon: "success",
        title: "El producto se creo con exito",
      });
    } catch (error) {
      console.log(error);
      setIsSending(false);
      Swal.fire("Oops...", "Algo salio mal", "error");
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-3"></div>
        <div className="col-6 py-4">
          <div className="mb-3">
            <label className="form-label">Comercio</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="comercioId"
              value={product.comercioId}
              onChange={onChangeInput}
            >
              {comercios.map(({ id, nombre }) => {
                return (
                  <option value={id} key={id + nombre}>
                    {nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="producName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="producName"
              name="producName"
              value={product.producName}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              placeholder="Descripcion del producto"
              id="floatingTextarea"
              name="producDesc"
              value={product.producDesc}
              onChange={onChangeInput}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Categoria</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="productCategory"
              value={product.productCategory}
              onChange={onChangeInput}
            >
              {categorias.map((categoria) => {
                return (
                  <option value={categoria} key={categoria}>
                    {categoria}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="productRating" className="form-label">
              Rating
            </label>
            <input
              type="range"
              className="form-range"
              step="1"
              min="1"
              max="5"
              id="productRating"
              name="productRating"
              value={product.productRating}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="productCost" className="form-label">
              Precio
            </label>
            <input
              type="number"
              className="form-control"
              id="productCost"
              name="productCost"
              value={product.productCost}
              onChange={onChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImg" className="form-label">
              Url de la imagen
            </label>
            <input
              type="text"
              className="form-control"
              id="productImg"
              name="productImg"
              value={product.productImg}
              onChange={onChangeInput}
            />
          </div>

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-block btn-primary"
              onClick={saveProduct}
              disabled={isSending}
            >
              {isSending ? "C r e a n d o . . ." : "Crear Producto"}
            </button>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default FormCreateProduct;
