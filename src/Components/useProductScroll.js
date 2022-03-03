import axios from "axios";
import { useEffect, useState } from "react";
export default function useProductScroll(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    console.log(pageNumber);
    setLoading(true);
    setError(false);
    // let cancel; //canceling apis
    axios({
      url: `/product?page=${pageNumber}`,
      method: "GET",
      // cancelToken: new axios.CancelToken((c) => (cancel = c)), //canceling apis
    })
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data.data.rows]);
        console.log(res.data.data);
        // setHasMore(res.data.data.count > 0); //edit according to need.
        setHasMore(true);
        setError(false);
        setLoading(false);
      })
      .catch((e) => {
        // if (axios.isCancel(e)) return; //canceling apis
        setError(true);
        console.log(e);
      });
    // return () => cancel(); //canceling apis
  }, [pageNumber]);

  return { loading, data, error, hasMore };
}
