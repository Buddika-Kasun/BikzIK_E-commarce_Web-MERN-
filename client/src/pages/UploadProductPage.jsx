import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import AddField from "../components/AddField";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import successAlert from "../utils/SuccessAlert";

const UploadProductPage = () => {

    const [data, setData] = useState({
        name: "",
        price: "",
        discount: "",
        stock: "",
        description: "",
        unit: "",
        images: [],
        category: [],
        subCategory: [],
        more_details: {},
    });
    const [imageLoading, setImageLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [addField, setAddField] = useState(false);

    const [fieldName, setFieldName] = useState("");

    const allCategory = useSelector(state => state.product.allCategory);
    const allSubCategory = useSelector(state => state.product.allSubCategory);

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value });
    };

    const handleAddImage = (e) => {
        setData({...data, images: [...data.images, e.target.files[0]] });
    };

    const handleUploadImage = async(e) => {
        e.preventDefault();

        const img = e.target.files[0];

        if (!img) {
            toast.error("Please select an image!");
            return;
        }

        setImageLoading(true);
        const imageResponse = await uploadImage(img);

        setData((prev) => {
            return {
                ...prev,
                images: [...prev.images, imageResponse.data.data.url],
            }
        });
        setImageLoading(false);

    };

    const handleDeleteImage = (img) => {
        setData((prev) => {
            return {
                ...prev,    
                images: prev.images.filter((i) => i !== img),
            }
        });
    };

    const handleAddCategorySelected = (e) => {
        const value = e.target.value;
        const categoryDetails = allCategory.find((el) => el._id === value);
    
        // Check if the category already exists
        if (data.category.some((cat) => cat._id === value)) {
            toast.error("This category is already selected!"); // Show error message
            e.target.value = "";
            return; // Exit the function
        }
    
        // Add the category if it doesn't exist
        setData((prev) => {
            return {
                ...prev,
                category: [...prev.category, categoryDetails],
            };
        });

        e.target.value = "";
        
    };
    
    const handleRemoveCategorySelected = (categoryId) => {
        setData((prev) => {
            return {
                ...prev,
                category: prev.category.filter(el => el._id !== categoryId)
            }
        });
    };

    const handleAddSubCategorySelected = (e) => {
        const value = e.target.value;
        const subCategoryDetails = allSubCategory.find((el) => el._id === value);
    
        // Check if the category already exists
        if (data.subCategory.some((cat) => cat._id === value)) {
            toast.error("This sub category is already selected!"); // Show error message
            e.target.value = "";
            return; // Exit the function
        }
    
        // Add the category if it doesn't exist
        setData((prev) => {
            return {
                ...prev,
                subCategory: [...prev.subCategory, subCategoryDetails],
            };
        });

        e.target.value = "";
        
    };

    const handleRemoveSubCategorySelected = (subCategoryId) => {
        setData((prev) => {
            return {
                ...prev,
                subCategory: prev.subCategory.filter(el => el._id !== subCategoryId)
            }
        });
    };

    const handleAddField = () => {

        if(!fieldName) {
            toast.error("Please enter a field name!");
            return;
        }

        setData((prev) => {
            return {
                ...prev,
                more_details: {...prev.more_details, [fieldName]: "" },
            }
        });

        setFieldName("");

        setAddField(false);
    };

    const handleRemoveField = (fieldName) => {
        setData((prev) => {
            const keys = Object.keys(prev.more_details);
            const index = keys.indexOf(fieldName);
            keys.splice(index, 1);
            const newObj = {};
            keys.forEach(key => newObj[key] = prev.more_details[key]);
            return {
                ...prev,
                more_details: newObj,
            }
        });
    };

    const  handleSubmit = async(e) => {
        e.preventDefault();

        if (!data.images[0]){
            toast.error("Please upload at least one image!");
            return;
        }

        try{
            const response = await Axios({
                ...SummaryApi.add_product,
                data: data,
            });

            if(response.data.success){
                //toast.success("Product added successfully!");
                successAlert(response.data.message);
                setData({
                    name: "",
                    price: "",
                    discount: "",
                    stock: "",
                    description: "",
                    unit: "",
                    images: [],
                    category: [],
                    subCategory: [],
                    more_details: {},
                });
            }

        }
        catch(error){
            //console.log(error);
            AxiosToastError(error);
        }

    };

    return (
        <section>
            <div className="p-2 pt-4 shadow-md flex justify-between sticky top-28 lg:top-20 bg-blue-50 z-30">
                <h2 className="font-semibold">Upload Product</h2>
                {/* <button
                    className="text-sm border border-green-600 hover:bg-green-600 px-3 py-1 rounded-md text-green-600 hover:text-white "
                    onClick={() => setOpenUploadCategory(!openUploadCategory)}
                >
                    Add category
                </button> */}
            </div>
            <div className="p-4 pb-8">
                <form className="grid gap-3" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="grid">
                        <label htmlFor="name" className="form-label">Name :</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter product name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                        />
                    </div>

                    {/* Description */}
                    <div className="grid">
                        <label htmlFor="description" className="form-label">Description :</label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter product description"
                            value={data.description}
                            onChange={handleChange}
                            rows={3}
                            className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded resize-none"
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <p className="form-label">Image :</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                            {
                                data.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="border border-blue-300 bg-blue-100 rounded overflow-hidden cursor-pointer relative w-24 h-24 group"
                                        >
                                        <img
                                            src={image}
                                            alt="Product Image"
                                            className="h-24 w-24" 
                                            onClick={() => setImageUrl(image)}    
                                        />
                                        <div
                                            className="bg-red-500 bg-opacity-70 group-hover:bg-opacity-100 hover:bg-red-600 text-lg text-red-50 rounded-bl-md absolute top-0 right-0"
                                            onClick={() => handleDeleteImage(image)}
                                        >
                                            <IoClose />
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="border-[1.5px] h-24 w-24 text-sm border-blue-200 bg-blue-100 bg-opacity-60 px-2 py-1 rounded">
                                <label htmlFor="image">
                                    <div className="text-center text-gray-400 flex flex-col h-full items-center justify-center cursor-pointer">
                                        {
                                            imageLoading ? (
                                                <Loading />
                                            ) : (
                                                <>
                                                    <FaCloudUploadAlt size={35} />
                                                    <p>Upload Image</p>
                                                </>
                                            )
                                        }
                                    </div>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/png, image/jpeg"
                                        className="hidden"
                                        onChange={handleUploadImage}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="grid">
                        <label className="form-label">Category :</label>
                        <div className="bg-blue-100 bg-opacity-60 border-[1.5px] border-blue-200 rounded-md">
                            <div className="flex flex-wrap">
                                {
                                    data.category.map((category, index) => (
                                        <div
                                            key={index}
                                            className="bg-white bg-opacity-40 text-gray-500 pr-1 pl-2 m-1 rounded flex items-center gap-2"
                                        >
                                            {category.name}
                                            <div
                                                className="cursor-pointer text-red-400 hover:text-red-600"
                                                onClick={() => handleRemoveCategorySelected(category._id)}
                                            >
                                                <IoClose />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <select
                                className={`p-1 outline-none bg-blue-100 bg-opacity-60 focus-within:bg-opacity-100 ${data.category.length > 0 && 'border-t'} border-blue-200 focus-within:border-blue-300 rounded-md text-gray-400 w-full cursor-pointer`}
                                onChange={handleAddCategorySelected}
                            >
                                <option value={""} disabled selected>Select Category</option>
                                {
                                    allCategory.map((category, index) => (
                                        <option
                                            key={index}
                                            value={category?._id}
                                        >
                                            {category?.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Sub category */}
                    <div className="grid">
                        <label className="form-label">Sub Category :</label>
                        <div className="bg-blue-100 bg-opacity-60 border-[1.5px] border-blue-200 rounded-md">
                            <div className="flex flex-wrap">
                                {
                                    data.subCategory.map((subCategory, index) => (
                                        <div
                                            key={index}
                                            className="bg-white bg-opacity-40 text-gray-500 pr-1 pl-2 m-1 rounded flex items-center gap-2"
                                        >
                                            {subCategory.name}
                                            <div
                                                className="cursor-pointer text-red-400 hover:text-red-600"
                                                onClick={() => handleRemoveSubCategorySelected(subCategory._id)}
                                            >
                                                <IoClose />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <select
                                className={`p-1 outline-none bg-blue-100 bg-opacity-60 focus-within:bg-opacity-100 ${data.subCategory.length > 0 && 'border-t'} border-blue-200 focus-within:border-blue-300 rounded-md text-gray-400 w-full cursor-pointer`}
                                onChange={handleAddSubCategorySelected}
                            >
                                <option value={""} disabled selected>Select Sub Category</option>
                                {
                                    allSubCategory.map((subCategory, index) => (
                                        <option
                                            key={index}
                                            value={subCategory?._id}
                                        >
                                            {subCategory?.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    {/* Unit */}
                    <div className="grid">
                        <label htmlFor="unit" className="form-label">Unit :</label>
                        <input
                            type="text"
                            id="unit"
                            name="unit"
                            placeholder="Enter product unit"
                            value={data.unit}
                            onChange={handleChange}
                            className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                        />
                    </div>

                    {/* Stock */}
                    <div className="grid">
                        <label htmlFor="stock" className="form-label">Number of Stock :</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            placeholder="Enter product stock"
                            value={data.stock}
                            onChange={handleChange}
                            required
                            className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                        />
                    </div>

                    {/* Price */}
                    <div className="grid">
                        <label htmlFor="price" className="form-label">Price :</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            placeholder="Enter product price"
                            value={data.price}
                            onChange={handleChange}
                            required
                            className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                        />
                    </div>

                    {/* Discount */}
                    <div className="grid">
                        <label htmlFor="discount" className="form-label">Discount :</label>
                        <input
                            type="text"
                            id="discount"
                            name="discount"
                            placeholder="Enter product discount"
                            value={data.discount}
                            onChange={handleChange}
                            className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                        />
                    </div>

                    {/* More fields */}
                    <div className="grid gap-3">
                        {
                            Object?.keys(data?.more_details)?.map((k, i) => {
                                return (
                                    <div key={i} className="grid">
                                        <label htmlFor={k} className="form-label flex items-center">
                                            <div
                                                className="text-red-500 bg-red-100 hover:bg-red-200 rounded-full mr-2"
                                                onClick={() => handleRemoveField(k)}
                                            >
                                                <IoClose />
                                            </div>
                                            {k} :
                                        </label>
                                        <input
                                            type="text"
                                            id={k}
                                            name={k}
                                            placeholder={`Enter product ${k}`}
                                            value={data.more_details[k]}
                                            onChange={(e) => {
                                                setData((prev) => {
                                                    return {
                                                         ...prev,
                                                            more_details: {
                                                               ...prev.more_details,
                                                                [k]: e.target.value
                                                            }
                                                        }
                                                    }
                                                )
                                            }}
                                            className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>

                    {/* Add more field button */}
                    <div
                        className="hover:bg-green-500 w-24 text-center px-2 rounded border-[1.5px] border-green-500 hover:text-white font-semibold cursor-pointer text-green-500"
                        onClick={() => setAddField(true)}
                    >
                        Add field
                    </div>

                    <button
                        className="bg-green-500 text-white font-semibold px-4 py-1 mt-4 rounded hover:bg-green-600"
                    >
                        Add Product
                    </button>
                    
                </form>
            </div>

            {
                imageUrl && <ViewImage url={imageUrl} close={() => setImageUrl("")} />
            }

            {
                addField && 
                    <AddField
                        close={() => setAddField(false)}
                        value={fieldName}
                        onChange={(e) => setFieldName(e.target.value)}
                        onSubmit={handleAddField}
                    />
            }

        </section>
    );
}

export default UploadProductPage;