
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
import { ArrowBack } from "@mui/icons-material";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../../services/apiService.ts";
import { useCart } from "../../context/CartContext.tsx";
import CartIcon from "../../components/CartIcon.tsx";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do produto da URL
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [tabIndex, setTabIndex] = useState(0); // Controla qual aba está ativa
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  // URL da imagem personalizada para os avatares dos comentários
  const commentAvatarUrl =


    "https://s3-alpha-sig.figma.com/img/991d/1a28/b834c238506c87b86dc6e60eb15b3038?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ubwa6wVAHqjpNoiyPd~E-HTrrZN~CwARQsUU1xNcHCgJLykmtqtQ4iJMhng7EydSyQ9iyhn7ZjsmarG6jXMUfF0risAF7bRo84JW11mWhRltz-BtH~LCeJV-Z-496dc~AmBih~~MTwyCkK01LEBVyQoj-tJZqPQS0~U5UddHkwb4T8k2bpGUf8KNZhHt3Rsa00DLVjIbyfsXRHiV2sWb63PoE-kH~034NJXuJVk1ouxuwgTov~eb1xGa971GneyWU7v1lwnuN-g6r3GtOqHE~ZzyVWKK4iYR0txlEkyZOuMwOrsCYL2M6kRK66jwknqfZ~6sLwtwrRZntj1L1BH0jQ__"; // Substitua por sua imagem preferida

  // Carrega os detalhes do produto com base no ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProducts() as any[];
        const selectedProduct = data.find((item: any) => item.id === id);
        setProduct(selectedProduct);
        setRelatedProducts(data.slice(0, 6)); // Exibe até 6 produtos no carrossel
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (!product) {
    return <Typography>Carregando...</Typography>;
  }

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            {product.name}
          </Typography>
          <CartIcon />
        </Toolbar>
      </AppBar>

      {/* Produto */}
      <Box sx={{ marginTop: "64px", padding: 2 }}>
        <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} variant="h6" color="#0ACF83">
          USD {product.price.toFixed(0)}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2, fontSize: "28px" }}>
          {product.name}
        </Typography>

        {/* Abas */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            marginBottom: 2,
            "& .MuiTabs-indicator": { backgroundColor: "#0ACF83" },
          }}
        >
          <Tab
            label="Overview"
            sx={{
              textTransform: "none", "&.Mui-selected": {
                color: tabIndex === 0 ? "inherit" : "inherit", // Garante que o texto da aba ativa seja branco
              },
            }}
          />
          <Tab
            label="Features"
            sx={{
              textTransform: "none", "&.Mui-selected": {
                color: tabIndex === 1 ? "inherit" : "inherit", // Garante que o texto da aba ativa seja branco
              },
            }}
          />
        </Tabs>

        {/* Conteúdo das Abas */}
        {tabIndex === 0 && (
          <Box>
            <Card sx={{ borderRadius: "16px", marginBottom: 2 }}>
              <CardMedia component="img" height="391" width="285" image={product.img} alt={product.name} />
            </Card>
            <Typography variant="h5" sx={{ marginBottom: 2, fontSize: "16px" }}>
              Reviews ({product.reviews.length})
            </Typography>
            {product.reviews.map((review: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "16px",
                  padding: "12px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",

                }}
              >
                <img
                  src={commentAvatarUrl}
                  alt="User Avatar"
                  style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
                />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "16px" }}>
                    {review.userName}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                    {/* Estrelas */}
                    {Array.from({ length: review.rating }, (_, i) => (
                      <span key={i} style={{ color: "#FFD700", marginRight: "4px" }}>★</span>
                    ))}
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: "14px",
                      lineHeight: "1.5",
                      maxHeight: "4.5em", // Limita a altura para 3 linhas
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {review.comment}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Carrossel de Produtos Relacionados */}
            <Box sx={{ marginTop: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <Typography sx={{ fontSize: "16px" }} variant="h5">Another Product</Typography>
                <Button sx={{ color: "grey", fontSize: "14px" }} onClick={() => navigate("/all-products")} size="small">
                  See All
                </Button>
              </Box>
              <Slider {...slickSettings}>
                {relatedProducts.map((related) => (
                  <Box
                    key={related.id}
                    sx={{
                      textAlign: "center",
                      padding: 2,
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      margin: "0 16px", // Espaço horizontal consistente
                      minHeight: "260px", // Aumenta a altura mínima para acomodar o conteúdo
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      alignItems: "center", // Adiciona leve sombra para destacar os cards

                    }}
                    onClick={() => navigate(`/product/${related.id}`)}
                  >
                    <img
                      src={related.img}
                      alt={related.name}
                      style={{
                        width: "125px",
                        height: "135px",
                        objectFit: "contain",
                        marginBottom: "10px", // Espaço abaixo da imagem
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      sx={{
                        fontSize: "14px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        marginBottom: "4px", // Espaço abaixo do nome do produto
                      }}
                    >
                      {related.name}
                    </Typography>
                    <Typography
                      fontWeight="bold"
                      variant="body2"

                      sx={{
                        fontSize: "12px",
                        marginBottom: "4px", // Espaço abaixo do preço
                      }}
                    >
                      USD {related.price.toFixed(0)}
                    </Typography>
                  </Box>
                ))}
              </Slider>
            </Box>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, fontSize: "16px" }}>
              Features
            </Typography>
            <Typography sx={{ fontSize: "16px" }}
              variant="body1">
              {product.details}
            </Typography>
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
            boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",

            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            fullWidth

            sx={{ borderRadius: "5px", width: "90%", backgroundColor: "#0ACF83" }}
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
