import { SxProps } from "@mui/material";

// Estilos da Navbar
export const appBarStyle: SxProps = {
  backgroundColor: "white",
};


export const searchBarContainerStyle: SxProps = {
  margin: "16px auto",
  maxWidth: "500px",
  display: "block",
  position: "fixed",
  top: "44px",
  left: 0,
  width: "100%",
  backgroundColor: "white",
  zIndex: 10,
  padding: "8px",
};


export const searchFieldStyle: SxProps = {
  left: 20,
  width: "90%",
  borderRadius: "20px",
  backgroundColor: "#f5f5f5",
  "& fieldset": { border: "none" }, 
};


export const contentContainerStyle: SxProps = {
  marginTop: "120px",
  padding: 2,
};

export const emptySearchSpaceStyle: SxProps = {
  marginBottom: "16px",
  height: "150px",
};
export const productCardStyle: SxProps = {
  display: "flex",
  marginBottom: 2,
};

export const productImageStyle: SxProps = {
  width: 100,
};
