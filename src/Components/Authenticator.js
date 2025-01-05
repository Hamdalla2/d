import { jwtDecode } from "jwt-decode";

export const validateToken = () => {
    try {
        const decoded = jwtDecode(localStorage.getItem("token"));
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};


export const isAuthenticated = (user) => {
    return validateToken() && user;
};