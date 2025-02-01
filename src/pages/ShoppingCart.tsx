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
import { useCart } from "../context/CartContext.tsx";

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", paddingBottom: "100px" }}>
      {/* Navbar fixa */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
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
      <Box sx={{ padding: 2, marginTop: "80px" }}>
        {cart.items.map((item) => (
          <Card key={item.id} sx={{ display: "flex", marginBottom: 2 }}>
            <CardMedia
              component="img"
              sx={{ width: 100 }}
              image={item.img}
              alt={item.name}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                USD {item.price.toFixed(2)}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginTop: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)} // Diminui quantidade
                >
                  -
                </Button>
                <TextField
                  size="small"
                  value={item.quantity}
                  sx={{ width: 40 }}
                  inputProps={{ readOnly: true }}
                />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)} // Aumenta quantidade
                >
                  +
                </Button>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => removeFromCart(item.id)} // Remove item
                >
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Rodapé fixo */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "90%",
          backgroundColor: "white",
          padding: "16px",
          boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
          <Typography variant="subtitle1">Total {totalItems} Items</Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            USD {totalPrice.toFixed(2)}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ maxWidth: "400px", margin: "0 auto", backgroundColor: "#0ACF83"}}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
