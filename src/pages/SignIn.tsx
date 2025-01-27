import React from "react";
import { Button, TextField, Typography, Link } from "@mui/material";
import useSignInStyles from "../styles/SignInStyles.ts";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const classes = useSignInStyles();
  const { loginWithGoogle } = useAuth(); // Usa o contexto de autenticação
  const navigate = useNavigate(); // Hook para redirecionar

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle(); // Executa a autenticação com Google
      navigate("/home"); // Redireciona para a página Home após login
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.logo}>Audio</Typography>
      <Typography className={classes.subtitle}>
        It's modular and designed to last
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          className={classes.input}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          className={classes.input}
        />
        <Link href="#" className={classes.link}>
          Forgot Password
        </Link>
        <Button
          variant="contained"
          fullWidth
          className={classes.signInButton}
        >
          Sign In
        </Button>
        <Button
          fullWidth
          className={classes.googleButton}
          onClick={handleGoogleSignIn} // Chama a função de login com Google
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </form>
      <Typography className={classes.footer}>
        Didn’t have any account?{" "}
        <Link href="#">Sign Up here</Link>
      </Typography>
    </div>
  );
};

export default SignIn;
