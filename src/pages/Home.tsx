import React from "react";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/AuthContext.tsx";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography marginLeft={"90px"} variant="h6" sx={{ flexGrow: 1 }}>
            Audio
          </Typography>
          {user && <Avatar alt={user.displayName} src={user.photoURL} />}
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <div style={{ padding: "16px" }}>
        <Typography variant="subtitle1">Hi, {user ? user.displayName : "User"}</Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          What are you looking for today?
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search headphone"
          fullWidth
          sx={{ marginTop: 2 }}
        />
      </div>

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{ marginBottom: 2 }}
      >
        <Tab label="Headphone" />
        <Tab label="Headset" />
      </Tabs>

      {/* Featured Product */}
      <Card
        sx={{
          display: "flex",
          margin: "16px",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="\image-5.png" // Substitua pelo caminho correto da imagem
          alt="TMA-2 Modular Headphone"
        />
        <CardContent>
          <Typography component="div" variant="h6" sx={{ fontWeight: "bold" }}>
            TMA-2 Modular Headphone
          </Typography>
          <Button variant="text" color="primary">
            Shop now →
          </Button>
        </CardContent>
      </Card>

      {/* Featured Products */}
      <div style={{ padding: "16px" }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Featured Products
        </Typography>
        <div style={{ display: "flex", overflowX: "auto", gap: "16px" }}>
          {/* Produto 1 */}
          <Card sx={{ minWidth: 150, borderRadius: "16px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardMedia
              component="img"
              height="140"
              image="\image-5.png" // Substitua pelo caminho correto da imagem
              alt="TMA-2 HD Wireless"
            />
            <CardContent>
              <Typography variant="subtitle1">TMA-2 HD Wireless</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                USD 350
              </Typography>
            </CardContent>
          </Card>

          {/* Produto 2 */}
          <Card sx={{ minWidth:150, borderRadius: "16px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <CardMedia
              component="img"
              height="140"
              image="\image-5.png" // Substitua pelo caminho correto da imagem
              alt="CO2 - Cable"
            />
            <CardContent>
              <Typography variant="subtitle1">CO2 - Cable</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                USD 25
              </Typography>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ marginTop: 4, marginBottom: 2 }}
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Home;
