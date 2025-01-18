import { useSelector } from "react-redux";
import { priceDisplay } from "../utils/priceDisplay";
import NoData from "../components/NoData";
import { useState } from "react";
import DisplayOrder from "../components/DisplayOrder";


const AdminOrdersPage = () => {

    const orderList = useSelector(state => state.order.adminOrders);

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

    const color = (status) => {
      switch (status) {
        case 'Pending':
          return 'text-gray-500';
        case 'Processing':
          return 'text-yellow-500';
        case 'Shipped':
          return 'text-blue-500';
        case 'Delivered':
          return 'text-green-500';
        default:
          return 'text-gray-500';
      }
    }

    return (
        <section className=''>
            <div className="p-2 pt-4 shadow-md flex justify-between sticky top-28 lg:top-20 bg-blue-50 z-30">
                <h2 className="font-semibold">Admin Orders</h2>
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
                                    <div className="flex flex-col lg:flex-row justify-between lg:items-center lg:flex-grow lg:pr-10">
                                        <div className="order-2 lg:order-1 font-semibold flex flex-wrap items-center gap-1">
                                            <p>Order no: </p>
                                            <p className="text-sm text-ellipsis line-clamp-2">{order.orderId}</p>
                                        </div>
                                        <div className={`order-1 lg:order-2 text-sm font-semibold bg-white rounded-md px-2 w-fit ${color(order.status)}`}>
                                          {order.status}
                                        </div>
                                    </div>
                                    <button 
                                        className="text-green-600 hover:text-green-700 w-fit"
                                        onClick={() => handleViewClick(order)}
                                    >
                                            View order
                                        </button>
                                </div>
                                <div className="flex flex-col lg:flex-row gap-1 lg:gap-8">
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
                    isAdmin={true}
                />
            }
        </section>
    );
}

export default AdminOrdersPage;