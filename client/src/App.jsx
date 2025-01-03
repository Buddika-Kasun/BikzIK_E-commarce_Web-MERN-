import { Outlet } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import fetchUserDetails from './utils/fetchUserDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/userSlice';
import { setAllCategory } from './store/productSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import fetchCategoryDetails from './utils/fetchCategoryDetails';

function App() {

  const dispatch = useDispatch();

  const fetchUser = async() => {
    const userData = await fetchUserDetails();

    dispatch(setUser(userData.data));
  }

  const fetchCategory = async() => {
    const categoryData = await fetchCategoryDetails();

    dispatch(setAllCategory(categoryData.data));
  }

  useEffect(() => {
    fetchUser();
    fetchCategory();
  }, []);

  return (
    <>
      <Header />

      <main className='container mx-auto min-h-[77vh]'>
        <Outlet />
      </main>
      
      <Footer />
      <Toaster />
    </>
  );
}

export default App
