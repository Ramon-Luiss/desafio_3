import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    Grid,
    Box,
    CircularProgress,
    Dialog,
} from "@mui/material";
import { ArrowBack, Close, FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/apiService.ts";
import CartIcon from "../components/CartIcon.tsx";

const AllProducts: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false); // Estado para exibir o modal
    const [filter, setFilter] = useState({
        category: "", // headphone ou headset
        sortBy: "popularity", // popularity, newest, oldest, highPrice, lowPrice
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data as any[]);
                setFilteredProducts(data as any[]); // Inicializa a lista filtrada
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const applyFilter = () => {
        let filtered = [...products];

        // Filtrar por categoria
        if (filter.category) {
            filtered = filtered.filter((product) => product.category === filter.category);
        }

        // Ordenar os produtos
        if (filter.sortBy === "popularity") {
            filtered.sort((a, b) => b.popularity - a.popularity);
        } else if (filter.sortBy === "newest") {
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        } else if (filter.sortBy === "oldest") {
            filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if (filter.sortBy === "highPrice") {
            filtered.sort((a, b) => b.price - a.price);
        } else if (filter.sortBy === "lowPrice") {
            filtered.sort((a, b) => a.price - b.price);
        }

        setFilteredProducts(filtered);
        setFilterOpen(false); // Fecha o modal após aplicar o filtro
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            {/* Navbar */}
            <AppBar position="fixed" color="transparent" elevation={0} sx={{ backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
                        All Products
                    </Typography>
                    <CartIcon>
                        
                    </CartIcon>
                </Toolbar>
            </AppBar>
            
            {/* Filtro */}
            <Box sx={{ marginTop: "64px", display: "flex", justifyContent: "center", padding: 2 }}>
                <Button
                color="inherit"
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{
                         color: "black",
                        textTransform: "none",
                        borderRadius: "10px",
                        padding: "8px",
                        width: "90%",
                        
                    }}
                    onClick={() => setFilterOpen(true)} // Abre o modal de filtro
                >
                    Filter
                </Button>
            </Box>

            {/* Lista de Produtos */}
            <Grid container spacing={2} sx={{ padding: "16px" }}>
                {filteredProducts.map((product) => (
                    <Grid item xs={6} sm={4} md={3} key={product.id}>
                        <Card
                            sx={{
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
                                <Typography variant="subtitle1" noWrap>
                                    {product.name}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    USD {product.price.toFixed(2)}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                                >
                                    ★{" "}
                                    {(
                                        product.reviews.reduce((sum, r) => sum + r.rating, 0) /
                                        product.reviews.length
                                    ).toFixed(1)}{" "}
                                    · {product.reviews.length} Reviews
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Modal de Filtro */}
            <Dialog sx ={{borderRadius: "36px"}}open={filterOpen} onClose={() => setFilterOpen(false)} fullWidth>
                <Box sx={{ padding: 3}}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography sx={{fontSize:"24px", fontWeight:"bold"}}  variant="h6">Filter</Typography>
                        <IconButton onClick={() => setFilterOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Filtro de Categoria */}
                    <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                        Category
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, marginTop: 1 }}>
                        <Button
                        sx={{backgroundColor: filter.category === "headphones" ? "#0ACF83" : "inherit",
                            color: filter.category === "headphones" ? "white" : "black",
                            "&.Mui-selected": {
                              color: "white", // Garante que o texto da aba ativa seja branco
                            },}}
                            variant={filter.category === "headphones" ? "contained" : "text"}
                            onClick={() => setFilter((prev) => ({ ...prev, category: "headphones" }))}
                        >
                            Headphone
                        </Button>
                        <Button
                        sx={{backgroundColor: filter.category === "headsets" ? "#0ACF83" : "inherit",
                            color: filter.category === "headsets" ? "white" : "black",
                            "&.Mui-selected": {
                              color: "white", // Garante que o texto da aba ativa seja branco
                            },}}
                            variant={filter.category === "headsets" ? "contained" : "text"}
                            onClick={() => setFilter((prev) => ({ ...prev, category: "headsets" }))}
                        >
                            Headset
                        </Button>
                    </Box>

                    {/* Filtro de Ordenação */}
                    <Typography variant="subtitle1" sx={{ marginTop: 3 }}>
                        Sort By
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, marginTop: 1, flexWrap: "wrap" }}>
                        {["popularity", "newest", "oldest", "highPrice", "lowPrice"].map((sort) => (
                            <Button
                            color="inherit"
                            sx={{backgroundColor: filter.sortBy === sort ? "#0ACF83" : "transparent",
                                color: filter.sortBy === sort ? "white" : "black",
                                "&.Mui-selected": {
                                  color: "white", // Garante que o texto da aba ativa seja branco
                                },}}
                                key={sort}
                                variant={filter.sortBy === sort ? "contained" : "outlined"}
                                onClick={() => setFilter((prev) => ({ ...prev, sortBy: sort }))}
                            >
                                {sort.charAt(0).toUpperCase() + sort.slice(1)}
                            </Button>
                        ))}
                    </Box>

                    {/* Botão Aplicar */}
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ marginTop: 3, backgroundColor: "#0ACF83" }}
                        onClick={applyFilter}
                    >
                        Apply Filter
                    </Button>
                </Box>
            </Dialog>
        </Box>
    );
};

export default AllProducts;
