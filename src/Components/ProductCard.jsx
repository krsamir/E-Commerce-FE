import React from "react";
import "./Style.css";
import noimage from "../Images/image.jpg";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import toast, { Toaster } from "react-hot-toast";
export default function ProductCard(props) {
  const {
    data: {
      id,
      name,
      //   description,
      //   color,
      //   material,
      offerprice,
      actualprice,
      //   totalstocks,
      //   Categories,
      //   Images,
    },
  } = props;
  const redirectToProductPage = (id) => {
    console.log(id);
    props.history.push(`/product/${id}`);
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
          onClick={() => redirectToProductPage(id)}
        />
        <div className="lowerCard hor">
          <div className="lowerCard_left">
            <div
              className="name pointer"
              onClick={() => redirectToProductPage(id)}
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
                toast.success("Product added to cart Successfully!!", {
                  duration: 6000,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
