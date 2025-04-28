import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Vacancies from "./pages/Vacancies";
import Profile from "./pages/Profile";
import "./App.css";

function App() {
    return (
        <Router>
            <div className="navbar">
                <div><Link to="/" className="logo">JobFinder</Link></div>
                <div className="menu">
                    <Link to="/">Main</Link>
                    <Link to="/vacancies">Vacancies</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vacancies" element={<Vacancies />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>

            <footer>
                <p>&copy; 2025 JobFinder. All rights reserved.</p>
            </footer>
        </Router>
    );
}

export default App;
