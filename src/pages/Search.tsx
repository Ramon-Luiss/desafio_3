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
import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiService.ts";
import CartIcon from "../components/CartIcon.tsx";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts() as any[];
        setProducts(data as any[]);
        setSearchResults(data); // Inicializa com todos os produtos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }} >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack onClick={() => navigate("/Home")} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Search
          </Typography>
          <CartIcon>
          </CartIcon>
        </Toolbar>
      </AppBar>

      {/* Search Field */}
      <Box sx={{ 
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
          placeholder="Search product"
          fullWidth
          onChange={handleSearch}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#f5f5f5",
            "& fieldset": { border: "none" } // Remove a borda do campo de busca
          }}
        />
      </Box>

      {/* Results */}
      <Box sx={{ marginTop: "110px", padding: 2 }}>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <Card sx={{ display: "flex", marginBottom: 2 }} key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
              <CardMedia component="img" sx={{ width: 100 }} image={product.img} alt={product.name} />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
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
          ))
        ) : (
          <Typography sx={{ padding: 2 }}>Nenhum produto encontrado.</Typography>
        )}
      </Box>
    </div>
  );
};

export default Search;
