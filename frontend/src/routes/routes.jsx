import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";

import Home from "../pages/home/home";
import Cart from "../pages/cart/cart";
import Login from "../pages/login/login";
import NotFound from "../pages/notfound/notfound";
import Dashboard from "../pages/dashboard/dashboard";

export default function Routers() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} /> 
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};