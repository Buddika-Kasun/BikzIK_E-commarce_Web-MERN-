import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/fetchUserDetails";
import { setUser } from "../store/userSlice";

const ProfilePage = () => {

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const [userData, setUserData] = useState({});
    const [openAvatarEdit, setOpenAvatarEdit] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {

            setLoading(true);

            const response = await Axios({
                ...SummaryApi.update_user,
                data: userData
            });

            if (response.data.success) {
                toast.success("User details updated successfully.");

                const userData = await fetchUserDetails();
                dispatch(setUser(userData.data));
            }

        }
        catch (err) {
            AxiosToastError(err);
        }
        finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        setUserData({
            name: user.name,
            mobile: user.mobile,
            email: user.email,
        });
    }, [user]);

    return (
        <div className="flex flex-col items-center lg:flex-row">

            {/* Profile picture */}
            <div className="flex items-center jc flex-col w-520 lg:w-[50%] m-10 gap-4">
                <div className="flex w-full aspect-square items-center justify-center rounded-full overflow-hidden drop-shadow-lg">
                    {
                        user.avatar ? (
                            <img 
                                alt={user.name}
                                src={user.avatar}
                                className="w-full h-full"
                            />
                        ) : (
                            <FaRegUserCircle size={85} />
                        )
                    }
                </div>
                <button
                    className="text-xs border rounded-full px-4 py-1 mx-6 bg-slate-200 hover:bg-slate-300"
                    onClick={() => setOpenAvatarEdit(!openAvatarEdit)}
                >
                    Edit
                </button>
            </div>

            {
                openAvatarEdit && (
                    <UserProfileAvatarEdit close={() => setOpenAvatarEdit(false)} />
                )
            }

            {/* Name, Mobile, Email, Change PW */}
            <form className="my-4 grid gap-4 w-full" onSubmit={handleSubmit}>
                <div className="grid">
                    <label htmlFor="name" className="text-sm">Name : </label>
                    <input 
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        className="py-1 px-4 outline-none bg-white bg-opacity-40 focus-within:bg-opacity-100 border border-slate-200 focus-within:border-slate-400 rounded-md text-neutral-500"
                        //disabled
                        required
                        onChange={handleOnChange}
                    />
                </div>
                <div className="grid">
                    <label htmlFor="email" className="text-sm">Email : </label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={userData.email}
                        className="py-1 px-4 outline-none bg-white bg-opacity-40 focus-within:bg-opacity-100 border border-slate-200 focus-within:border-slate-400 rounded-md text-neutral-500"
                        //disabled
                        required
                        onChange={handleOnChange}
                    />
                </div>
                <div className="grid">
                    <label htmlFor="mobile" className="text-sm">Mobile : </label>
                    <input 
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={userData.mobile}
                        className="py-1 px-4 outline-none bg-white bg-opacity-40 focus-within:bg-opacity-100 border border-slate-200 focus-within:border-slate-400 rounded-md text-neutral-500"
                        //disabled
                        required
                        onChange={handleOnChange}
                    />
                </div>
                <button
                    className="border rounded-md px-4 py-1 mt-6 bg-slate-200 hover:bg-slate-300"
                    //onClick={}
                >
                    {
                        loading ? "Loading..." : "Save Changes"
                    }
                </button>
            </form>

        </div>
    );
}

export default ProfilePage;