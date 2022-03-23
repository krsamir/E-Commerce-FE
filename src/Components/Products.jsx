import React, { useState, useRef, useCallback } from "react";
import useProductScroll from "./useProductScroll";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";
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
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div style={{ margin: "40px 20px 10px 20px" }}>
      <Grid container spacing={2}>
        {data.map((value, index) => {
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
                <ProductCard data={value} {...props} />
              </Grid>
            );
          } else {
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard data={value} {...props} />
              </Grid>
            );
          }
        })}
        <div>{loading && <h2>Loading...</h2>}</div>
        {/* <div>{error && "Error"}</div> */}
      </Grid>
    </div>
  );
}

export default Products;
