import { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import passwordComplexity from "joi-password-complexity";
import { useNavigate } from "react-router-dom";

import { FaSpotify } from "react-icons/fa";
import "../styles/SignUpPage.css";

const genders = ["male", "female", "other"];

const SignUpPage = () => {
    const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
		gender: "",
	});
	const [errors, setErrors] = useState({});
	const [isFetching, setIsFetching] = useState(false);

    const schema = {
        email: Joi.string().email({ tlds: { allow: false } }).required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        name: Joi.string().required().label("Name"),
        gender: Joi.string().valid("male", "female", "other").required(),
    };

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                setIsFetching(true);
                const url = process.env.REACT_APP_API_URL + "/submitSignUp";
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

    const handleChange = ({ currentTarget: input }) => {
        const errorMessage = validateInput(input);
        if (errorMessage === "") {
            delete errors[input.name];
        } else {
            setErrors((errors) => ({ ...errors, [input.name]: errorMessage }));
        }
        
        setData((data) => ({ ...data, [input.name]: input.value }));
    };

    const validateInput = ({ name, value }) => {
        const obj = { [name]: value };
        const inputSchema = Joi.object({ [name]: schema[name] });
        const { error } = inputSchema.validate(obj);
        return error ? error.details[0].message : "";
    };

    return (
        <div className="signup-container">
            <div className="signup-logo">
                <FaSpotify 
                    className="icon"
                    size="40px"
                    color="#1DB954"
                />
                <h1>SpotiC</h1>
            </div>
            <form onSubmit={handleSignUp} className="signup-form">
                <h2>Sign up with your email address</h2>
                <div className="signup-form-input">
                    <p>What's your email?</p>
                    <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Enter your email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="signup-form-input">
                    <p>Create a password</p>
                    <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Create a password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="signup-form-input">
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
                </div> 
                <div className="signup-form-input-select">
                    <p>What's your gender?</p>
                    {/* <input id="gender-{type="radio" name="gender" value="male"></input>
                    <label  */}
                    {genders.map( value => {
                        const idGender = `gender-${value}`;
                        return (
                            <div className="select-gender">
                                <input id={idGender} name="gender" type="radio" value={value} onChange={handleChange} />
                                <label>{value}</label>
                            </div>
                        )
                    })}
                </div>
                <div className="signup-form-submit">
                    <button type="submit" className="btn btn-submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;