import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Redux/user";

function AccountPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const signout = () => {
        localStorage.removeItem('token'); dispatch(signIn("")); navigate("/signin");
    }

    return <div className="page">
        <button type="button" onClick={() => { signout() }}>Sign Out</button>
    </div>;
}

export default AccountPage;
