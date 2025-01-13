import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { clearUser } from "../store/userSlice";
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi";
import toast from 'react-hot-toast';
import AxiosToastError from "../utils/AxiosToastError";
import { HiExternalLink } from "react-icons/hi";
import isAdmin from "../utils/isAdmin";
import { useGlobalContext } from "../provider/GlobalProvider";

const UserMenu = ({close}) => {

    const { setLogin } = useGlobalContext();


    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = async() => {
        try{

            const response = await Axios({
                ...SummaryApi.logout
            });

            if(response.data.success) {

                dispatch(clearUser());
                localStorage.clear();
                setLogin(false);

                toast.success(response.data.message);


                if(close) {
                    close();
                }

                navigate('/login');
            }

        }
        catch(err){
            console.error(err);
            AxiosToastError(err);
        }
    };

    const handleClose = () => {
        if(close) {
            close();
        }
    };

    return (
        <div className="w-full text-xl lg:text-sm relative">
            <div className="font-semibold mb-1">My Account</div>
            <div className="mb-4 py-2 lg:mb-0 lg:py-0 flex gap-2">
                <span className="max-w-52 text-ellipsis line-clamp-1">
                    {user.name || user.mobile}&nbsp;
                    <span className="text-sm text-red-600">
                        {user.role === 'ADMIN' && '(Admin)'}
                    </span>
                </span>
                <Link to={'/dashboard/profile'} onClick={handleClose} className="hover:text-primary-100 text-2xl lg:text-lg"><HiExternalLink /></Link>
            </div>

            <Divider />

            <div className="grid gap-2 lg:gap-1 pt-4 lg:pt-0">

                {
                    isAdmin(user.role) && (
                        <>
                            <Link
                                to={"/dashboard/category"}
                                onClick={handleClose}
                                className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200"
                            >
                                Category
                            </Link>

                            <Link
                                to={"/dashboard/sub-category"}
                                onClick={handleClose}
                                className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200"
                            >
                            Sub Category
                            </Link>

                            <Link
                                to={"/dashboard/upload-product"}
                                onClick={handleClose}
                                className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200"
                            >
                                Upload Product
                            </Link>

                            <Link
                                to={"/dashboard/admin-products"}
                                onClick={handleClose}
                                className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200"
                            >
                                Products
                            </Link>
                        </>
                    )
                }

                <Link
                    to={"/dashboard/orders"}
                    onClick={handleClose}
                    className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200"
                >
                    My Orders
                </Link>
                
                <Link
                    to={"/dashboard/address"}
                    onClick={handleClose}
                    className="rounded px-4 lg:px-2 bg-slate-200 lg:bg-transparent py-1 hover:bg-slate-200"
                >
                    Save Address
                </Link>
                
                <button
                    onClick={handleLogout}
                    className="bg-red-200 lg:bg-red-100 rounded p-1 mt-2 hover:bg-red-200 absolute bottom-5 w-full lg:relative lg:bottom-0"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default UserMenu;