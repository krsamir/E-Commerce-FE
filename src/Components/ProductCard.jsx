import React from "react";
import "./Style.css";
import noimage from "../Images/image.jpg";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Toaster } from "react-hot-toast";
import { successToast, errorToast } from "../Redux/Actions/ToastActions";
import { connect } from "react-redux";
function ProductCard(props) {
  const {
    data: {
      name,
      //   description,
      //   color,
      //   material,
      offerprice,
      actualprice,
      //   totalstocks,
      //   Categories,
      //   Images,
      productCode,
    },
  } = props;
  const redirectToProductPage = (productCode) => {
    console.log(productCode);
    props.history.push(`/product/${productCode}`);
  };
  return (
    <div>
      <div className="productCard">
        <Toaster />
        <img
          src={noimage}
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
              Price:
              <span>{offerprice}</span>
              {"  "}
              <strike>{actualprice}</strike>
            </div>
          </div>
          <div className="lowerCard_right">
            {" "}
            <AddShoppingCartIcon
              className="pointer"
              onClick={() =>
                props.successToast("Product added to cart Successfully!!")
              }
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
})(ProductCard);
