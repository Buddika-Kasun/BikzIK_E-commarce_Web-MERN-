import { IoClose } from "react-icons/io5";
import { priceDisplay } from "../utils/priceDisplay";
import Divider from "./Divider";
import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";
import { useLocation } from "react-router-dom";

const DisplayOrder = ({close, data, isAdmin}) => {

    const location = useLocation();

    const [address, setAddress] = useState();

    const { fetchOrders, fetchAdminOrders } = useGlobalContext();

    const formattedDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('en-GB', {
            weekday: 'short',  // Mon, Tue, etc.
            day: '2-digit',    // 14
            month: '2-digit',  // 03
            year: 'numeric',   // 2025
        });

        return newDate;
    }

    const fetchAddress = async() => {
        try {
            const response = await Axios({
                ...SummaryApi.get_address_by_id,
                data: {
                    addressId: data?.delivery_address,
                }
            });
            setAddress(response.data.data);
        } catch (error) {
            AxiosToastError(error);
        }
    }

    const color = (status) => {
        switch (status) {
            case 'Pending':
                return 'text-gray-500 border-gray-500';
            case 'Processing':
                return 'text-yellow-500 border-yellow-500';
            case 'Shipped':
                return 'text-blue-500 border-blue-500';
            case 'Delivered':
                return 'text-green-500 border-green-500';
            case 'Cancelled':
                return 'text-red-500 border-red-500';
            default:
                return 'text-gray-500 border-gray-500';
        }
    };

    const bgColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-400 hover:bg-yellow-500';
            case 'Processing':
                return 'bg-blue-400 hover:bg-blue-500';
            case 'Shipped':
                return 'bg-green-400 hover:bg-green-500';
            case 'Delivered':
                return 'bg-gray-400 hover:bg-gray-500';
            default:
                return 'bg-gray-400 hover:bg-gray-500';
        }
    };
    

    const buttonName = (status) => {
        switch (status) {
          case 'Pending':
            return 'Process';
          case 'Processing':
            return 'Shipped';
          case 'Shipped':
            return 'Delivered';
          default:
            return 'Loading...';
        }
    };

    const handleChangeStatus = async () => {
        try {

            const response = await Axios({
                ...SummaryApi.update_order_status,
                data: {
                    orderId: data.orderId,
                    status: data.status,
                }
            });

            if (response.data.success) {
                toast.success("Order status updated successfully");
                fetchOrders();
                fetchAdminOrders();
                close();
            }

        }
        catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
    };

    const handleChangeCancelAdmin = async() => {
        try {
            const response = await Axios({
                ...SummaryApi.admin_cancel_order,
                data: {
                    orderId: data.orderId,
                }
            });

            if (response.data.success) {
                toast.success("Order cancelled");
                fetchOrders();
                fetchAdminOrders();
                close();
            }
        }
        catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
    };

    const handleChangeCancelUser = async() => {
        try {
            const response = await Axios({
                ...SummaryApi.user_cancel_order,
                data: {
                    orderId: data.orderId,
                }
            });

            if (response.data.success) {
                toast.success("Order cancelled");
                fetchOrders();
                fetchAdminOrders();
                close();
            }
        }
        catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    return (
        <section className="fixed top-0 right-0 bottom-0 left-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center z-50">
            <div className="bg-white max-w-3xl w-full h-fit max-h-[90vh] rounded-md overflow-y-auto scroll-custom-blue relative">
                <div className="p-2 sticky top-0 bg-white z-30">
                    <div className="p-2 shadow-md flex justify-between bg-blue-50">
                        <h2 className="font-semibold">Order Summary</h2>
                        <button
                            className="w-fit h-full hover:text-red-400"
                            onClick={close}
                        >
                            <IoClose size={25} />
                        </button>
                    </div>
                </div>

                <div className="px-4 py-2 flex flex-col lg:flex-row justify-between">

                    <div className="px-4 w-full">

                        <div className="flex flex-col px-4 gap-3">
                                
                                {
                                    location.pathname !== "/dashboard/my-orders" && isAdmin && data.status !== 'Delivered' &&
                                    <div className="flex gap-4">
                                        <button
                                            className={`rounded px-4 text-white cursor-pointer bg-red-600 hover:bg-red-700`}
                                            onClick={handleChangeCancelAdmin}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                        className={`rounded px-4 text-white cursor-pointer ${bgColor(data.status)}`}
                                        onClick={handleChangeStatus}
                                        >
                                            {buttonName(data.status)}
                                        </button>
                                    </div>
                                }
                                {
                                    location.pathname === "/dashboard/my-orders" && data.status === 'Pending' &&
                                    <button
                                        className={`rounded px-4 text-white cursor-pointer bg-red-600 hover:bg-red-700 w-fit`}
                                        onClick={handleChangeCancelUser}
                                    >
                                        Cancel
                                    </button>
                                }
                            <div className="flex gap-2">
                                <h3 className="font-semibold text-lg">Status: </h3>
                                <p className={`${color(data.status)} bg-white px-2 border rounded-md`}>
                                    {data.status}
                                </p>
                            </div>
                        </div>

                        <Divider />

                        <div className="px-4 pt-2">
                            <h3 className="font-semibold text-lg pb-2">Order ID</h3>
                            <p>{data.orderId}</p>
                        </div>

                        <Divider />

                        <div className="px-4 pt-2">
                            <h3 className="font-semibold text-lg pb-2">Order Date</h3>
                            <p>{formattedDate(data.createdAt)}</p>
                        </div>

                        <Divider />

                        <div className="px-4 pt-4 pb-4 w-full">
                            <h3 className="font-semibold text-lg pb-2">Products</h3>
                            <div className="flex flex-col gap-2 w-full">
                                {
                                    data?.product_details?.map((product, index) => {
                                        return (
                                            <div key={index} className="flex items-center gap-2 w-full border rounded-md p-1 pr-4 shadow-md">
                                                <div className="min-w-16 max-w-16 h-16 border rounded">
                                                    <img
                                                        src={product.image[0]}
                                                        alt="Cart Item"
                                                        className="object-scale-down"
                                                        />
                                                </div>
                                                <div className="flex gap-2 items-center w-full justify-between">
                                                    <div className="flex flex-col w-full">
                                                        <p className="text-ellipsis line-clamp-2 text-sm">{product.name}</p>
                                                        <div className="flex flex-col lg:flex-row lg:items-end lg:gap-2 justify-between">
                                                            <p>
                                                                {
                                                                    product?.unit && <p className="text-sm text-neutral-500">{product?.unit}</p>
                                                                }
                                                            </p>
                                                            <p className="text-sm">Qty: {product.quantity}</p>
                                                            <p className="font-semibold">{priceDisplay(product.price)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>

                    <div className="w-full lg:max-w-[270px]">

                        <Divider />

                        <div className="px-4">
                            <h3 className="font-semibold text-lg pb-2">Delivery Address</h3>
                            <div>
                                <div className="flex gap-1 flex-wrap">
                                    <p>{address?.address_line},</p>
                                    <p>{address?.city},</p>
                                    <p>{address?.postalCode}</p>
                                </div>
                                <div className="flex gap-1 flex-wrap">
                                    <p>{address?.state},</p>
                                    <p>{address?.country}</p>
                                </div>
                                <p>+94 {address?.contactNo}</p>
                            </div>
                        </div>

                        <Divider />

                        <div className="px-4 pt-4">
                            <h3 className="font-semibold text-lg pb-2">Payment Method</h3>
                            <p>{data.payment_status === 'COD' ? "Cash on delivery" : "Online payment"}</p>
                        </div>

                        <Divider />

                        <div className="p-4 bg-white rounded-md">
                            <h3 className="font-semibold text-lg pb-4">Bill Details</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between gap-4">
                                    <p>Quantity total :</p>
                                    <p className=" flex items-center gap-2">
                                        <span>{data.product_details.length} item</span>
                                    </p>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <p>Items total :</p>
                                    <p className="flex flex-col md:flex-row items-center md:gap-2">
                                        <span>{priceDisplay(data.totalAmount)}</span>
                                    </p>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <p>Delivery charge :</p>
                                    <p className="">Free</p>
                                </div>
                                <div className="flex justify-between gap-4 font-semibold">
                                    <p>Grand total :</p>
                                    <p className="">{priceDisplay(data.totalAmount)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default DisplayOrder;