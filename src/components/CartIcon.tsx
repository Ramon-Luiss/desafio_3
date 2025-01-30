import React from "react";
import { IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.tsx";

const CartIcon: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <IconButton edge="end" color="inherit" onClick={() => navigate("/cart")}>
      <Badge badgeContent={cart.items.length} color="error">
        <ShoppingCart />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
