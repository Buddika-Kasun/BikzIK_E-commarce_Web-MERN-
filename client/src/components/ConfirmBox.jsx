import { IoClose } from "react-icons/io5";


const ConfirmBox = ({confirm, cancel, close, text}) => {
    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
            <div className="bg-white max-w-md w-full p-4 rounded-md">
                <div className="flex items-center justify-center">
                    <h2 className="font-semibold">
                        Permanent Delete
                    </h2>
                    <button
                        className="w-fit ml-auto hover:text-red-400"
                        onClick={close}
                    >
                        <IoClose size={25} />
                    </button>
                </div>
                <div className="my-5">
                    <p>
                        Are you sure&nbsp;
                        <span className="text-red-400">permanently delete</span>&nbsp;
                        <span className="font-semibold">{text}</span>&nbsp;
                        ?
                    </p>
                    <p className="text-sm text-slate-400">
                        This action cant be undone!
                    </p>
                </div>
                <div className="w-fit ml-auto flex items-center gap-4">
                    <button 
                        className="px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-1 border rounded border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        onClick={confirm}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ConfirmBox;