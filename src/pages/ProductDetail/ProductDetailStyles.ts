import { SxProps } from "@mui/material";
import { CSSProperties } from "react";

// Estilo da AppBar (barra superior)
export const appBarStyle: SxProps = {
  backgroundColor: "white",
};

// Estilo do container principal
export const mainContainerStyle: SxProps = {
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
};

// Estilo da área do produto
export const productContainerStyle: SxProps = {
  marginTop: "64px",
  padding: 2,
};

// Estilo do preço do produto
export const productPriceStyle: SxProps = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#0ACF83",
};

// Estilo do nome do produto
export const productTitleStyle: SxProps = {
  fontWeight: "bold",
  marginBottom: 2,
  fontSize: "28px",
};

// Estilo das abas (Overview e Features)
export const tabsStyle: SxProps = {
  marginBottom: 2,
  "& .MuiTabs-indicator": { backgroundColor: "#0ACF83" },
};

// Estilo do card da imagem do produto
export const productImageCardStyle: SxProps = {
  borderRadius: "16px",
  marginBottom: 2,
};

// Estilo da seção de reviews
export const reviewsContainerStyle: SxProps = {
  marginBottom: 2,
};

// Estilo de cada review (comentário)
export const reviewCardStyle: SxProps = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  marginBottom: "16px",
  padding: "12px",
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
};

// Estilo da imagem do usuário no review


// Estilo do carrossel de produtos relacionados
export const relatedProductsContainerStyle: SxProps = {
  marginTop: 4,
};

// Estilo do botão Add to Cart fixo na parte inferior
export const addToCartButtonContainerStyle: SxProps = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  backgroundColor: "white",
  padding: "16px",
  boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
  justifyContent: "center",
};
export const reviewImageStyle: CSSProperties = {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
    flexShrink: 0,
  };