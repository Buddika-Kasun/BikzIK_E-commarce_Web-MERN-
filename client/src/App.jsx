import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory
} from './store/productSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import fetchCategoryDetails from './utils/fetchCategoryDetails';
import fetchDetails from './utils/fetchDetails';
import { setToCart } from './store/cartSlice';
import { GlobalProvider } from './provider/GlobalProvider';

function App() {

  const dispatch = useDispatch();

  const fetchUser = async() => {
    // const userData = await fetchUserDetails();
    const userData = await fetchDetails({url: 'user_details'});

    dispatch(setUser(userData.data));
  }

  const fetchCategory = async() => {
    // const categoryData = await fetchCategoryDetails();
    try{
      dispatch(setLoadingCategory(true));
      const categoryData = await fetchDetails({url: 'get_category'});
      dispatch(setAllCategory(categoryData.data));
    }
    catch(error){
      console.log(error);
    }
    finally{
      dispatch(setLoadingCategory(false));
    }

  }

  const fetchSubCategory = async() => {
    const subCategoryData = await fetchDetails({url: 'get_subCategory'});

    dispatch(setAllSubCategory(subCategoryData?.data));

  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
    //fetchCartItems();
  }, []);

  return (
    <GlobalProvider>
      <Header />

      <main className='container mx-auto min-h-[77vh]'>
        <Outlet />
      </main>
      
      <Footer />
      <Toaster />
    </GlobalProvider>
  );
}

export default App
