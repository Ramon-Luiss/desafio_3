import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiService.ts";
import { useCart } from "../context/CartContext.tsx";
import CartIcon from "../components/CartIcon.tsx";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para o texto da busca
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as any[]);
        setSearchResults([]); // Inicialmente, nenhum resultado
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setSearchResults([]); // Nenhum resultado quando a barra está vazia
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    }
  };

  const popularProducts = products.slice(0, 3); // Pegando os 3 produtos mais populares

  if (loading) {
    return <Typography sx={{ padding: 2 }}>Carregando...</Typography>;
  }

  return (
    <Box>
      {/* Navbar fixa */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Search
          </Typography>
          <CartIcon />
        </Toolbar>
      </AppBar>

      {/* Barra de Pesquisa fixa */}
      <Box sx={{
        maxWidth: "400px",
        position: "fixed",
        top: "44px",
        left: 0,
        width: "100%",
        backgroundColor: "white",
        zIndex: 10,
        padding: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
      }}>
        <TextField
          variant="outlined"
          placeholder="Search headphone"
          fullWidth
          onChange={handleSearch}
          value={searchQuery}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f5f5f5",
            "& fieldset": { border: "none" }, // Remove a borda do campo de busca
          }}
        />
      </Box>

      {/* Espaço para não cobrir os resultados */}
      <Box sx={{ marginTop: "120px", padding: 2 }}>
        {/* Espaço em branco se a barra de busca estiver vazia */}
        {searchQuery === "" && (
          <Box sx={{ marginBottom: "16px", height: "150px" }} />
        )}
        {/* Resultados da Pesquisa */}
        {searchQuery !== "" && searchResults.length > 0 && (
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
              Search Results
            </Typography>
            {searchResults.map((product) => (
              <Card
                sx={{ display: "flex", marginBottom: 2 }}
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 100 }}
                  image={product.img}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="subtitle1">{product.name}</Typography>
                  <Typography variant="body1">USD {product.price.toFixed(2)}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    ★{" "}
                    {(
                      product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                      product.reviews.length
                    ).toFixed(1)}{" "}
                    · {product.reviews.length} Reviews
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {searchQuery !== "" && searchResults.length === 0 && (
          <Typography sx={{ marginBottom: 2 }}>Nenhum produto encontrado.</Typography>
        )}

        {/* Seção Popular Products */}
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
            Popular Products
          </Typography>
          {popularProducts.map((product) => (
            <Card
              sx={{ display: "flex", marginBottom: 2 }}
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                sx={{ width: 100 }}
                image={product.img}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{product.name}</Typography>
                <Typography variant="body1">USD {product.price.toFixed(2)}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ★{" "}
                  {(
                    product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                    product.reviews.length
                  ).toFixed(1)}{" "}
                  · {product.reviews.length} Reviews
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
