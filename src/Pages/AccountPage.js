import { useDispatch } from "react-redux";
import { setCurrentUser } from "../Redux/user";

function AccountPage() {
    const dispatch = useDispatch()

    const signout = () => {
        localStorage.removeItem('token'); dispatch(setCurrentUser(null));
    }

    return <div className="page">
        <button type="button" onClick={() => { signout() }}>Sign Out</button>
    </div>;
}

export default AccountPage;
