import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";


const UserMenu = () => {

    const user = useSelector((state) => state.user);

    return (
        <div>
            <div className="font-semibold">My Account</div>
            <div className="text-sm">{user.name || user.mobile}</div>

            <Divider />

            <div className="text-sm grid gap-2">
                <Link to={"/"}>My Orders</Link>
                <Link to={"/"}>Save Address</Link>
                <button className="bg-red-100 rounded p-1 hover:bg-red-200">Log Out</button>
            </div>
        </div>
    );
}

export default UserMenu;