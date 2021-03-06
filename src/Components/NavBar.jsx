import React, { useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import axios from "axios";
import { openModal, closeModal } from "../Redux/Actions/LoginAction";
import { getCart } from "../Redux/Actions/ProductActions";
import { connect } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function NavBar(props) {
  useEffect(() => {
    const sidToken = window.localStorage.getItem("sid");
    if (!(sidToken === null || sidToken === "" || sidToken === undefined)) {
      props.getCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const openCart = Boolean(anchorElCart);

  const handleClickCart = (event) => {
    setAnchorElCart(event.currentTarget);
  };
  const handleCloseCart = () => {
    setAnchorElCart(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const redirectToHome = () => {
    props.history.push("/");
  };

  const redirectToLogin = () => {
    props.history.push("/login");
  };
  const redirectToProfile = () => {
    if (isLoggedIn) {
      props.history.push("/profile");
    } else {
      redirectToLogin();
    }
    handleMenuClose();
  };

  const redirectToCartWindow = () => {
    props.history.push("/cart");
  };

  const { cart } = props;

  const isLoggedIn = () => {
    const sidToken = window.localStorage.getItem("sid");
    return !(sidToken === null || sidToken === "" || sidToken === undefined);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={redirectToProfile}>Profile</MenuItem>
      {isLoggedIn() && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isLoggedIn() && (
        <MenuItem onClick={redirectToLogin}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
          onClick={() => redirectToCartWindow()}
        >
          <Badge badgeContent={cart.count} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {/* <MenuItem>
        <IconButton
          size="large"
          aria-label="show 25 new notifications"
          color="inherit"
        >
          <Badge badgeContent={25} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1, paddingTop: "45px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="pointer"
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            onClick={redirectToHome}
          >
            My Store
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search???"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {!isLoggedIn() && (
              <Button
                variant="contained"
                style={{ marginRight: "20px" }}
                onClick={redirectToLogin}
              >
                Login
              </Button>
            )}
            <Menu
              id="basic-menu"
              anchorEl={anchorElCart}
              open={openCart}
              onClose={handleCloseCart}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {cart.data
                .slice(0, 4)
                .map(({ name, actualprice, offerprice, productCode }) => {
                  return (
                    <MenuItem
                      key={productCode}
                      onClick={() => {
                        handleCloseCart();
                        props.history.push(`/product/${productCode}`);
                      }}
                      sx={{ width: "250px" }}
                      divider
                    >
                      {name}
                    </MenuItem>
                  );
                })}
              {cart.count > cart.data.length && cart.data.length >= 4 && (
                <MenuItem onClick={redirectToCartWindow}>
                  view all items
                </MenuItem>
              )}
              {cart.data.length === 0 && (
                <MenuItem onClick={handleCloseCart}>No items.</MenuItem>
              )}
              <MenuItem onClick={redirectToCartWindow}>Go to cart...</MenuItem>
            </Menu>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={(e) => {
                isLoggedIn()
                  ? handleClickCart(e) && props.closeModal()
                  : props.openModal();
              }}
            >
              <Badge badgeContent={cart.count} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* <IconButton
              size="large"
              aria-label="show 25 new notifications"
              color="inherit"
            >
              <Badge badgeContent={25} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
const mapStateToProps = (state) => ({
  cart: state.products.cart,
});
export default connect(mapStateToProps, {
  openModal,
  closeModal,
  getCart,
})(NavBar);
