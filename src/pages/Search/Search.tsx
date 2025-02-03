import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../services/apiService.ts";
import { useCart } from "../../context/CartContext.tsx";
import CartIcon from "../../components/CartIcon.tsx";
import { SearchBar, ProductList, PopularProducts } from "./SearchComponents.tsx";
import { appBarStyle, contentContainerStyle, emptySearchSpaceStyle } from "./SearchStyles.ts";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as any[]);
        setSearchResults([]);
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
      setSearchResults([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    }
  };

  if (loading) {
    return <Typography sx={{ padding: 2 }}>Carregando...</Typography>;
  }

  return (
    <Box>
      <AppBar position="fixed" color="transparent" elevation={0} sx={appBarStyle}>
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

      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />

      <Box sx={contentContainerStyle}>
        {searchQuery === "" && <Box sx={emptySearchSpaceStyle} />}
        <ProductList products={searchResults} />
        {searchQuery === "" && <PopularProducts products={products.slice(0, 3)} />}
      </Box>
    </Box>
  );
};

export default Search;
