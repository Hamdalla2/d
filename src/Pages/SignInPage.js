import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signIn } from '../Redux/user';

function SignInPage() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorType, setErrorType] = useState("");
    const accountInput = useRef();
    const passwordInput = useRef();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const signInClicked = (e) => {
        e.preventDefault();
        setErrorType("")
        axios.post("http://localhost:5000/api/users/login", { email: account, password })
            .then(function (response) {
                localStorage.setItem("token", response.data.token); dispatch(signIn(response.data.token)); navigate("/");
            })
            .catch(function (error) { setMessage(error.response.data.msg); setErrorType(error.response.data.type); });
    }

    useEffect(() => {
        if (errorType === "account") {
            accountInput.current.className = "error"
        } else {
            accountInput.current.className = "correct";
            passwordInput.current.className = errorType === "password" ? "error" : "correct";
        }
    }, [errorType])

    return <div className="page">
        <form onChange={() => { setMessage(""); accountInput.current.className = ""; passwordInput.current.className = "" }} onSubmit={(e) => signInClicked(e)} style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", alignItems: "center", justifyContent: "center" }}>
            <label htmlFor="signin_account">Account</label>
            <input id="signin_account" type="text" ref={accountInput} value={account} onChange={(e) => setAccount(e.target?.value)}></input>
            <div className="spacer"></div>
            <label htmlFor="signin_password">Password</label>
            <input id="signin_password" type="password" ref={passwordInput} value={password} onChange={(e) => setPassword(e.target?.value)}></input>
            <div className="spacer"></div>
            <input type="submit" value="Sign In"></input>
            <div className="spacer"></div>
            <div className="error" style={{ height: "20px" }}>{message}</div>
        </form>
    </div>;
}

export default SignInPage;
