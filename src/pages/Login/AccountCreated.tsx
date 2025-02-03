import React from "react";
import { Button, Typography, Box } from "@mui/material";
import useSignInStyles from "./SignInStyles.ts";
import { useNavigate } from "react-router-dom";
import { buttonBackLogin } from "./LoginStyles.ts";


const AccountCreated: React.FC = () => {
  const classes = useSignInStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <Typography sx={{ fontSize: "60px" }} className={classes.logo}>Audio</Typography>
      <Typography sx={{ marginBottom: "30px" }} className={classes.subtitle}>
        Conta criada com sucesso!
      </Typography>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        <Typography>
          <Button
            onClick={() => navigate("/")}
            sx={buttonBackLogin}
          >
            Voltar para tela de login.
          </Button>
        </Typography>
      </Box>
    </div>
  );
};

export default AccountCreated;
