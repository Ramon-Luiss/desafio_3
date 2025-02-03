import { makeStyles } from "@mui/styles";

const useSignInStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: `
      linear-gradient(to bottom, rgba(18, 80, 56, 1), rgba(15, 161, 105, 0)), 
      url(${process.env.PUBLIC_URL}/background-0.png)`, // Degradê e imagem combinados
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "overlay", // Combina o degradê com a imagem
  },
  logo: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#fff",
    zIndex: 1,
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "300",
    marginBottom: "32px",
    color: "#fff",
    zIndex: 1
  },
  form: {
    width: "80%",
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
  },
  link: {
    fontSize: "14px",
    textAlign: "center",
    color: "#0ACF83",
  },
  signInButton: {
    backgroundColor: "#0ACF83",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "12px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#0ACF83",
    },
  },
  googleButton: {
    marginTop: "8px",
    backgroundColor: "#ffffff",
    color: "#000",
    fontWeight: "bold",
    border: "1px solid #d9d9d9",
    padding: "12px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  footer: {
    marginTop: "16px",
    fontSize: "14px",
    textAlign: "center",
    color: "#ffffff",
    "& a": {
      color: "#0ACF83",
      textDecoration: "none",
    },
  },
});

export default useSignInStyles;
