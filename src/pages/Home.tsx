import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiService.ts";



const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleSearchClick = () => {
    navigate("/Search");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data as any[]);
      } catch (error) {
        console.error("Erro ao carregar os produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography marginLeft={"110px"} variant="h6" sx={{ flexGrow: 1 }}>
            Audio
          </Typography>
          {user && <Avatar alt={user.displayName} src={user.photoURL} />}
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <div style={{ marginTop: "64px",padding: "16px" }}>
        <Typography variant="subtitle1">
          Hi, {user ? user.displayName : "User"}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          What are you looking for today?
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search headphone"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSearchClick}
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

      {/* Featured Products */}
      <div style={{ padding: "16px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Featured Products
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/all-products")}
          >
            See All
          </Button>
        </div>
        <div style={{ display: "flex", overflowX: "auto", gap: "16px" }}>
          {products.slice(0, 5).map((product) => (
            <Card
              key={product.id}
              sx={{
                minWidth: 150,
                borderRadius: "16px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia
                component="img"
                height="140"
                image={product.img}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="subtitle1">{product.name}</Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  USD {product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}
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
