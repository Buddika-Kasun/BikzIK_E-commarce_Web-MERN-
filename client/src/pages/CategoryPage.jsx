import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";


const CategoryPage = () => {

    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    const fetchCategory = async() => {
        try{
            setLoading(true);

            const response = await Axios({
                ...SummaryApi.get_category,
            });

            setCategoryData(response.data.data);
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
    }, []);

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
                !categoryData[0] &&  !loading && (
                    <NoData />
                )
            }

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 max-h-[64vh] mt-2 overflow-auto">
            {
                categoryData.map((category, index) => (
                    <div key={index} className="p-2 flex flex-col items-center gap-2 bg-white rounded-md">
                        <img 
                            src={category.image}
                            alt={category.name}
                            className="w-32 aspect-square rounded-md"
                        />
                        <p>{category.name}</p>
                    </div>
                ))
            }
            </div>

            {
                openUploadCategory && (
                    <UploadCategoryModel
                        close={() => setOpenUploadCategory(false)}
                        fetchData={fetchCategory}
                    />
                )
            }
        </section>
    );
}

export default CategoryPage;