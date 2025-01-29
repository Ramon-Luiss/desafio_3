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
  List,
  ListItem,
} from "@mui/material";
import { ArrowBack, ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiService.ts";

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
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack onClick={() => navigate("/Home")} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Search
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="cart">
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Search Field */}
      <TextField
        variant="outlined"
        placeholder="Search headphone"
        fullWidth
        sx={{ margin: 2 }}
        onChange={handleSearch}
      />

      {/* Results */}
      {searchResults.map((product) => (
        <Card sx={{ display: "flex", margin: 2 }} key={product.id}>
          <CardMedia
            component="img"
            sx={{ width: 100 }}
            image={product.img}
            alt={product.name}
          />
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
      ))}
    </div>
  );
};

export default Search;
