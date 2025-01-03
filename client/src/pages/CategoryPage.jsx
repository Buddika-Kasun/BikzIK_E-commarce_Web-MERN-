import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import ConfirmBox from "../components/ConfirmBox";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import fetchCategoryDetails from "../utils/fetchCategoryDetails";
import { setAllCategory } from "../store/productSlice";


const CategoryPage = () => {

    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoriesData, setCategoriesData] = useState([]);
    const [editCategory, setEditCategory] = useState({
        open: false,
        categoryData: "",
    });
    const [deleteCategory, setDeleteCategory] = useState({
        open: false,
        categoryData: "",
    });

    const allCategory = useSelector(state => state.product.allCategory);
    const dispatch = useDispatch();
    

    useEffect(() => {
        setCategoriesData(allCategory);
    }, [allCategory]);

    /* const fetchCategory = async() => {
        try{
            setLoading(true);

            const response = await Axios({
                ...SummaryApi.get_category,
            });

            setCategoriesData(response.data.data);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategory();
    }, []); */

    const fetchCategory = async() => {
        try {
            setLoading(true);

            const categoryData = await fetchCategoryDetails();

            setCategoriesData(categoryData.data);

            dispatch(setAllCategory(categoryData.data));
        }
        catch (error) {
            AxiosToastError(error);
        }
        finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleEditClick = (categoryData) => {
        setEditCategory({
            open: true,
            categoryData: categoryData,
        });
    };

    const handleDeleteClick = (categoryData) => {
        setDeleteCategory({
            open: true,
            categoryData: categoryData,
        });
    };

    const handleDelete = async() => {
        try {
            //setLoading(true);

            const response = await Axios({
                ...SummaryApi.delete_category,
                data: {
                    categoryId: deleteCategory.categoryData._id
                },
            });

            if(response.data.success) {
                toast.success("Category deleted successfully.");
                
                fetchCategory();
                setDeleteCategory({
                    open: false,
                    categoryData: "",
                });
            }

        }
        catch(error) {
            console.log(error);
            AxiosToastError(error)
        }
        finally {
            //setLoading(false);
        }
    };

    return (
        <section>
            <div className="p-2 shadow-md flex justify-between">
                <h2 className="font-semibold">Category</h2>
                <button
                    className="text-sm border border-green-600 hover:bg-green-600 px-3 py-1 rounded-md text-green-600 hover:text-white "
                    onClick={() => setOpenUploadCategory(!openUploadCategory)}    
                >
                    Add category
                </button>
            </div>
            
            { 
                loading && <Loading />
            }

            {
                !categoriesData[0] &&  !loading && (
                    <NoData />
                )
            }

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 max-h-[64vh] mt-2 overflow-auto">
            {
                categoriesData.map((category, index) => (
                    <div key={index} className="p-2 flex flex-col items-center gap-2 bg-white rounded-md">
                        <img 
                            src={category.image}
                            alt={category.name}
                            className="w-32 aspect-square rounded-md"
                        />
                        <p>{category.name}</p>
                        <div className="flex items-center gap-2 w-full">
                            <button 
                                className="flex-1 bg-green-100 hover:bg-green-200 text-green-600 text-sm py-1 rounded-md"
                                onClick={() => handleEditClick(category)}
                            >
                                Edit
                            </button>
                            <button
                                className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 text-sm py-1 rounded-md"
                                onClick={() => handleDeleteClick(category)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
            </div>

            {
                openUploadCategory && (
                    <UploadCategoryModel
                        close={() => setOpenUploadCategory(false)}
                        fetchData={fetchCategory}
                        mode = {{
                            status: "create",
                        }}
                    />
                )
            }

            {
                editCategory.open && (
                    <UploadCategoryModel
                        close={() => setEditCategory({
                            open: false,
                            categoryData: "",
                        })}
                        fetchData={fetchCategory}
                        mode = {{
                            status: "update",
                            category: editCategory.categoryData
                        }}
                    />
                )
            }

            {
                deleteCategory.open && (
                    <ConfirmBox 
                        confirm={handleDelete}
                        cancel={() => setDeleteCategory({
                            open: false,
                            categoryData: "",
                        })}
                        close={() => setDeleteCategory({
                            open: false,
                            categoryData: "",
                        })}
                        text={`${deleteCategory.categoryData?.name} Category`}
                    />
                )
            }

        </section>
    );
}

export default CategoryPage;