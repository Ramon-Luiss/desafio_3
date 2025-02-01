import React from "react";
import { Button, Typography, Box } from "@mui/material";
import useSignInStyles from "../styles/SignInStyles.ts";
import { useNavigate } from "react-router-dom";

const AccountCreated: React.FC = () => {
  const classes = useSignInStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Typography className={classes.logo}>Audio</Typography>
      <Typography className={classes.subtitle}>
        Conta criada com sucesso!
      </Typography>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography>
          <Button
            onClick={() => navigate("/")}
            sx={{
              backgroundColor:"#0ACF83",
              cursor: "pointer",
              color: "white",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Voltar para tela de login.
          </Button>
        </Typography>
      </Box>
    </div>
  );
};

export default AccountCreated;
