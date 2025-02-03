import { SxProps } from "@mui/material";

// Estilo do container principal
export const mainContainerStyle: SxProps = {
  backgroundColor: "white",
  minHeight: "100vh",
  paddingBottom: "100px",
};

// Estilo da AppBar (barra superior)
export const appBarStyle: SxProps = {
  backgroundColor: "white",
};

// Estilo da lista de produtos no carrinho
export const productListContainerStyle: SxProps = {
  backgroundColor: "white",
  padding: 1,
  marginTop: "80px",
};

// Estilo do card do produto
export const productCardStyle: SxProps = {
  backgroundColor: "white",
  display: "flex",
  marginBottom: 1,
  maxHeight:117,
};

// Estilo da imagem do produto dentro do card
export const productImageStyle: SxProps = {
  width: 100,
  backgroundColor: "#f5f5f5",
};

// Estilo do botão de quantidade
export const quantityButtonStyle: SxProps = {
  height: "30px",
  color: "black",
  width: "30px",
};

// Estilo da área de rodapé fixo
export const footerContainerStyle: SxProps = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "90%",
  backgroundColor: "white",
  padding: "16px",
  boxShadow: "0px -2px 10px rgba(0,0,0,0.1)",
};

// Estilo do total de itens e preço
export const totalInfoStyle: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "16px",
};

// Estilo do botão de checkout
export const checkoutButtonStyle: SxProps = {
  maxWidth: "400px",
  margin: "0 auto",
  backgroundColor: "#0ACF83",
};
