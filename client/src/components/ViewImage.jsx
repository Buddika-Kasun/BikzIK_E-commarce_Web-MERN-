import { IoClose } from "react-icons/io5";

const ViewImage = ({url, close}) => {
    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
            <div className="bg-white max-w-md max-h-[70vh] w-full p-2 pt-0 rounded-md">
                <button
                    onClick={close}
                    className="block w-fit ml-auto hover:text-red-400 py-1"
                >
                    <IoClose size={25} />
                </button>
                <img src={url} alt="Full screen view" className="w-full h-full" />
            </div>
        </section>
    );
}

export default ViewImage;