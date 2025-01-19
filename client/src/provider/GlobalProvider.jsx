import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchDetails from "../utils/fetchDetails";
import { setToCart } from "../store/cartSlice";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { priceWithDiscount } from "../utils/priceWithDiscount";
import { setAddressList } from "../store/addressSlice";
import { setAdminOrders, setOrders } from "../store/orderSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({children}) => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const [cartButtonDetails, setCartButtonDetails] = useState({
        totalItems: 0,
        totalPrice: 0,
        notDiscountPrice: 0,
    });
    const [openCart, setOpenCart] = useState(false);
    const [login, setLogin] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false); 

    useEffect(() => {
        setLogin(Boolean(user?._id));
    },[user]);

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
            //console.log(error);
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

    const fetchAddresses = async() => {
        try{
            
            const addressesData = await fetchDetails({ url: 'get_addresses'});

            if(addressesData) {
                dispatch(setAddressList(addressesData?.data))
            }
            else {
                dispatch(setAddressList([]))
            }

        }
        catch(error){
            //console.log(error);
            AxiosToastError(error);
        }
    }

    const fetchOrders = async() => {
        try {

            const ordersData = await fetchDetails({ url: 'get_orders'});

            if(ordersData) {
                dispatch(setOrders(ordersData?.data));
            }
            else {
                dispatch(setOrders([]));
            }

        }
        catch(error) {
            console.error(error);
            AxiosToastError(error);
        }
    }

    const fetchAdminOrders = async() => {
        try {

            const ordersData = await fetchDetails({ url: 'get_all_orders'});

            if(ordersData) {
                dispatch(setAdminOrders(ordersData?.data));
            }
            else {
                dispatch(setAdminOrders([]));
            }

        }
        catch(error) {
            console.error(error);
            AxiosToastError(error);
        }
    }

    useEffect(() => {
        calTotals();
    },[cartItem]);

    useEffect(() => {
        fetchCartItems();
        fetchAddresses();
        fetchOrders();
        fetchAdminOrders();
    },[login]);

    useEffect(() => {
        const fetchInterval = setInterval(() => {
            fetchAdminOrders();
            fetchOrders();
        }, 5 * 60 * 1000); // 5 minutes in milliseconds
    
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(fetchInterval);
    }, [login]);
    

    return (
        <GlobalContext.Provider value={{
            fetchCartItems,
            updateQty,
            deleteCartItem,
            cartButtonDetails,
            openCart,
            setOpenCart,
            login,
            setLogin,
            fetchAddresses,
            fetchOrders,
            openUserMenu,
            setOpenUserMenu,
            fetchAdminOrders,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}