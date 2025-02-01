import React, { useState } from "react";
import { Button, TextField, Typography, Link, Alert } from "@mui/material";
import useSignInStyles from "../styles/SignInStyles.ts";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.ts";

const SignUp: React.FC = () => {
  const classes = useSignInStyles();
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/account-created"); // Redireciona para a página de sucesso
    } catch (err: any) {
      setError("Este e-mail ja foi cadastrado.");
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
      <Typography className={classes.logo}>Audio</Typography>
      <Typography className={classes.subtitle}>
        Create your account
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
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          fullWidth
          className={classes.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}
        <Button
          sx={{ backgroundColor: "#0ACF83" }}
          variant="contained"
          fullWidth
          className={classes.signInButton}
          onClick={handleSignUp}
        >
          Sign Up
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
        Already have an account?{" "}
        <Link onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
          Sign In here
        </Link>
      </Typography>
    </div>
  );
};

export default SignUp;
