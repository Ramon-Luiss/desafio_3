import React, { useState } from "react";
import { Button, TextField, Typography, Link, Alert } from "@mui/material";
import useSignInStyles from "./SignInStyles.ts";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.ts";
import { buttonStyle } from "./LoginStyles.ts";

const SignUp: React.FC = () => {
  const classes = useSignInStyles();
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Expressão Regular para validar e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = async () => {
    setError("");

    // Validação do e-mail
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Verificar se as senhas correspondem
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/account-created"); // Redireciona para a página de sucesso
    } catch (err: any) {
      setError("This email is already registered.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/home");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography sx={{ fontSize: "60px" }} className={classes.logo}>
        Audio
      </Typography>
      <Typography sx={{ marginBottom: "30px" }} className={classes.subtitle}>
        Create your account
      </Typography>

      <form className={classes.form}>
        {/* Campo de E-mail */}
        <TextField
          variant="outlined"
          label="Email"
          fullWidth
          className={classes.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error && !emailRegex.test(email)}
          helperText={!emailRegex.test(email) ? "Invalid email format." : ""}
        />

        {/* Campo de Senha */}
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          fullWidth
          className={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Campo de Confirmação de Senha */}
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          fullWidth
          className={classes.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Exibir erro, se houver */}
        {error && (
          <Alert severity="error" sx={{ marginBottom: "16px" }}>
            {error}
          </Alert>
        )}

        {/* Botão Sign Up (Desativado se o email for inválido) */}
        <Button
          sx={buttonStyle}
          variant="contained"
          fullWidth
          className={classes.signInButton}
          onClick={handleSignUp}
           // Desativa o botão se o e-mail for inválido
        >
          Sign Up
        </Button>

        {/* Botão Sign in with Google */}
        <Button
          sx={{ color: "white" }}
          fullWidth
          className={classes.googleButton}
          onClick={handleGoogleSignIn}
        >
          <FcGoogle size={20} />
          Sign in with Google
        </Button>
      </form>

      {/* Link para a tela de login */}
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
