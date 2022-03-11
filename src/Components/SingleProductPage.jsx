import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import axios from "axios";
export default function SingleProductPage() {
  const {
    params: { id },
  } = useRouteMatch();
  useEffect(() => {
    const getObjectByID = async () => {
      await axios
        .get(`/product/item/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getObjectByID();
  }, [id]);

  return <div>{JSON.stringify(id)}</div>;
}
