import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const { REACT_APP_BASE_URL } = process.env;

function FormCreateStore() {
  const initShop = {
    shopName: "",
    shopPhone: "",
    shopHours: "",
    shopAdress: "",
    shopCity: "",
    shopLat: "",
    shopLong: "",
    shopCategory: [],
    shopWeb: "",
    shopFacebook: "",
    shopInstagram: "",
    shopRating: "1",
    shopCost: "1",
    shopImg: "",
    checkVeganos: "no",
    checkDiabeticos: "no",
  };
  const [shop, setShop] = useState(initShop);
  const [isSending, setIsSending] = useState(false);
  const [categorias, setCategorias] = useState([]);

  const getCategorias = async () => {
    try {
      const response = await fetch(`${REACT_APP_BASE_URL}/categorias/comercio`);
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const onChangeInput = (e) => {
    setShop({
      ...shop,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeSelectCategory = (e) => {
    let categories = [...shop.shopCategory];
    if (categories.find((category) => category == e.target.value)) {
      categories = categories.filter((category) => category != e.target.value);
    } else {
      categories.push(e.target.value);
    }
    setShop({
      ...shop,
      shopCategory: [...categories],
    });
  };

  const onCheckVeganosChanged = (e) => {
    setShop({
      ...shop,
      checkVeganos: e.target.value,
    });
  };

  const onCheckDiabeticosChanged = (e) => {
    setShop({
      ...shop,
      checkDiabeticos: e.target.value,
    });
  };

  const saveShop = async () => {
    try {
      setIsSending(true);

      const categories =
        shop.shopCategory.length > 0 ? shop.shopCategory : [categorias[0]];

      const data = {
        nombre: shop.shopName,
        categorias: categories, //["ParaLlevar"],
        localidad: shop.shopCity || "MarDelPlata",
        direccion: shop.shopAdress,
        latitud: shop.shopLat,
        longitud: shop.shopLong,
        telefono: shop.shopPhone,
        horario: shop.shopHours,
        estrellas: shop.shopRating,
        URL: shop.shopWeb,
        facebookURL: shop.shopFacebook,
        instagramURL: shop.shopInstagram,
        ratingPrecios: shop.shopCost,
        imagenURL: shop.shopImg,
        productosDiabeticos: shop.checkDiabeticos == "si" ? true : false,
        productosVeganos: shop.checkVeganos == "si" ? true : false,
      };

      const config = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      };

      await fetch(`${REACT_APP_BASE_URL}/comercios`, config);

      setIsSending(false);
      setShop({ ...initShop });
      Swal.fire({
        icon: "success",
        title: "El comercio se creo con exito",
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
            <label htmlFor="shopName" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="shopName"
              name="shopName"
              value={shop.shopName}
              onChange={onChangeInput}
            />
          </div>

          <hr className="border border-primary border-1 opacity-50"></hr>

          <div className="mb-3">
            <label htmlFor="shopPhone" className="form-label">
              Telefono
            </label>
            <input
              type="text"
              className="form-control"
              id="shopPhone"
              name="shopPhone"
              value={shop.shopPhone}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shopHours" className="form-label">
              Horario
            </label>
            <input
              type="text"
              className="form-control"
              id="shopHours"
              name="shopHours"
              value={shop.shopHours}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shopAdress" className="form-label">
              Direccion
            </label>
            <input
              type="text"
              className="form-control"
              id="shopAdress"
              name="shopAdress"
              value={shop.shopAdress}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Localidad</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="shopCity"
              value={shop.shopCity}
              onChange={onChangeInput}
            >
              <option value="MarDelPlata">Mar del Plata</option>
              <option value="Batan">Batan</option>
              <option value="Chapadmalal">Chapadmalal</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="shopLat" className="form-label">
              Latitud
            </label>
            <input
              type="number"
              className="form-control"
              id="shopLat"
              name="shopLat"
              value={shop.shopLat}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shopLong" className="form-label">
              Longitud
            </label>
            <input
              type="number"
              className="form-control"
              id="shopLong"
              name="shopLong"
              value={shop.shopLong}
              onChange={onChangeInput}
            />
          </div>

          <hr className="border border-primary border-1 opacity-50"></hr>

          <div className="mb-3">
            <label className="form-label">Categoria</label>
            <select
              className="form-select"
              aria-label="Default select example"
              multiple
              name="shopCategory"
              value={shop.shopCategory}
              onChange={(e) => onChangeSelectCategory(e)}
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

          <hr className="border border-primary border-1 opacity-50"></hr>

          <div className="mb-3">
            <label htmlFor="shopWeb" className="form-label">
              Web
            </label>
            <input
              type="text"
              className="form-control"
              id="shopWeb"
              name="shopWeb"
              value={shop.shopWeb}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shopFacebook" className="form-label">
              Facebook
            </label>
            <input
              type="text"
              className="form-control"
              id="shopFacebook"
              name="shopFacebook"
              value={shop.shopFacebook}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shopLong" className="form-label">
              Instagram
            </label>
            <input
              type="text"
              className="form-control"
              id="shopInstagram"
              name="shopInstagram"
              value={shop.shopInstagram}
              onChange={onChangeInput}
            />
          </div>

          <hr className="border border-primary border-1 opacity-50"></hr>

          <div className="mb-3">
            <label htmlFor="shopRating" className="form-label">
              Rating
            </label>
            <input
              type="range"
              className="form-range"
              step="1"
              min="1"
              max="5"
              id="shopRating"
              name="shopRating"
              value={shop.shopRating}
              onChange={onChangeInput}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="shopCost" className="form-label">
              Precio
            </label>
            <input
              type="range"
              className="form-range"
              step="1"
              min="1"
              max="3"
              id="shopCost"
              name="shopCost"
              value={shop.shopCost}
              onChange={onChangeInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="shopImg" className="form-label">
              Url de la imagen
            </label>
            <input
              type="text"
              className="form-control"
              id="shopImg"
              name="shopImg"
              value={shop.shopImg}
              onChange={onChangeInput}
            />
          </div>

          <hr className="border border-primary border-1 opacity-50"></hr>

          <div className="mb-3">
            <label className="form-label">
              Cuenta con productos para Veganos
            </label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="checkVeganosSi"
                value="si"
                checked={shop.checkVeganos == "si"}
                onChange={onCheckVeganosChanged}
              />
              <label className="form-check-label" htmlFor="checkVeganosSi">
                SI
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="checkVeganosNo"
                value="no"
                checked={shop.checkVeganos == "no"}
                onChange={onCheckVeganosChanged}
              />
              <label className="form-check-label" htmlFor="checkVeganosNo">
                NO
              </label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Cuenta con productos para Diabeticos
            </label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="checkDiabetiosSi"
                value="si"
                checked={shop.checkDiabeticos == "si"}
                onChange={onCheckDiabeticosChanged}
              />
              <label className="form-check-label" htmlFor="checkDiabetiosSi">
                SI
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="checkDiabetios"
                id="checkDiabetiosNo"
                value="no"
                checked={shop.checkDiabeticos == "no"}
                onChange={onCheckDiabeticosChanged}
              />
              <label className="form-check-label" htmlFor="checkDiabetiosNo">
                NO
              </label>
            </div>
          </div>

          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-block btn-primary"
              onClick={saveShop}
              disabled={isSending}
            >
              {isSending ? "C r e a n d o . . ." : "Crear Comercio"}
            </button>
          </div>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
}

export default FormCreateStore;
