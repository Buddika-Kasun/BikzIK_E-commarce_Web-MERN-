import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { useGlobalContext } from "../provider/GlobalProvider";


const AddAddress = ({close, mode}) => {

    const { fetchAddresses } = useGlobalContext();

    const [data, setData] = useState({
        address: mode?.data?.address_line || "",
        city: mode?.data?.city || "",
        state: mode?.data?.state || "",
        postal: mode?.data?.postalCode || "",
        contact: mode?.data?.contactNo || ""
    });

    const handleChange = (e) => {

        if(e.target.name === "postal" && !(/^[0-9]*$/.test(e.target.value))) {
            toast.error("Postal code should only contain numbers");
            return;
        }

        if(e.target.name === "contact") {
            if(!(/^[0-9]*$/.test(e.target.value))) {
                toast.error("Contact number should only contain numbers");
                return;
            }
            if(e.target.value[0] === '0') {
                toast.error("Number already includes +94, no need to start with 0");
                return;
            }
        }
        

        setData({...data, [e.target.name]: e.target.value });
    };

    const  handleSubmit = async(e) => {
        e.preventDefault();

        try{

            let response;

            if (mode?.status === "create") {
                response = await Axios({
                    ...SummaryApi.add_address,
                    data: data,
                });
            }
            else if (mode?.status === "update") {
                response = await Axios({
                    ...SummaryApi.update_address,
                    data: {...data, addressId: mode?.data?._id},
                });
            }

            if(response?.data?.success){
                //toast.success("Product added successfully!");
                toast.success(response.data.message);
                setData({
                    address: "",
                    city: "",
                    state: "",
                    postal: "",
                    contact: ""
                });

                fetchAddresses();

                if (close) close();

                //if (fetchProducts) fetchProducts();
            }

        }
        catch(error){
            console.log(error);
            AxiosToastError(error);
        }

    };

    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
            <div className="bg-white max-w-lg w-full h-fit max-h-[90vh] rounded-md overflow-y-auto scroll-custom-blue relative">
                <div className="p-2 sticky top-0 bg-white z-30">
                    <div className="p-2 shadow-md flex justify-between bg-blue-50">
                        <h2 className="font-semibold">{mode?.status === "update" ? 'Edit Address' : 'Add Address'}</h2>
                        <button
                            className="w-fit h-full hover:text-red-400"
                            onClick={close}
                        >
                            <IoClose size={25} />
                        </button>
                    </div>
                </div>

                <div className="px-4 py-2">
                    <form className="grid gap-3" onSubmit={handleSubmit}>

                        {/* Address line */}
                        <div className="grid">
                            <label htmlFor="address" className="form-label">Address Line :</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Enter address line"
                                value={data.address}
                                onChange={handleChange}
                                required
                                className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                            />
                        </div>

                        {/* City */}
                        <div className="grid">
                            <label htmlFor="city" className="form-label">City :</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter city"
                                value={data.city}
                                onChange={handleChange}
                                required
                                className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                            />
                        </div>

                        {/* State */}
                        <div className="grid">
                            <label htmlFor="state" className="form-label">State :</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter state"
                                value={data.state}
                                onChange={handleChange}
                                required
                                className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                            />
                        </div>

                        {/* Postal Code */}
                        <div className="grid">
                            <label htmlFor="postal" className="form-label">Postal Code :</label>
                            <input
                                type="text"
                                id="postal"
                                name="postal"
                                placeholder="Enter postal code"
                                value={data.postal}
                                onChange={handleChange}
                                required
                                minLength={5}
                                maxLength={5}
                                className="outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                            />
                        </div>

                        {/* COntact no */}
                        <div className="grid">
                            <label htmlFor="contact" className="form-label">Contact No :</label>
                            <div className="flex relative">
                                <div className="absolute px-2 flex items-center h-full text-gray-500">+94</div>
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Enter contact number"
                                    value={data.contact}
                                    onChange={handleChange}
                                    required
                                    minLength={9}
                                    maxLength={9}
                                    className="pl-10 w-full outline-none border-[1.5px] border-blue-200 text-gray-500 focus:border-blue-300 bg-blue-100 bg-opacity-60 focus:bg-opacity-100 focus:shadow-sm px-2 py-1 rounded"
                                />
                            </div>
                        </div>

                        <button
                            className="bg-blue-500 text-white font-semibold px-4 py-1 mt-2 rounded hover:bg-blue-600"
                        >
                            {mode?.status === "update" ? 'Update' : 'Save'}
                        </button>

                    </form>
                </div>
                <div className="bg-white h-2 w-full sticky bottom-0"/>
            </div>
        </section>
    );
}

export default AddAddress;