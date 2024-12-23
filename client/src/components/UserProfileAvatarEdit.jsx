import { FaRegUserCircle, FaUserEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";

const UserProfileAvatarEdit = ({close}) => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [image, setImage] = useState(null); // To store the selected image
    const [previewUrl, setPreviewUrl] = useState(""); // To store the preview URL
    const [loading, setLoading] = useState(false); // To store the loading

    const handleEditAvatar = (e) => {
        const file = e.target.files[0];

        if(!file){
            toast.error("Please select an avatar!");
            return;
        }

        // Allowed image types
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type! Please upload a JPEG, PNG, GIF, or WEBP image.");
            return;
        }

        setImage(file);
        setPreviewUrl(URL.createObjectURL(file));

    };

    const handleUploadAvatar = async(e) => {

        e.preventDefault();

        setLoading(true);

        if(!image){
            toast.error("Please select an new avatar!");
            //setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('avatar', image);

        try {
    
            const response = await Axios({
                ...SummaryApi.upload_avatar,
                data: formData
            }); 

            const newAvatar = response.data.data.avatar;

            dispatch(updateAvatar(newAvatar));

            toast.success("Avatar updated successfully!");

        }
        catch (err) {
            console.error(err);
            AxiosToastError(err);
        }
        finally {
            setLoading(false);
            setImage(null);
            setPreviewUrl("");
        }

    }

    // Cleanup the preview URL to avoid memory leaks
    useEffect(() => {
        return () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 flex items-center justify-center">
            <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center gap-2">
                <button
                    className="w-fit ml-auto hover:text-red-400"
                    onClick={close}
                >
                    <IoClose size={25} />
                </button>
                <div className={`bg-red-400 flex w-56 h-56 items-center justify-center rounded overflow-hidden border relative ${loading && 'cursor-wait'}`}>
                    {
                        previewUrl ? (
                            <img 
                                alt={user.name}
                                src={previewUrl}
                                className="w-full h-full"
                            />
                         ) : (
                            user.avatar ? (
                                <img 
                                    alt={user.name}
                                    src={user.avatar}
                                    className="w-full h-full"
                                />
                            ) : (
                                <FaRegUserCircle size={85} />
                            )
                        )
                    }
                    <form>
                        <label htmlFor="avatar">
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept="image/*"
                                className="hidden"
                                onChange={handleEditAvatar}
                                disabled={loading}
                            />
                            <div className={`absolute bottom-0 right-0 bg-white bg-opacity-60 flex p-1 rounded-tl-md ${loading ? 'cursor-wait' : 'cursor-pointer'}`}>
                                    <FaUserEdit size={20} />
                            </div>
                        </label>
                    </form>
                </div>
                <button
                    className={`text-sm border rounded-full px-4 py-1 bg-slate-200 ${!loading ? 'hover:bg-slate-300 cursor-pointer' : 'cursor-wait'}`}
                    onClick={handleUploadAvatar}
                    disabled={loading}
                >
                    {
                        loading ? (
                            "Uploading..."
                        ) : (
                            "Upload"
                        )
                    }
                </button>
            </div>
        </section>
    );
}

export default UserProfileAvatarEdit;