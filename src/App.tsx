import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import SignIn from "./pages/Login/SignIn.tsx";
import Search from "./pages/Search/Search.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import AllProducts from "./pages/AllProducts/AllProducts.tsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.tsx";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart.tsx";
import CartProvider from "./context/CartContext.tsx";
import SignUp from "./pages/Login/SignUp.tsx";
import AccountCreated from "./pages/Login/AccountCreated.tsx";
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <SignIn />;
};

const App = () => (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account-created" element={<AccountCreated />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/all-products"
            element={
              <ProtectedRoute>
                <AllProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <ShoppingCart />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  </AuthProvider>
);

export default App;
