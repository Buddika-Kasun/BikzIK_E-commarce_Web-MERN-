import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";
import { priceDisplay } from "../utils/priceDisplay";
import { FaCaretRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { FaCartShopping } from 'react-icons/fa6';
import { Link, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import { priceWithDiscount } from "../utils/priceWithDiscount";
import NotLogin from "./NotLogin";

const DisplayCart = ({close}) => {

    const {cartButtonDetails, login} = useGlobalContext();

    const cartItems = useSelector(state => state.cart.cart);
    const user = useSelector(state => state.user);

    const navigate = useNavigate();

    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout");
            if (close) close();
        }
    };

    return (
        <section className="bg-neutral-900 bg-opacity-70 fixed top-0 right-0 z-50 bottom-0 left-0">
            {
                login ? (
                    <div className="w-full md:max-w-md min-h-screen max-h-screen ml-auto bg-blue-50">
                        <div className="p-2 sticky top-0 z-30">
                            <div className="p-2 shadow-md flex justify-between bg-white rounded-md">
                                <h2 className="font-semibold text-lg">Cart</h2>
                                
                                <button
                                    className="w-fit h-full hover:text-red-400"
                                    onClick={close}
                                >
                                    <IoClose size={25} />
                                </button>
                            </div>
                        </div>

                        <div className="min-h-[85vh] max-h-[85vh] lg:min-h-[78vh] lg:max-h-[78vh] px-2 py-1 flex flex-col gap-3">
                            {/* Display cart items */}
                            {
                                cartItems[0] ? (
                                    <>
                                        <div className="flex items-center justify-between py-1 px-4 bg-blue-100 text-blue-500 rounded-full">
                                            <p>Your total savings</p>
                                            <p>{priceDisplay(cartButtonDetails.notDiscountPrice - cartButtonDetails?.totalPrice)}</p>
                                        </div>
                                        <div className="px-2 pb-2 -mb-3 grid gap-1 overflow-auto scroll-custom-blue">
                                            {
                                                cartItems.map((item, index) => {
                                                    return (
                                                        <div key={index} className="flex items-center gap-2 w-full bg-white rounded-md p-1 pr-4 shadow-md">
                                                            <div className="min-w-16 max-w-16 h-16 border rounded">
                                                                <img
                                                                    src={item.productId?.image[0]}
                                                                    alt="Cart Item"
                                                                    className="object-scale-down"
                                                                    />
                                                            </div>
                                                            <div className="flex gap-2 items-center w-full justify-between">
                                                                <div className="flex flex-col">
                                                                    <p className="text-ellipsis line-clamp-2 text-sm">{item?.productId?.name}</p>
                                                                    <div className="flex gap-4 items-center">
                                                                        {
                                                                            item?.productId?.unit && <p className="text-sm text-neutral-500">{item?.productId?.unit}</p>
                                                                        }
                                                                        {
                                                                            item?.productId?.discount && <p className="text-sm text-red-600 bg-red-200 rounded px-2">{item?.productId?.discount}% discount</p>
                                                                        }
                                                                    </div>
                                                                    <div className="flex flex-col lg:flex-row lg:items-end lg:gap-2">
                                                                        {
                                                                             item?.productId?.discount && <p className="text-sm text-gray-400 line-through">{priceDisplay(item?.productId?.price)}</p>
                                                                        }
                                                                        <p className="font-semibold">{priceDisplay(priceWithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                                    </div>
                                                                </div>
                                                                <AddToCartButton data={item?.productId} />
                                                            </div>
                                                        </div>
                                                        )
                                                    }
                                                )
                                            }
                                        </div>
                                        <Divider />
                                        <div className="px-4 py-2 -mt-4 bg-white rounded-md">
                                            <h3 className="font-semibold pb-1">Bill details</h3>
                                            <div className="text-sm">
                                                <div className="flex justify-between gap-4">
                                                    <p>Quantity total :</p>
                                                    <p className="text-sm flex items-center gap-2">
                                                        <span>{cartButtonDetails.totalItems} item</span>
                                                    </p>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    <p>Items total :</p>
                                                    <p className="text-sm flex items-center gap-2">
                                                        {
                                                            cartButtonDetails.totalPrice !== cartButtonDetails.notDiscountPrice &&
                                                            <span className="line-through text-gray-400">{priceDisplay(cartButtonDetails.notDiscountPrice)}</span>
                                                        }
                                                        <span>{priceDisplay(cartButtonDetails.totalPrice)}</span>
                                                    </p>
                                                </div>
                                                <div className="flex justify-between gap-4">
                                                    <p>Delivery charge :</p>
                                                    <p className="text-sm">Free</p>
                                                </div>
                                                <div className="flex justify-between gap-4 font-semibold">
                                                    <p>Grand total :</p>
                                                    <p className="">{priceDisplay(cartButtonDetails.totalPrice)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-4 m-auto text-gray-500">
                                        <p className=""><FaCartShopping size={50} /></p>
                                        <p className="text-center">Your cart is empty.</p>
                                    </div>
                                )
                            }
                        </div>

                        <div className="p-2 bg-blue-50 sticky bottom-0">
                            <div className="bg-green-700 text-white px-4 py-2 font-semibold lg:text-lg rounded flex items-center gap-4 justify-between">
                                {
                                    cartItems[0] ? (
                                        <>
                                            <div>
                                                {priceDisplay(cartButtonDetails?.totalPrice)}
                                            </div>
                                            <button
                                                className="flex items-center"
                                                onClick={redirectToCheckoutPage}
                                            >
                                                Proceed
                                                <FaCaretRight size={20} />
                                            </button>
                                        </>
                                    ) : (
                                        <Link
                                            className="flex items-center w-full justify-center"
                                            onClick={close}
                                            to={'/'}
                                        >
                                            Shop now
                                        </Link>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                ) : (
                    <NotLogin close={close} />
                )
            }
        </section>
    );
}

export default DisplayCart;