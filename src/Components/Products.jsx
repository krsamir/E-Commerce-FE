import React, { useState, useRef, useCallback } from "react";
import useProductScroll from "./useProductScroll";
import { Grid } from "@mui/material";
import noimage from "../Images/image.jpg";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import toast, { Toaster } from "react-hot-toast";
import "./Style.css";
function Products(props) {
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, data, error, hasMore } = useProductScroll(pageNumber);

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("Visible");
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const redirectToProductPage = (id) => {
    console.log(id);
    // props.history.push(`/product/${id}`);
  };

  return (
    <div style={{ margin: "40px 20px 10px 20px" }}>
      <Toaster />
      <Grid container spacing={2}>
        {data.map(
          (
            {
              id,
              name,
              description,
              color,
              material,
              offerprice,
              actualprice,
              totalstocks,
              Categories,
              Images,
            },
            index
          ) => {
            if (data.length === index + 1) {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  ref={lastBookElementRef}
                >
                  <div className="productCard">
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
                            toast.success(
                              "Product added to cart Successfully!!",
                              { duration: 6000 }
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            } else {
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <div className="productCard">
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
                            toast.success(
                              "Product added to cart Successfully!!",
                              { duration: 6000 }
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
              );
            }
          }
        )}
        <div>{loading && "Loading..."}</div>
        <div>{error && "Error"}</div>
      </Grid>
    </div>
  );
}

export default Products;
