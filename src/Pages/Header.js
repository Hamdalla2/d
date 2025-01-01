
import { Link } from "react-router-dom";
function Header() {
    return <header style={{ position: "sticky", display: "flex", alignItems: "center" }}>
        <Link to="/">
            <img alt="logo" width={50} height={50} src="https://lh4.googleusercontent.com/proxy/X1ggCm_dY7EVJsjmH7tL-L8F3QOg5atSBi3fYZa_XynlWW5B6J3nbEi-iDZz834ff6vsEIph0cyF1yrf0crgPqzg_e63jREZBKRVS-f6RH0U5Tt3-A_sC8DbhCiRB768_ZLBtA"></img>
        </Link>
        <Link to="/">
            <button>Sign In</button>
        </Link>
    </header>;
}

export default Header;
