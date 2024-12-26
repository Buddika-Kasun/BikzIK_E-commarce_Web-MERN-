import { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";


const CategoryPage = () => {

    const [openUploadCategory, setOpenUploadCategory] = useState(false);

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
                openUploadCategory && (
                    <UploadCategoryModel
                        close={() => setOpenUploadCategory(false)}
                    />
                )
            }
        </section>
    );
}

export default CategoryPage;