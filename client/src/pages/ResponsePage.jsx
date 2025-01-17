import { Link, useLocation } from "react-router-dom";
import { GiConfirmed, GiCancel } from "react-icons/gi";

const ResponsePage = () => {

    const location = useLocation();

    return (
        <section className="p-4 flex flex-col items-center gap-8">
            {
                location?.state?.text && (
                    location?.state?.text === "success" ? (
                    <div className="w-full max-w-sm bg-green-200 px-4 py-6 rounded flex flex-col items-center gap-8">
                        <div className="text-green-700 font-semibold text-lg w-fit flex flex-col items-center gap-1">
                            <p>Order successfully</p>
                            <p><GiConfirmed size={30} /></p>
                        </div>
                        <Link
                            to={'/dashboard/my-orders'}
                            className="border-[1.5px] rounded border-green-700 text-green-700 hover:bg-green-700 hover:text-green-200 py-1 px-2 w-fit font-semibold text-sm"
                        >
                            Check my order
                        </Link>
                    </div>

                ) : (
                    <div className="w-full max-w-sm bg-red-200 px-4 py-6 rounded flex flex-col items-center gap-4">
                        <div className="text-red-700 font-semibold text-lg w-fit flex flex-col items-center gap-1">
                            <p>Order canceled</p>
                            <p><GiCancel size={30} /></p>
                        </div>
                    </div>
                )
            )}
            <Link 
                to={'/'}
                className="p-4 underline hover:text-green-700"
            >
                Go to Home
            </Link>
        </section>
    );
}

export default ResponsePage;