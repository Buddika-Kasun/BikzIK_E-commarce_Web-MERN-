import { createContext, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import fetchDetails from "../utils/fetchDetails";
import { setToCart } from "../store/cartSlice";

export const GlobalContext = createContext(null);

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({children}) => {

    const dispatch = useDispatch();


    const fetchCartItems = async() => {
        const cartItemsData = await fetchDetails({url: 'get_cart_items'});

        dispatch(setToCart(cartItemsData?.data));
    }

    useEffect(() => {
        fetchCartItems()
    },[])

    return (
        <GlobalContext.Provider value={{
            fetchCartItems
        }}>
            {children}
        </GlobalContext.Provider>
    )
}