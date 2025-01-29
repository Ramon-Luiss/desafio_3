import { makeStyles } from "@mui/styles";

const useSignInStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "url('desafio_3/background-0.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#ffffff",
  },
  logo: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "300",
    marginBottom: "32px",
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
    textAlign: "right",
    color: "#00C853",
    textDecoration: "none",
  },
  signInButton: {
    backgroundColor: "#00C853",
    color: "#ffffff",
    fontWeight: "bold",
    padding: "12px",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#00B342",
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
      color: "#00C853",
      textDecoration: "none",
    },
  },
});

export default useSignInStyles;
