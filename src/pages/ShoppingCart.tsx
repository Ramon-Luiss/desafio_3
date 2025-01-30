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
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
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
      <Box sx={{ padding: 2 }}>
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
                  onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
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
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}

        {/* Total */}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total {totalItems} Items
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          USD {totalPrice.toFixed(2)}
        </Typography>

        {/* Botão Checkout */}
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;
