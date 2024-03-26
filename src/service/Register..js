import axios from "axios";
import toastr from "toastr";
import {InforUrl} from "../until/InforUrl";

export const fetchRegister = async (formData) => {
    try {
        const response = await axios.post(`${InforUrl}/auths/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        toastr.success('Register successfully');
        return response.data;
    }catch (error) {
        console.log(error);
    }

}