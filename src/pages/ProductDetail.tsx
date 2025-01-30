import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Card,
  CardMedia,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../services/apiService.ts";
import { useCart } from "../context/CartContext.tsx";
import CartIcon from "../components/CartIcon.tsx";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do produto da URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState(0); // Controla qual aba está ativa

  // Carrega os detalhes do produto com base no ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProducts() as any[];
        const selectedProduct = data.find((item: any) => item.id === id);
        setProduct(selectedProduct);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Atualiza a aba ativa
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Verifica se o produto foi carregado
  if (!product) {
    return <Typography>Carregando...</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }} >
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            {product.name}
          </Typography>
          <CartIcon>

          </CartIcon>
        </Toolbar>
      </AppBar>

      {/* Produto */}
      <Box sx={{ marginTop: "44px", padding: 2 }}>
        <Typography variant="h6" color="green">
          USD {product.price.toFixed(2)}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {product.name}
        </Typography>

        {/* Abas */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            marginBottom: 2,
            "& .MuiTabs-indicator": { backgroundColor: "green" }, // Indicador verde
          }}
        >
          <Tab
            label="Overview"
            sx={{
              textTransform: "none",
              fontWeight: tabIndex === 0 ? "bold" : "normal",
            }}
          />
          <Tab
            label="Features"
            sx={{
              textTransform: "none",
              fontWeight: tabIndex === 1 ? "bold" : "normal",
            }}
          />
        </Tabs>

        {/* Conteúdo das Abas */}
        {tabIndex === 0 && (
          <Box>
            <Card sx={{ borderRadius: "16px", marginBottom: 2 }}>
              <CardMedia
                component="img"
                height="300"
                image={product.img}
                alt={product.name}
              />
            </Card>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Reviews ({product.reviews.length})
            </Typography>
            {product.reviews.map((review: any, index: number) => (
              <Box key={index} sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {review.userName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ★ {review.rating} · {review.postedAt}
                </Typography>
                <Typography>{review.comment}</Typography>
              </Box>
            ))}
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Features
            </Typography>
            <Typography variant="body1">{product.details}</Typography>
          </Box>
        )}

        {/* Botão Add to Cart */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "white",
            padding: "16px",
            boxShadow: "0px -2px 10px rgba(0,0,0,0.1)", // Sombra para separar do conteúdo
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ borderRadius: "20px", maxWidth: "300px" }} // Limita a largura máxima do botão
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            Add To Cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
