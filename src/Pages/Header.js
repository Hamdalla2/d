
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/tooth.png";
import { signIn } from "../Redux/user";

function Header() {
    const location = useLocation()?.pathname;
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(signIn(token))
    }, [dispatch, token])

    return <header>
        <Link to="/">
            <img alt="logo" width={50} height={50} src={logo}></img>
        </Link>
        {token && (
            <>
                <Link to="/add">
                    <button style={{ backgroundColor: location === "/add" ? "gold" : "lime" }}>Add</button>
                </Link>
                <Link to="/patients">
                    <button style={{ backgroundColor: location === "/patients" ? "gold" : "cornflowerblue" }}>Patients</button>
                </Link>
                <Link to="/calendar">
                    <button style={{ backgroundColor: location === "/calendar" ? "gold" : "cornflowerblue" }}>Calendar</button>
                </Link>
                <Link to="/today">
                    <button style={{ backgroundColor: location === "/today" ? "gold" : "cornflowerblue" }}>Today</button>
                </Link>
                <Link to="/account">
                    <button style={{ backgroundColor: location === "/account" ? "gold" : "cornflowerblue" }}>Account</button>
                </Link>
            </>
        )}
        {!token && (
            <Link to="/signin">
                <button style={{ backgroundColor: location === "/signin" ? "gold" : "cornflowerblue" }}>Sign In</button>
            </Link>
        )}
    </header>;
}

export default Header;
