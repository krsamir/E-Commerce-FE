import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
import noimage from "../Images/image.jpg";
import "./Style.css";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { errorToast } from "../Redux/Actions/ToastActions";
function SingleProductPage(props) {
  const {
    params: { id },
  } = useRouteMatch();

  const [data, setData] = useState(null);
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
  }, [id]);

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
    } = data;
    return (
      <div>
        <NavBar {...props} />
        <div className="singleProduct">
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={8}>
              {/* <div>{JSON.stringify(data)}</div> */}
              <div className="bigCard">
                <Grid container>
                  <Grid item xs={12} sm={5} md={5}>
                    <div className="product__left">
                      {Images.length > 0 ? (
                        Images.map(({ data, file }, index) => (
                          <img
                            key={index}
                            src={`data:image/*;base64,${data}`}
                            alt={file}
                            loading="lazy"
                            className="productTag"
                          />
                        ))
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
                      <div className="product__name">{name}</div>
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
                          <span className="title">Price: </span>
                          <span>
                            {offerprice} {"  "}
                            <strike>{actualprice}</strike>
                          </span>
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {Number(
                              (offerprice / actualprice) * 100
                            ).toPrecision(4)}
                            % off
                          </span>
                        </div>
                        <div className="hor">
                          <span className="title">Material: </span>
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

                      {totalstocks < 4 && (
                        <div>Hurry! only {totalstocks} items left.</div>
                      )}
                      <div className="buttonSet hor">
                        <div className="button1">Add to cart</div>
                        <div className="button2">Buy Now</div>
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
        <h2>Sorry! No Product Found</h2>
      </div>
    );
  }
}

export default connect(null, { errorToast })(SingleProductPage);
