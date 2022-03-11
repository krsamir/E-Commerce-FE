import React, { useState, useEffect } from "react";
import {
  IconButton,
  Grid,
  Toolbar,
  AppBar,
  Dialog,
  Button,
  Typography,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UploadIcon from "@mui/icons-material/Upload";
import "../Style.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/HighlightOff";
import axios from "axios";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProductImages(props) {
  const { productId, imageData } = props;
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    return () => {
      images.map((value) => URL.revokeObjectURL(value));
    };
  }, [images]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUploadImages = (e) => {
    const values = [...images];
    setImages(values.concat(Array.from(e.target.files)));
  };

  const removeData = (i) => {
    const value = [...images];
    if (i === value.length - 1) {
      setCounter((prevState) => prevState - 1);
    }
    value.splice(i, 1);
    setImages(value);
  };

  const handleSaveImages = async () => {
    const formData = new FormData();
    images.map((_, i) => formData.append("myFile[]", images[i]));
    formData.append("ProductId", productId);
    await axios
      .post("/product/images/all", formData)
      .then((res) => {
        props.successToast(res.data.message, 2000);
      })
      .catch((e) => {
        console.log(e);
        props.errorToast("Some issue while uploading Images.");
      });
  };
  const ImageUrl = images.map((image) => URL.createObjectURL(image));
  return (
    <div>
      <Button variant="contained" component="span" onClick={handleClickOpen}>
        <UploadFileIcon />
        {"  "}Upload Product Images
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add Product Images
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <label
            htmlFor="contained-button-file"
            className="imageUploadBox pointer"
          >
            <div className="innerBox">
              <UploadIcon className="uploadIcon" />
            </div>
            <input
              name="myFile[]"
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              encType="multipart/form-data"
              onChange={handleUploadImages}
              hidden
            />
          </label>
          <div className="storedImage">
            {imageData.map(({ file, data }) => (
              <img
                key={file}
                src={`data:image/*;base64,${data}`}
                alt={file}
                loading="lazy"
                className="displayImage"
              />
            ))}
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={2}>
              <div className="leftCounter">
                {counter > 0 && (
                  <IconButton
                    size="large"
                    aria-label="Left"
                    color="primary"
                    onClick={() => setCounter((prevState) => prevState - 1)}
                  >
                    <ChevronLeftIcon className="left" />
                  </IconButton>
                )}
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <div className="imageBox">
                {ImageUrl.length > 0 && (
                  <div className="imagesmallbox">
                    <img
                      src={ImageUrl[counter]}
                      className="displayImage"
                      alt=""
                    />
                    {ImageUrl.length > 0 && (
                      <div className="counter hor">
                        <div className="hor" style={{ flex: 1 }}>
                          {counter + 1}
                          {"  "}
                          <div> Of </div>
                          {"  "}
                          <span>{ImageUrl.length}</span>
                        </div>
                        <IconButton
                          size="large"
                          aria-label="Left"
                          color="primary"
                          onClick={() => removeData(counter)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {/* {images
                  .map((image) => URL.createObjectURL(image))
                  .map((value, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={value}
                          className="displayImage pointer"
                          alt=""
                          onClick={() => removeData(index)}
                        />
                      </div>
                    );
                  })} */}
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              <div className="rightCounter">
                {counter < ImageUrl.length - 1 && (
                  <IconButton
                    size="large"
                    aria-label="Left"
                    color="primary"
                    onClick={() => setCounter((prevState) => prevState + 1)}
                  >
                    <ChevronRightIcon className="right" />
                  </IconButton>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12}>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                onClick={() =>
                  props.history.push({
                    pathname: "/admin/home/products",
                    state: null,
                  })
                }
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: "20px" }}
                onClick={handleSaveImages}
              >
                Save Images
              </Button>
            </div>
          </Grid>
        </div>
      </Dialog>
    </div>
  );
}
