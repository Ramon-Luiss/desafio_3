import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Slider from "react-slick"; // Biblioteca do carrossel
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiService.ts";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState("headphones"); // Estado para a categoria selecionada

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCategory(newValue);
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as any[]);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Deslizamento automático
    autoplaySpeed: 2500, // Velocidade do autoplay (3 segundos)
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Audio
          </Typography>
          {user && <Avatar alt={user.displayName} src={user.photoURL} />}
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <div style={{ borderRadius: "20px", marginTop: "64px", padding: "16px" }}>
        <Typography variant="subtitle1">
          Hi, {user ? user.displayName : "User"}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          What are you looking for today?
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search headphone"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSearchClick}
        />
      </div>

      {/* Carrossel 1: Produtos por Categoria */}
      <Box sx={{ marginTop: 4, padding: "16px" }}>
        <Tabs
          value={category}
          onChange={(e, newValue) => setCategory(newValue)}
          centered
          
          textColor="primary"
          indicatorColor="primary"
          sx = {{backgroundColor: "transparent","& .MuiTabs-indicator": { backgroundColor: "#0ACF83" },}}
        >
          <Tab label="Headphones" value="headphones" />
          <Tab label="Headsets" value="headsets" />
        </Tabs>

        <Slider {...slickSettings}>
          {filteredProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                cursor: "pointer",
                margin: "0 8px",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {/* Text Section */}
              <Box sx={{ flex: 1, paddingRight: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    marginBottom: 1,
                    lineHeight: 1.2,
                    wordWrap: "break-word",
                  }}
                >
                  {product.name}
                </Typography>
                <Button
                  size="small"
                  color="success"
                  endIcon={<span style={{ fontSize: "16px" }}>→</span>} // Ícone de seta
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "14px",
                    color: "#27AE60",
                    padding: 0,
                    justifyContent: "flex-start",
                  }}
                >
                  Shop now
                </Button>
              </Box>

              {/* Image Section */}
              <Box
                sx={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "150px",
                  height: "150px",
                }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>


      {/* Featured Products */}
      <Box sx={{ marginTop: 4, padding: "16px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Featured Products
          </Typography>
          <Button onClick={() => navigate("/all-products")} size="small">
            See All
          </Button>
        </Box>

        <Slider
          {...{
            
            infinite: true,
            speed: 500,
            slidesToShow: 2, // Mostra dois produtos de cada vez
            slidesToScroll: 1, // Passa um produto por vez
            autoplay: true,
            autoplaySpeed: 3000,
          }}
        >
          {products.slice(0, 6).map((product) => (
            <Box
              key={product.id}
              sx={{
                textAlign: "center",
                padding: 2,
                cursor: "pointer",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                margin: "8px", // Adiciona um espaçamento entre os cards
                minHeight: "220px", // Define uma altura mínima para evitar variação
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.img}
                alt={product.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
              />
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "80%" }}
              >
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                USD {product.price.toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default Home;
