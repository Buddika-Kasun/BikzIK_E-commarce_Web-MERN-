import { IoClose } from "react-icons/io5";
import { BsPatchQuestionFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";

const NotLogin = ({close}) => {

    const navigate = useNavigate();

    const redirectToLoginPage = () => {
        if (close) close();
        navigate("/login");
    };

    const redirectToRegisterPage = () => {
        if (close) close();
        navigate("/register");
    };

    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
            <div className="bg-white max-w-md w-full p-4 rounded-md">
                <div className="flex items-center justify-center">
                    <h2 className="font-semibold flex items-center gap-2">
                        <BsPatchQuestionFill className="text-2xl" />
                        Guest Login
                    </h2>
                    <Link
                        className="w-fit ml-auto hover:text-red-400"
                        onClick={close}
                        to={'/'}
                    >
                        <IoClose size={25} />
                    </Link>
                </div>
                <div className="my-5">
                    <p>
                        Thank you for choosing to shop at BikzIK Online.!
                    </p>
                    <p className="text-sm text-slate-400">
                        Please Login or Sign Up to proceed.
                    </p>
                </div>
                <div className="w-fit ml-auto flex items-center gap-4">
                    <button 
                        className="px-4 py-1 border-[1.5px] rounded border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white"
                        onClick={redirectToLoginPage}
                    >
                        Login
                    </button>
                    <button
                        className="px-4 py-1 border-[1.5px] rounded border-green-500 text-green-500 font-semibold hover:bg-green-500 hover:text-white"
                        onClick={redirectToRegisterPage}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </section>
    );
}

export default NotLogin;