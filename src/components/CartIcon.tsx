import React from "react";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.tsx";

const CartIcon: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <IconButton edge="end" color="inherit" onClick={() => navigate("/cart")}>
      <Badge badgeContent={cart.items.length} color="success">
        <ShoppingCartOutlinedIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
