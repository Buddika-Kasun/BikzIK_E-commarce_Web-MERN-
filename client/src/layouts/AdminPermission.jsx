import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermission = ({ children }) => {
    const user = useSelector((state) => state.user);

    return (
        <>
            {
                !isAdmin(user.role) ? (
                    <div className="text-red-600 bg-red-100 p-4 ml-2">
                        You do not have permission to access this page.
                    </div>
                ) : (
                    children
                )
            }
        </>
    );
};

export default AdminPermission;
