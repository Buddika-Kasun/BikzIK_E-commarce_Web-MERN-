import SummaryApi from "../common/SummaryApi";
import Axios from "./Axios";

const fetchDetails = async({url}) => {
    try{

        const response = await Axios({
            ...SummaryApi[url],
        });

        if (response.data.success) {
            return response.data;
        }
    }
    catch(error){
        //console.log(error);
    }
  }

  export default fetchDetails;