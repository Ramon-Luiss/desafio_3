import React from "react";
import { TextField, Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  searchBarContainerStyle,
  searchFieldStyle,
  productCardStyle,
  productImageStyle
} from "./SearchStyles.ts";

/* ==========================
   Componente: Barra de Pesquisa
   ========================== */
export const SearchBar: React.FC<{ searchQuery: string; handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ searchQuery, handleSearch }) => {
  return (
    <Box sx={searchBarContainerStyle}>
      <TextField
        variant="outlined"
        placeholder="Search headphone"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={searchFieldStyle}
      />
    </Box>
  );
};

/* ==========================
   Componente: Lista de Produtos Filtrados
   ========================== */
export const ProductList: React.FC<{ products: any[] }> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <Box>
      {products.length > 0 ? (
        <>
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
            Search Results
          </Typography>
          {products.map((product) => (
            <Card
              sx={productCardStyle}
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                sx={productImageStyle}
                image={product.img}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{product.name}</Typography>
                <Typography variant="body1">
                  USD {product.price.toFixed(2)}
                </Typography>
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
        </>
      ) : (
        <Typography sx={{ marginBottom: 2 }}>Nenhum produto encontrado.</Typography>
      )}
    </Box>
  );
};

/* ==========================
   Componente: Produtos Populares
   ========================== */
export const PopularProducts: React.FC<{ products: any[] }> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Popular Products
      </Typography>
      {products.map((product) => (
        <Card
          sx={productCardStyle}
          key={product.id}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <CardMedia
            component="img"
            sx={productImageStyle}
            image={product.img}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="subtitle1">{product.name}</Typography>
            <Typography variant="body1">
              USD {product.price.toFixed(2)}
            </Typography>
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
  );
};
