import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';

const uploadImage = async(image) => {
    try {

        const formdata = new FormData();
        formdata.append('image', image);

        const response = await Axios({
            ...SummaryApi.upload_image,
            data: formdata,
        });

        return response;
    }
    catch (error) {
        console.error(error);
    }
};

export default uploadImage;