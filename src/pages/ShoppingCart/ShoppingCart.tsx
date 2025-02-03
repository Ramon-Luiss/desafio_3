import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  TextField,
} from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.tsx";
import {
  mainContainerStyle,
  appBarStyle,
  productListContainerStyle,
  productCardStyle,
  productImageStyle,
  quantityButtonStyle,
  footerContainerStyle,
  totalInfoStyle,
  checkoutButtonStyle,
} from "./ShoppingCartStyles.ts";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={mainContainerStyle}>
      {/* Navbar fixa */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={appBarStyle}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Shopping Cart
          </Typography>
          <IconButton edge="end" color="inherit" onClick={clearCart}>
            <Delete />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Lista de Produtos */}
      <Box sx={productListContainerStyle}>
        {cart.items.map((item) => (
          <Card key={item.id} sx={productCardStyle}>
            <CardMedia component="img" sx={productImageStyle} image={item.img} alt={item.name} />
            <CardContent sx={{ flex: 2 }}>
              <Typography sx={{fontSize:"16px"}} variant="subtitle1">{item.name}</Typography>
              <Typography sx={{fontSize:"14px", fontWeight:"bold"}} variant="subtitle2" >
                USD {item.price.toFixed(0)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}>
                <Button variant="text" sx={quantityButtonStyle} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  -
                </Button>
                <TextField size="small" value={item.quantity} sx={{ width: 40 }} inputProps={{ readOnly: true }} />
                <Button variant="text" sx={quantityButtonStyle}size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  +
                </Button>
                <IconButton sx={{ color: "inherit" }} edge="end" color="error" onClick={() => removeFromCart(item.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      
      <Box sx={footerContainerStyle}>
        <Box sx={totalInfoStyle}>
          <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>
            Total {totalItems} Items
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>
            USD {totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Button variant="contained" color="success" fullWidth sx={checkoutButtonStyle}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
