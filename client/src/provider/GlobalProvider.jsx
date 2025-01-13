import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchDetails from "../utils/fetchDetails";
import { setToCart } from "../store/cartSlice";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../utils/priceWithDiscount";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({children}) => {

    const dispatch = useDispatch();

    const [cartButtonDetails, setCartButtonDetails] = useState({
        totalItems: 0,
        totalPrice: 0,
        notDiscountPrice: 0,
    });
    const [openCart, setOpenCart] = useState(false);
    const [login, setLogin] = useState(false);

    const cartItem = useSelector((state) => state.cart.cart);

    // Cal total items & total price
    const calTotals = () => {
        const totItems = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity
        },0);

        const totPrice = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity * priceWithDiscount(curr.productId?.price, curr.productId?.discount);
        },0);

        const notDiscountPrice = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity * curr.productId?.price;
        },0);

        setCartButtonDetails(() => {
            return {
                totalItems: totItems,
                totalPrice: totPrice,
                notDiscountPrice: notDiscountPrice,
            }
        })

    }

    useEffect(() => {
        calTotals();
    },[cartItem]);

    const fetchCartItems = async() => {
        const cartItemsData = await fetchDetails({url: 'get_cart_items'});

        if(cartItemsData) {
            dispatch(setToCart(cartItemsData?.data));
        }
        else {
            dispatch(setToCart(''));
        }

    }
    
    const updateQty = async(id, qty) => {
        try{

            const response = await Axios({
                ...SummaryApi.update_cart_item_qty,
                data: {
                    _id: id,
                    qty: qty
                }
            });

            if (response.data.success) {
                //toast.success("Add product to cart");
                fetchCartItems();
                return response.data;
            }

        }
        catch(error){
            console.log(error);
            AxiosToastError(error);
        }
    }

    const deleteCartItem = async(cartId) => {
        try {
            const response = await Axios({
                ...SummaryApi.delete_cart_item,
                data: {
                    _id: cartId
                }
            });
            
            if(response.data.success) {
                toast.success("Product removed from cart");
                fetchCartItems();
            }
        }
        catch(error) {
            console.error(error);
            AxiosToastError(error);
        }
    }

    useEffect(() => {
        fetchCartItems();
    },[login])

    return (
        <GlobalContext.Provider value={{
            fetchCartItems,
            updateQty,
            deleteCartItem,
            cartButtonDetails,
            openCart,
            setOpenCart,
            setLogin,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}