import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid } from "@mui/material";
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
          setData(
            response.data.data.map((value) => ({
              ...value,
              items: value.stocks === 0 ? 0 : 1,
            }))
          );
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

  const handleItemCount = (e, index) => {
    const items = [...data];
    items[index].items = Number(e.target.value);
    setData(items);
  };
  const checkDeliveryCharge = (price) => {
    if (price > 500) {
      return { price: 0, off: "0.0%" };
    } else {
      return { price: price * 0.05, off: "0.05%" };
    }
  };
  const totalActual = data.reduce(
    (acc, value) => acc + value.actualprice * value.items,
    0
  );
  const totalOffer = data.reduce(
    (acc, value) => acc + value.offerprice * value.items,
    0
  );
  const discount = totalActual - totalOffer;
  const totalFinalAmount = totalOffer + checkDeliveryCharge(totalOffer).price;
  const totalSavingPercentage = Number(
    ((totalActual - (totalOffer + checkDeliveryCharge(totalOffer).price)) /
      totalActual) *
      100
  ).toPrecision(4);
  const finalDeliveryCharge = checkDeliveryCharge(totalOffer).price;
  return (
    <div>
      <Grid container spacing={2} className="cart">
        <Grid item xs={12} sm={7} md={7}>
          <div className="left_container">
            <div className="cart__left">
              {data.length === 0 ? (
                <div className="cartEmpty">
                  <div className="cartEmptyText">No Items in your Cart!</div>
                  <Button
                    variant="contained"
                    className="redirectHome"
                    onClick={() => props.history.push(`/`)}
                  >
                    Go To Home!
                  </Button>
                </div>
              ) : (
                data.map(
                  (
                    {
                      name,
                      offerprice,
                      actualprice,
                      productCode,
                      stocks,
                      image,
                      items,
                    },
                    index
                  ) => (
                    <div className="cart_card" key={productCode}>
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
                            <div className="reduce">Items :</div>
                            <div className="item_count">
                              <select
                                name=""
                                id=""
                                className="item_input"
                                value={items}
                                onChange={(e) => handleItemCount(e, index)}
                                disabled={stocks === 0}
                              >
                                {stocks === "instock"
                                  ? Array(11)
                                      .fill(0, 1)
                                      .map((val, index) => (
                                        <option key={index} value={index}>
                                          {index}
                                        </option>
                                      ))
                                  : Array(stocks)
                                      .fill(0)
                                      .map((val, index) => (
                                        <option key={index} value={index + 1}>
                                          {index + 1}
                                        </option>
                                      ))}
                              </select>
                            </div>
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
                )
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={5} md={5}>
          <div className="cart__right">
            <div className="total">
              <div className="priceDetail">Price Details </div>
              <div className="cost">Total Price: {totalActual}</div>
              <div className="lowerCost">
                <div className="delivery">
                  Delivery Charges(
                  {checkDeliveryCharge(totalOffer).off}
                  ): {finalDeliveryCharge}
                </div>
                <div className="discount">Discount: {discount}</div>
                <div className="amount">Total Amount: {totalFinalAmount}</div>
              </div>
              <div className="savings">
                Savings:{" "}
                {isNaN(totalSavingPercentage) ? 0 : totalSavingPercentage} % off
              </div>
              <div className="placeOrder">
                <Button variant="contained" disabled={data.length === 0}>
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
