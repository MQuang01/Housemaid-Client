import axios from "axios";
import {InforUrl} from "../components/until/InforUrl";

export const fetchCategory = async () => {
    try {
        const response = await axios.get(`${InforUrl}/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};