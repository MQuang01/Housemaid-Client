import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchCategory = async () => {
    try {
        const response = await axios.get(`${InforUrl}/categories`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data)
    }
};