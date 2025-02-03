import React from "react";
import { AppBar, Avatar, IconButton, Tab, Tabs, Toolbar, Typography, Box, Button, TextField } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

// Navbar Component
export const Navbar = ({ user }: { user: any }) => (
  <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontSize: "19.05px" }}>
        Audio
      </Typography>
      {user && <Avatar alt={user.displayName} src={user.photoURL} />}
    </Toolbar>
  </AppBar>
);

// Category Tabs Component
export const CategoryTabs = ({ category, setCategory }: { category: string; setCategory: (value: string) => void }) => (
  <Tabs
    value={category}
    onChange={(event, newValue) => setCategory(newValue)}
    centered
    sx={{
      backgroundColor: "#f5f5f5",
      borderRadius: "12px",
      "& .MuiTabs-indicator": { display: "none" },
    }}
  >
    <Tab
      label="Headphones"
      value="headphones"
      sx={{
        fontSize: "14px",
        textTransform: "none",
        borderRadius: "12px",
        backgroundColor: category === "headphones" ? "#0ACF83" : "transparent",
        color: category === "headphones" ? "white" : "black",
        "&.Mui-selected": { color: "white" },
        "&:hover": { backgroundColor: category === "headphones" ? "#0ACF83" : "rgba(0, 0, 0, 0.1)" },
      }}
    />
    <Tab
      label="Headsets"
      value="headsets"
      sx={{
        fontSize: "14px",
        textTransform: "none",
        borderRadius: "12px",
        backgroundColor: category === "headsets" ? "#0ACF83" : "transparent",
        color: category === "headsets" ? "white" : "black",
        "&.Mui-selected": { color: "white" },
        "&:hover": { backgroundColor: category === "headsets" ? "#0ACF83" : "rgba(0, 0, 0, 0.1)" },
      }}
    />
  </Tabs>
);

// Product Carousel Component
export const ProductCarousel = ({ products }: { products: any[] }) => {
  const navigate = useNavigate();
  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
    <Slider {...slickSettings}>
      {products.map((product) => (
        <Box
          key={product.id}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#fff",
            borderRadius: "16px",
            cursor: "pointer",
            margin: "0 8px",
          }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <Box sx={{ flex: 1, paddingRight: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "22px" }}>
              {product.name}
            </Typography>
            <Button size="small" color="success" sx={{ textTransform: "none", fontWeight: "bold", fontSize: "14px", color: "#0ACF83" }}>
              Shop now
            </Button>
          </Box>
          <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", width: "150px", height: "150px" }}>
            <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </Box>
        </Box>
      ))}
    </Slider>
  );
};

// Featured Products Component
export const FeaturedProducts = ({ products }: { products: any[] }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ marginTop: 4, padding: "16px" }}>
      <Typography sx={{ fontSize: "16px" }} variant="h6" fontWeight="bold">
        Featured Products
      </Typography>
      <Slider {...{ infinite: true, speed: 500, slidesToShow: 2, slidesToScroll: 1, autoplay: true, autoplaySpeed: 3000 }}>
        {products.slice(0, 6).map((product) => (
          <Box
            key={product.id}
            sx={{ textAlign: "center", padding: 2, cursor: "pointer", backgroundColor: "#fff", minHeight: "150px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img src={product.img} alt={product.name} style={{ width: "120px", height: "120px", objectFit: "contain", marginBottom: "10px" }} />
            <Typography variant="subtitle1" sx={{ fontSize: "14px" }}>{product.name}</Typography>
            <Typography sx={{ fontSize: "12px" }} fontWeight="bold">USD {product.price.toFixed(0)}</Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
