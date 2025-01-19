import { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { priceDisplay } from "../utils/priceDisplay";
import AddAddress from "../components/AddAddress";
import NotLogin from "../components/NotLogin";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaChevronRight } from "react-icons/fa";

const CheckoutPage = () => {

    const {cartButtonDetails, login, fetchCartItems, fetchOrders, fetchAdminOrders} = useGlobalContext();

    const [openAddress, setOpenAddress] = useState(false);

    const addressList = useSelector(state => state.address.addressList);
    const cartItems = useSelector(state => state.cart.cart);

    const [selectedAddress, setSelectedAddress] = useState(0);

    const navigate = useNavigate();

    const handleCOD = async(e) => {
        e.preventDefault();
        try {

            if(addressList.length === 0) { 
                toast.error("Cannot process without a address!");
                setOpenAddress(true);
                return;
            }

            const response = await Axios({
                ...SummaryApi.add_order,
                data: {
                    productList: cartItems,
                    shippingAddress: addressList[selectedAddress]?._id,
                    paymentMethod: "COD",
                    totalPrice: cartButtonDetails.totalPrice,
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                fetchCartItems();
                fetchOrders();
                fetchAdminOrders();
                navigate('/response',{
                    state: {
                        text: 'success',
                    }
                })
            }
        }
        catch (error) {
            //console.log(error);
            AxiosToastError(error);
            navigate('/response',{
                state: {
                    text: 'cancel',
                }
            })
        }
    };

    return (
        <section className="">
            <div className='py-2 text-xs font-semibold items-center gap-1 text-green-600 flex sticky top-[112px] lg:top-20 md:top-28 bg-blue-50'>
                <Link to={'/'} className='hover:text-black'>Home</Link>
                <div><FaChevronRight size={10} className='text-gray-600' /></div>
                <div>Cart</div>
                <div><FaChevronRight size={10} className='text-gray-600' /></div>
            </div>
            {
                login ? (
                    cartButtonDetails?.totalItems === 0 ? (
                        <div className="flex flex-col gap-10 items-center justify-center h-[70vh]">
                            <div className="flex flex-col items-center justify-center gap-4 text-gray-500">
                                <p className=""><FaCartShopping size={50} /></p>
                                <p className="text-center">
                                    <p>Your cart is empty.</p>
                                    <p>Add items before proceeding to checkout.</p>
                                </p>
                            </div>
                            <Link
                                className="flex items-center w-fit rounded shadow-md justify-center px-10 py-2 text-white bg-green-600 hover:bg-green-700 font-semibold"
                                onClick={close}
                                to={'/'}
                            >
                                Shop now
                            </Link>
                        </div>
                    ) : (
                        <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full justify-between gap-4">
                            <div className="w-full">
                                {/* Address */}
                                <h3 className="text-xl font-semibold bg-blue-50">Choose your address</h3>
                                <div className="grid gap-4 mt-2 lg:pr-2 mb-4 overflow-y-auto lg:max-h-[50vh] scroll-custom-blue">
                                    {
                                        addressList?.map((address, index) => {
                                            return (
                                                <label
                                                    key={index} 
                                                    className={`border-[1.5px] rounded p-2 bg-white flex gap-3 hover:bg-slate-200 ${index === selectedAddress && 'border-blue-500'}`}
                                                    htmlFor={"address"+index}
                                                >
                                                    <div>
                                                        <input
                                                            id={"address"+index}
                                                            type="radio"
                                                            name="address"
                                                            value={index}
                                                            defaultChecked={selectedAddress === index}
                                                            onChange={() => setSelectedAddress(index)} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex gap-1 flex-wrap">
                                                            <p>{address.address_line},</p>
                                                            <p>{address.city},</p>
                                                            <p>{address.postalCode}</p>
                                                        </div>
                                                        <div className="flex gap-1 flex-wrap">
                                                            <p>{address.state},</p>
                                                            <p>{address.country}</p>
                                                        </div>
                                                        <p>+94 {address.contactNo}</p>
                                                    </div>
                                                </label>
                                            )
                                        })
                                    }
                                </div>
                                <div
                                    className="h-16 border-2 border-dashed hover:border-gray-300 flex items-center justify-center cursor-pointer text-gray-400 hover:text-gray-500"
                                    onClick={() => setOpenAddress(true)}
                                >
                                    Add address
                                </div>
                            </div>
    
                            <div className="w-full lg:max-w-md bg-white px-4 py-2 h-fit shadow-lg rounded-md">
                                {/* Summary */}
                                <div>
                                    <h3 className="text-xl font-semibold">Summary</h3>
                                    <div className="p-4 bg-white rounded-md">
                                        <h3 className="font-semibold text-lg pb-4">Bill details</h3>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between gap-4">
                                                <p>Quantity total :</p>
                                                <p className=" flex items-center gap-2">
                                                    <span>{cartButtonDetails.totalItems} item</span>
                                                </p>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <p>Items total :</p>
                                                <p className="flex flex-col md:flex-row items-center md:gap-2">
                                                    {
                                                        cartButtonDetails.totalPrice !== cartButtonDetails.notDiscountPrice &&
                                                        <span className="line-through text-gray-400">{priceDisplay(cartButtonDetails.notDiscountPrice)}</span>
                                                    }
                                                    <span>{priceDisplay(cartButtonDetails.totalPrice)}</span>
                                                </p>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <p>Delivery charge :</p>
                                                <p className="">Free</p>
                                            </div>
                                            <div className="flex justify-between gap-4 font-semibold">
                                                <p>Grand total :</p>
                                                <p className="">{priceDisplay(cartButtonDetails.totalPrice)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-4 py-2">
                                        <button className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded">Online Payment</button>
                                        <button
                                            className="py-2 px-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded"
                                            onClick={handleCOD}
                                        >
                                            Cash on Delivery
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ) : (
                    <NotLogin />
                )
            }
            {
                openAddress && 
                <AddAddress
                    close={() => setOpenAddress(false)}
                    mode = {{
                        status: "create",
                    }}
                />
            }
        </section>
    );
}

export default CheckoutPage;