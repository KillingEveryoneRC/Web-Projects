import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Successfully registered!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleRegister}>
                <h2>Sign up</h2>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Submit</button>

                {error && <p style={{ color: "#ff6961" }}>{error}</p>}

                <p>
                    Or <Link to="/login">Log in</Link> if you already have an account
                </p>
            </form>
        </div>
    );
};

export default Register;
