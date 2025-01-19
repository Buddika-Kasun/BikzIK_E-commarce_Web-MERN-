import Axios from './Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';

const fetchUserDetails = async() => {
    try {

        const response = await Axios({
            ...SummaryApi.user_details,
        });

        return response.data;

    } catch (error) {
        console.error(error);
        toast.error(error)
    }
};

export default fetchUserDetails;