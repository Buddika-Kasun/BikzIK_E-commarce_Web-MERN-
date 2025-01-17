import { useSelector } from "react-redux";
import { priceDisplay } from "../utils/priceDisplay";
import NoData from "../components/NoData";
import { useState } from "react";
import DisplayOrder from "../components/DisplayOrder";


const MyOrdersPage = () => {

    const orderList = useSelector(state => state.order.orders);

    const [viewOrder, setViewOrder] = useState({
        open: false,
        orderData: "",
    });

    const formattedDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('en-GB', {
            weekday: 'short',  // Mon, Tue, etc.
            day: '2-digit',    // 14
            month: '2-digit',  // 03
            year: 'numeric',   // 2025
        });

        return newDate;
    }

    const handleViewClick = (orderData) => {
        setViewOrder({
            open: true,
            orderData: orderData,
        });
    };

    return (
        <section className=''>
            <div className="p-2 pt-4 shadow-md flex justify-between sticky top-28 lg:top-20 bg-blue-50 z-30">
                <h2 className="font-semibold">Orders</h2>
            </div>
            <div className="grid gap-4 p-4">

                {
                    !orderList[0] && <NoData />
                }

                {
                    orderList.map((order, index) => {
                        return (
                            <div key={index} className="border-[1.5px] border-gray-300 px-4 py-2 w-full rounded-md bg-slate-200 overflow-hidden">
                                <div className="flex justify-between mb-3">
                                    <div className="font-semibold flex flex-wrap items-center gap-1">
                                        <p>Order no: </p>
                                        <p className="text-sm text-ellipsis line-clamp-2">{order.orderId}</p>
                                    </div>
                                    <button 
                                        className="text-green-600 hover:text-green-700"
                                        onClick={() => handleViewClick(order)}
                                    >
                                            View order
                                        </button>
                                </div>
                                <div className="flex gap-8 lg:gap-16">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex flex-col text-sm">
                                            <p className="font-semibold">Date of order</p>
                                            <p className="">{formattedDate(order.createdAt)}</p>
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <p className="font-semibold">Total cost</p>
                                            <p className="">{priceDisplay(order.totalAmount)}</p>
                                        </div>
                                        <div className="flex flex-col text-sm">
                                            <p className="font-semibold">Payment status</p>
                                            <p className="">{order.payment_status}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 px-4 py-2">
                                        {
                                            order.product_details.map((product, index) => {
                                                return (
                                                    <div key={index} className="flex flex-col max-w-20">
                                                        <div className="w-20 h-20 rounded border overflow-hidden">
                                                            <img
                                                                src={product.image[0]}
                                                                alt="Product"
                                                                className="object-scale-down"
                                                            />
                                                        </div>
                                                        <div className="text-xs text-ellipsis line-clamp-2">{product.name}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            {
                viewOrder.open && 
                <DisplayOrder
                    close={() => {
                        setViewOrder({
                            open: false,
                            orderData: "",
                        });
                    }}
                    data={viewOrder.orderData}
                />
            }
        </section>
    );
}

export default MyOrdersPage;