import { useState } from "react";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { FaCloudUploadAlt, FaEdit } from "react-icons/fa";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const UploadCategoryModel = ({close, fetchData, mode}) => {

    const [data, setData] = useState({
        name: mode.category?.name || "",
        image: mode.category?.image || "",
    });

    const [previewUrl, setPreviewUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImage = (e) => {
        const imageFile = e.target.files[0];

        if(!imageFile){
            toast.error("Please select an avatar!");
            return;
        }

        // Allowed image types
        const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

        if (!allowedTypes.includes(imageFile.type)) {
            toast.error("Invalid file type! Please upload a JPEG, PNG, GIF, or WEBP image.");
            return;
        }

        setData((prevData) => ({
            ...prevData,
            image: imageFile,
        }));
        
        setPreviewUrl(URL.createObjectURL(imageFile));

    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!data.name || !data.image) {
            toast.error("Please fill all required fields!");
            return;
        }

        try{
            setLoading(true);
            
            let uploadedImageUrl = data.image;
            
            if (previewUrl) {
                const imgResponse = await uploadImage(data.image);
                uploadedImageUrl = imgResponse.data.data.url;
            }

            const payload = {
                name: data.name,
                image: uploadedImageUrl,
            };

            let response;

            if (mode.status === "create") {
                response = await Axios({
                    ...SummaryApi.add_category,
                    data: payload
                });
            }
            
            if (mode.status === "update") {

                const newPayload = {
                    ...payload,
                    categoryId: mode.category._id,
                }

                response = await Axios({
                    ...SummaryApi.update_category,
                    data: newPayload
                });
            }
            
            if(response.data.success) {

                if(mode.status === "create") {
                    toast.success("Category added successfully!");
                }
                else if(mode.status === "update") {
                    toast.success("Category updated successfully!");
                }

                setData({
                    name: "",
                    image: ""
                });

                close();
                fetchData();
            }
    

        }
        catch(error){
            console.log(error);
            AxiosToastError(error);
        }
        finally{
            setLoading(false);
        }

    }

    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
            <div className="bg-white max-w-xl w-full p-4 rounded-md">
                <div className="flex items-center justify-center">
                    <h2 className="font-semibold">
                        {
                            mode.status === "create"? "Add Category" : "Edit Category"
                        }
                    </h2>
                    <button
                        className="w-fit ml-auto hover:text-red-400"
                        onClick={close}
                    >
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="grid gap-2 my-3" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="name" className="text-sm">Name : </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value })}
                            placeholder="Enter category name"
                            className="py-1 px-4 outline-none bg-slate-300 bg-opacity-40 focus-within:bg-opacity-60 border border-slate-400 focus-within:border-slate-500 rounded-md text-neutral-500"
                            required
                        />
                    </div>
                    <div className="grid gap-1">
                        <p className="text-sm">Image : </p>
                        <div className="flex gap-4 flex-col lg:flex-row items-center">
                            <div className="bg-slate-300 border bg-opacity-40 border-slate-400 w-full lg:w-36 aspect-square rounded-md flex items-center justify-center overflow-hidden relative">
                                { 
                                    previewUrl ? (
                                        <img src={previewUrl} className="w-full h-full"/>
                                    ) : (
                                        data.image ? (
                                            <img
                                                src={data.image} 
                                                className="w-full h-full" // object-scale-down"
                                            />
                                        ) : (
                                            <label htmlFor="uploadCategoryImage" className="w-full h-full">
                                                <div
                                                    className={`${data.name ? 'cursor-pointer opacity-40': 'opacity-20'} w-full h-full flex items-center justify-center`}
                                                >
                                                    <FaCloudUploadAlt size={50} />
                                                     
                                                </div>
                                                <input
                                                    id="uploadCategoryImage"
                                                    type="file"
                                                    accept="image/*"
                                                    hidden
                                                    className="hidden"
                                                    disabled={!data.name}
                                                    onChange={handleImage}
                                                />
                                            </label>
                                        )
                                    )
                                }
                                {
                                    (previewUrl || data.image) && (
                                        <label htmlFor="editImage">
                                            <div
                                                className={`absolute bottom-0 right-0 bg-white bg-opacity-60 flex p-1 rounded-tl-md ${data.name ? 'opacity-100 cursor-pointer' : 'opacity-50'}`}
                                            >
                                                <FaEdit />
                                            </div>
                                            <input
                                                id="editImage"
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                className="hidden"
                                                disabled={!data.name}
                                                onChange={handleImage}
                                            />
                                        </label>
                                    )
                                }
                            </div>
                            
                        </div>
                    </div>
                    <button
                        disabled={!data.name || !data.image}
                        className={`rounded-md py-1 mt-4 ${(data.name && data.image) ? 'bg-green-500 text-white hover:bg-green-600 cursor-pointer' : 'bg-slate-300'} ${loading ? 'cursor-wait' : 'cursor-default' }`}
                    >
                        {
                            loading ? (
                                mode.status === "create" ? (
                                    "Creating..."
                                ) : (
                                    "Updating..."
                                )
                            ) : (
                                mode.status === "create"? (
                                    "Create Category"
                                ) : (
                                    "Update Category"
                                )
                            )
                        }
                    </button>
                </form>
            </div>
        </section>
    );
}

export default UploadCategoryModel;