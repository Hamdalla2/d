
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/tooth.png";
import { isAuthenticated } from "../Components/Authenticator";

function Header() {
    const location = useLocation()?.pathname;
    const user = useSelector((state) => state.userReducer?.user)
    const authenticated = isAuthenticated(user)

    return <header>
        <Link to="/home">
            <img alt="logo" width={50} height={50} src={logo}></img>
        </Link>
        {authenticated && (
            <>
                <Link to="/add" className="header-link">
                    <button style={{ backgroundColor: location === "/add" ? "gold" : "lime" }}>Add</button>
                </Link>
                <Link to="/today" className="header-link">
                    <button style={{ backgroundColor: location === "/today" ? "gold" : "cornflowerblue" }}>Today</button>
                </Link>
                <Link to="/calendar" className="header-link">
                    <button style={{ backgroundColor: location === "/calendar" ? "gold" : "cornflowerblue" }}>Calendar</button>
                </Link>
                <Link to="/patients" className="header-link">
                    <button style={{ backgroundColor: location === "/patients" ? "gold" : "cornflowerblue" }}>Patients</button>
                </Link>
                <Link to="/" className="header-link">
                    <button style={{ backgroundColor: location === "/" ? "gold" : "cornflowerblue" }}>Account</button>
                </Link>
            </>
        )}
        {!authenticated && (
            <Link to="/" className="header-link">
                <button style={{ backgroundColor: location === "/" ? "gold" : "cornflowerblue" }}>Sign In</button>
            </Link>
        )}
    </header>;
}

export default Header;
