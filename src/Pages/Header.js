
import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/tooth.png";
import { isAuthenticated } from "../Components/Authenticator";

function Header() {
    const location = useLocation()?.pathname;

    return <header>
        <Link to="/home">
            <img alt="logo" width={50} height={50} src={logo}></img>
        </Link>
        {isAuthenticated() && (
            <>
                <Link to="/add">
                    <button style={{ backgroundColor: location === "/add" ? "gold" : "lime" }}>Add</button>
                </Link>
                <Link to="/today">
                    <button style={{ backgroundColor: location === "/today" ? "gold" : "cornflowerblue" }}>Today</button>
                </Link>
                <Link to="/calendar">
                    <button style={{ backgroundColor: location === "/calendar" ? "gold" : "cornflowerblue" }}>Calendar</button>
                </Link>
                <Link to="/patients">
                    <button style={{ backgroundColor: location === "/patients" ? "gold" : "cornflowerblue" }}>Patients</button>
                </Link>
                <Link to="/">
                    <button style={{ backgroundColor: location === "/" ? "gold" : "cornflowerblue" }}>Account</button>
                </Link>
            </>
        )}
        {!isAuthenticated() && (
            <Link to="/">
                <button style={{ backgroundColor: location === "/" ? "gold" : "cornflowerblue" }}>Sign In</button>
            </Link>
        )}
    </header>;
}

export default Header;
