import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import "./Cart.css";
import "./Style.css";
import noimage from "../Images/image.jpg";
export default function Cart(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getCarts = async () => {
      await axios
        .get("/transaction/getAllCart")
        .then((response) => {
          setData(response.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getCarts();
  }, []);

  const redirectToProductPage = (productCode) => {
    props.history.push(`/product/${productCode}`);
  };

  return (
    <div>
      <Grid container spacing={2} className="cart">
        <Grid item xs={12} sm={7} md={7}>
          <div className="left_container">
            <div className="cart__left">
              {data.map(
                ({
                  name,
                  offerprice,
                  actualprice,
                  productCode,
                  stocks,
                  image,
                }) => (
                  <div className="cart_card">
                    <div className="card_left">
                      <img
                        src={
                          image.length === 0
                            ? noimage
                            : image[0].data === null
                            ? noimage
                            : `data:image/*;base64,${image[0].data}`
                        }
                        alt={name}
                        loading="lazy"
                        className="card_image_cart pointer"
                        onClick={() => redirectToProductPage(productCode)}
                      />
                    </div>
                    <div className="card_right_container">
                      <div className="card_right">
                        <div
                          className="card_name pointer"
                          onClick={() => redirectToProductPage(productCode)}
                        >
                          {name}
                        </div>
                        <div className="card_price">
                          <strike className="actual_price">
                            {actualprice}
                          </strike>
                          <div className="offer_price">{offerprice}</div>
                        </div>
                        <div className="item_bar">
                          <div className="reduce">-</div>
                          <div className="item_count">
                            <input type="text" className="item_input" />
                          </div>
                          <div className="add">+</div>
                        </div>
                        <div className="card_name">
                          {stocks === "instock"
                            ? ""
                            : stocks === 0
                            ? `Out of stock`
                            : `Hurry only ${stocks} items left!`}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <div className="cart__right">Total Screen</div>
        </Grid>
      </Grid>
    </div>
  );
}
