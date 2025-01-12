import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchDetails from "../utils/fetchDetails";
import { setToCart } from "../store/cartSlice";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({children}) => {

    const dispatch = useDispatch();


    const fetchCartItems = async() => {
        const cartItemsData = await fetchDetails({url: 'get_cart_items'});

        dispatch(setToCart(cartItemsData?.data));
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
                toast.success("Add product to cart");
                fetchCartItems();
            }

        }
        catch(error){
            console.log(error);
            AxiosToastError(error);
        }
    }

    useEffect(() => {
        fetchCartItems()
    },[])

    return (
        <GlobalContext.Provider value={{
            fetchCartItems,
            updateQty
        }}>
            {children}
        </GlobalContext.Provider>
    )
}