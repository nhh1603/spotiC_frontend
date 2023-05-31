import React, { useState } from "react"
import "../styles/Auth.css"
import axios from "axios"

function Auth () {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [authMode, setAuthMode] = useState("signin");
    const [formDataSignIn, setFormDataSignIn] = useState({
        email: "",
        password: "",
    });
    const [formDataSignUp, setFormDataSignUp] = useState({
        name: "",
        email: "",
        password: "",
    });

    const changeAuthMode = async () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin")
    }

    const handleFormSubmitSignIn = async (e) => {
        e.preventDefault();
    }

    const handleFormSubmitSignUp = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(apiUrl + '/submitSignUp', formDataSignUp);

            console.log('Form submitted successfully');
            //Reset form data
            setFormDataSignUp({ name: "", email: "", password: "" });
        } catch (error) {
            console.error(error);
            console.log(formDataSignUp);
        }
    };

    const handleInputChangeSignIn = (e) => {
        const { name, value } = e.target;
        setFormDataSignIn({ ...formDataSignIn, [name]: value });
    };

    const handleInputChangeSignUp = (e) => {
        const { name, value } = e.target;
        setFormDataSignUp({ ...formDataSignUp, [name]: value });
    };

    if (authMode === "signin") {
        return (
            <div className="Auth-form-container">
                <form className="Auth-form" onSubmit={handleFormSubmitSignIn}>
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="text-center">
                            Not registered yet?{" "}
                            <span className="Auth-form-link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                name="email"
                                value={formDataSignIn.email}
                                onChange={handleFormSubmitSignIn}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                name="password"
                                value={formDataSignIn.password}
                                onChange={handleFormSubmitSignIn}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                        <p className="text-center mt-2">
                            Forgot <a href="#">password?</a>
                        </p>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleFormSubmitSignUp}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign In</h3>
                    <div className="text-center">
                        Already registered?{" "}
                        <span className="Auth-form-link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            name="name"
                            value={formDataSignUp.name}
                            onChange={handleInputChangeSignUp}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            name="email"
                            value={formDataSignUp.email}
                            onChange={handleInputChangeSignUp}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name="password"
                            value={formDataSignUp.password}
                            onChange={handleInputChangeSignUp}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Auth;
