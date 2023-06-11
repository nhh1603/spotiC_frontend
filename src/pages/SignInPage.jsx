import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import { useNavigate } from "react-router-dom";

import { FaSpotify } from "react-icons/fa";
import "../styles/SignInPage.css";

const genders = ["male", "female", "other"];

const SignInPage = () => {
    const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);

    // const schema = {
    //     email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
    //     password: passwordComplexity().required().label("Password"),
    // };

    // const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                setIsFetching(true);
                const url = process.env.REACT_APP_API_URL + "/submitSignIn";
                await axios.post(
                    url,
                    data
                );
                setIsFetching(false);
                toast.success("Account created successfully");
                // navigate("/login");
            } catch (error) {
                setIsFetching(false);
                if (error.response) {
                    toast.error(error.response.data);
                } else {
                    console.log(error);
                    toast.error("An error occurred");
                }
            }
        } else {
            toast.error("Please fix all validation errors");
        }
    };

    // const handleChange = ({ currentTarget: input }) => {
    //     const errorMessage = validateInput(input);
    //     if (errorMessage === "") {
    //         delete errors[input.name];
    //     } else {
    //         setErrors((errors) => ({ ...errors, [input.name]: errorMessage }));
    //     }
        
    //     setData((data) => ({ ...data, [input.name]: input.value }));
    // };

    // const validateInput = ({ name, value }) => {
    //     const obj = { [name]: value };
    //     const inputSchema = Joi.object({ [name]: schema[name] });
    //     const { error } = inputSchema.validate(obj);
    //     return error ? error.details[0].message : "";
    // };

    const navigate = useNavigate();

    const changeSignMode = () =>{
        // console.log("change to Sign Up page")
        navigate('/signup');
    }

    

    return (
        <div className="signin-wapper">
            <div className="signin-container">
                <div className="signin-logo">
                    <FaSpotify 
                        className="icon"
                        size="50px"
                        color="#1DB954"
                    />
                    <h1>SpotiC</h1>
                </div>
                <div className="change-sign-mode">
                    Not registered yet?{" "}
                    <span className="change-to-SignUp" onClick={changeSignMode}>
                        Sign Up
                    </span>
                </div>
                <form onSubmit={handleSignIn} className="signin-form">
                    <h2>Sign in with your email address</h2>
                    <div className="signin-form-input">
                        <p>Email address</p>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter your email"
                            name="email"
                            value={data.email}
                            // onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="signin-form-input">
                        <p>Password</p>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter your password"
                            name="password"
                            value={data.password}
                            // onChange={handleChange}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    {/* <div className="signin-form-input">
                        <p>What should we call you?</p>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Enter a profile name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>  */}
                    <div className="signin-form-submit">
                        <button type="submit" className="btn btn-submit">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignInPage;