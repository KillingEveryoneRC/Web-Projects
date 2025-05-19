import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

// Pages
import Home from "./pages/Home";
import Vacancies from "./pages/Vacancies";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

import "./App.css";

function App() {
    const [user, setUser] = useState(null);

    // Listen for auth changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <div className="navbar">
                <Link to="/" className="logo">JobFinder</Link>

                <div className="menu">
                    <Link to="/">Main</Link>
                    <Link to="/vacancies">Vacancies</Link>

                    {!user && <Link to="/login">Login</Link>}
                    {user && <Link to="/profile">Profile</Link>}
                </div>
            </div>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vacancies" element={<Vacancies />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {user && <Route path="/profile" element={<Profile />} />}
            </Routes>

            <footer>
                <p>&copy; 2025 JobFinder. All rights reserved.</p>
            </footer>
        </Router>
    );
}

export default App;
