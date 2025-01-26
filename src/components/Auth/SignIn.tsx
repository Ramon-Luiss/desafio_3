import React from "react";
import { Button, TextField, Typography, Link } from "@mui/material";
import useSignInStyles from "../../styles/SignInStyles.ts";
import { FcGoogle } from "react-icons/fc";

const SignIn: React.FC = () => {
  const classes = useSignInStyles();

  const handleGoogleSignIn = () => {
    // Lógica de autenticação com o Google
    console.log("Google Sign In");
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
          onClick={handleGoogleSignIn}
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
