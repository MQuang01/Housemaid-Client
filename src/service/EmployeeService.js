import {InforUrl} from "../until/InforUrl";
import axios from "axios";

export const fetchListEmployee = async () => {
    try {
        const response = await axios.get(`${InforUrl}/dash-boards/employees`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
