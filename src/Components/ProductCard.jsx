import React from "react";
import "./Style.css";
import noimage from "../Images/image.jpg";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { successToast, errorToast } from "../Redux/Actions/ToastActions";
import { openModal, closeModal } from "../Redux/Actions/LoginAction";
import { addToCart } from "../Redux/Actions/ProductActions";
import { connect } from "react-redux";
function ProductCard(props) {
  const {
    data: { name, offerprice, actualprice, Images, productCode },
  } = props;
  const redirectToProductPage = (productCode) => {
    props.history.push(`/product/${productCode}`);
  };
  const isLoggedIn = () => {
    const sidToken = window.localStorage.getItem("sid");
    return !(sidToken === null || sidToken === "" || sidToken === undefined);
  };
  return (
    <div>
      <div className="productCard">
        <img
          src={
            Images.length === 0
              ? noimage
              : Images[0].data === null
              ? noimage
              : `data:image/*;base64,${Images[0].data}`
          }
          alt={name}
          loading="lazy"
          className="cardImage pointer"
          onClick={() => redirectToProductPage(productCode)}
        />
        <div className="lowerCard hor">
          <div className="lowerCard_left">
            <div
              className="name pointer"
              onClick={() => redirectToProductPage(productCode)}
            >
              {name}
            </div>
            <div className="priceOffer">
              Price:&nbsp;
              <span>{offerprice}</span>
              {"  "}
              <strike>{actualprice}</strike>
              <span>
                &nbsp;&nbsp;&nbsp;
                {Number(
                  ((actualprice - offerprice) / actualprice) * 100
                ).toPrecision(4)}{" "}
                % off
              </span>
            </div>
          </div>
          <div className="lowerCard_right">
            {" "}
            <AddShoppingCartIcon
              className="pointer"
              onClick={() => {
                if (!isLoggedIn()) {
                  props.openModal();
                } else {
                  props.closeModal();
                  props.addToCart(productCode);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(null, {
  successToast,
  errorToast,
  addToCart,
  openModal,
  closeModal,
})(ProductCard);
