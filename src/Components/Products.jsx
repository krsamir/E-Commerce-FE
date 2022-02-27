import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import noimage from "../Images/image.jpg";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import toast, { Toaster } from "react-hot-toast";
import "./Style.css";
function Products(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      await axios
        .get("/product")
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
        })
        .catch((e) => console.log(e));
    };
    getAllProduct();
  }, []);

  const redirectToProductPage = (id) => {
    console.log(id);
    // props.history.push(`/product/${id}`);
  };

  return (
    <div style={{ margin: "40px 20px 10px 20px" }}>
      <Toaster />
      <Grid container spacing={2}>
        {data.map(
          ({
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
          }) => {
            return (
              <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
                <div
                  className="productCard"
                  onClick={() => redirectToProductPage(id)}
                >
                  <img
                    src={noimage}
                    alt={name}
                    loading="lazy"
                    className="cardImage pointer"
                  />
                  <div className="lowerCard hor">
                    <div className="lowerCard_left">
                      <div className="name">{name}</div>
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
        )}
      </Grid>
    </div>
  );
}

export default Products;
