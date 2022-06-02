import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import axios from "axios";
import noimage from "../Images/image.jpg";
import "./Style.css";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { errorToast, successToast } from "../Redux/Actions/ToastActions";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { openModal, closeModal } from "../Redux/Actions/LoginAction";
import { addToCart } from "../Redux/Actions/ProductActions";

function SingleProductPage(props) {
  const {
    params: { id },
  } = useRouteMatch();
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const getObjectByID = async () => {
      await axios
        .get(`/product/item/${id}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((e) => {
          props.errorToast("Some issue while fetching the product details.");
          console.log(e);
        });
    };
    getObjectByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const isLoggedIn = () => {
    const sidToken = window.localStorage.getItem("sid");
    return !(sidToken === null || sidToken === "" || sidToken === undefined);
  };

  if (data) {
    const {
      Categories,
      Images,
      actualprice,
      color,
      description,
      material,
      name,
      offerprice,
      totalstocks,
      productCode,
    } = data;
    return (
      <div>
        <NavBar {...props} />
        <div className="singleProduct">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={8}>
              <div className="bigCard">
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <div className="product__left hor">
                      {Images.length > 0 ? (
                        <img
                          src={`data:image/*;base64,${Images[counter].data}`}
                          alt={Images[counter].file}
                          loading="lazy"
                          className="productTag"
                        />
                      ) : (
                        <img
                          src={noimage}
                          loading="lazy"
                          className="productTag"
                          alt=""
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={7} md={7}>
                    <div className="product__right">
                      <div className="hor">
                        <div className="product__name">{name}</div>
                        <div className="leftCounterProduct">
                          {
                            <IconButton
                              size="large"
                              aria-label="Left"
                              color="primary"
                              disabled={counter <= 0}
                              onClick={() => {
                                if (counter > 0) {
                                  setCounter((prevState) => prevState - 1);
                                }
                              }}
                            >
                              <ChevronLeftIcon className="left" />
                            </IconButton>
                          }
                        </div>
                        <div className="rightCounterProduct">
                          {
                            <IconButton
                              size="large"
                              aria-label="Left"
                              color="primary"
                              disabled={counter >= Images.length - 1}
                              onClick={() => {
                                if (counter < Images.length - 1) {
                                  setCounter((prevState) => prevState + 1);
                                }
                              }}
                            >
                              <ChevronRightIcon className="right" />
                            </IconButton>
                          }
                        </div>
                      </div>
                      <div className="product__description">{description}</div>
                      <div className="line">
                        <div className="hor">
                          <span className="title">Color: </span>
                          <div
                            className="circle"
                            style={{ backgroundColor: color }}
                          ></div>
                        </div>
                        <div className="hor">
                          <span className="title">Price:&nbsp; </span>
                          <span>
                            {offerprice} {"  "}
                            <strike>{actualprice}</strike>
                          </span>
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {Number(
                              ((actualprice - offerprice) / actualprice) * 100
                            ).toPrecision(4)}
                            % off
                          </span>
                        </div>
                        <div className="hor">
                          <span className="title">Material:&nbsp; </span>
                          <span>{material}</span>
                        </div>
                        <div className="hor">
                          <span className="title">Category: </span>

                          {Categories.length === 0 ? (
                            <div className="toasts">No Categories Found</div>
                          ) : (
                            Categories.map(({ name, id }) => (
                              <div className="toasts pointer" key={id}>
                                {name}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {totalstocks < 4 && totalstocks > 0 && (
                        <div>Hurry! only {totalstocks} items left.</div>
                      )}
                      {totalstocks === 0 && <div>No stocks left.</div>}
                      <div className="buttonSet hor">
                        <div
                          className="button1"
                          style={
                            totalstocks === 0
                              ? {
                                  width: "100%",
                                  borderTopRightRadius: "5px",
                                  borderBottomRightRadius: "5px",
                                }
                              : { width: "50%" }
                          }
                          onClick={() => {
                            if (!isLoggedIn()) {
                              props.openModal();
                            } else {
                              props.closeModal();
                              props.addToCart(productCode);
                            }
                          }}
                        >
                          Add to cart
                        </div>
                        {(totalstocks > 0 || totalstocks === "instock") && (
                          <div
                            className="button2"
                            onClick={() => {
                              if (!isLoggedIn()) {
                                props.openModal();
                              } else {
                                props.closeModal();
                                props.addToCart(productCode);
                                setTimeout(() => {
                                  props.history.push("/cart");
                                }, 1500);
                              }
                            }}
                          >
                            Buy Now
                          </div>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading ...</h1>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  modal: state.account.modalState,
});
export default connect(mapStateToProps, {
  errorToast,
  successToast,
  openModal,
  closeModal,
  addToCart,
})(SingleProductPage);
