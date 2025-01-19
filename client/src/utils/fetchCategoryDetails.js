import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchCategoryDetails = async() => {
    try{

        const response = await Axios({
            ...SummaryApi.get_category,
        });

        if (response.data.success) {
            return response.data;
        }
    }
    catch(error){
        //console.log(error);
    }
  }

  export default fetchCategoryDetails;