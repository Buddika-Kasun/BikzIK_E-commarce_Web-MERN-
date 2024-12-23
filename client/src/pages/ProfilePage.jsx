import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";

const ProfilePage = () => {

    const user = useSelector(state => state.user);

    const [openAvatarEdit, setOpenAvatarEdit] = useState(false);

    return (
        <div>
            <div className="flex flex-col items-center gap-2">
                <div className="bg-red-400 flex w-24 h-24 items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
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
                    className="text-xs border rounded-full px-4 py-1 hover:bg-slate-200"
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

        </div>
    );
}

export default ProfilePage;