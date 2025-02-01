import React, { useState } from "react";
import { Button, TextField, Typography, Link, Alert } from "@mui/material";
import useSignInStyles from "../styles/SignInStyles.ts";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.ts";

const SignIn: React.FC = () => {
  const classes = useSignInStyles();
  const { loginWithGoogle } = useAuth(); // Usa o contexto de autenticação
  const navigate = useNavigate(); // Hook para redirecionar

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError(""); // Limpa erros anteriores
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redireciona para a página Home após login bem-sucedido
    } catch (err: any) {
      setError("E-mail ou senha inválidos."); // Exibe o erro retornado pelo Firebase
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle(); // Aguarda o login
      navigate("/home"); // Redireciona após login bem-sucedido
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography sx={{ fontSize: "60px" }} className={classes.logo}>Audio</Typography>
      <Typography sx={{ marginBottom: "30px" }} className={classes.subtitle}>
        It's modular and designed to last
      </Typography>
      <form className={classes.form}>
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          className={classes.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          className={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
        <Link sx={{ color: "white" }} href="#" className={classes.link}>
          Forgot Password
        </Link>
        <Button
          sx={{ backgroundColor: "#0ACF83" }}
          variant="contained"
          fullWidth
          className={classes.signInButton}
          onClick={handleSignIn} // Chama a função de login
        >
          Sign In
        </Button>
        <Button
          sx={{ color: "white" }}
          fullWidth
          className={classes.googleButton}
          onClick={handleGoogleSignIn} // Chama a função corrigida
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </form>
      <Typography className={classes.footer}>
        Don’t have an account?{" "}
        <Link onClick={() => navigate("/signup")} sx={{ cursor: "pointer" }}>
          Sign Up here
        </Link>
      </Typography>
    </div>
  );
};

export default SignIn;
