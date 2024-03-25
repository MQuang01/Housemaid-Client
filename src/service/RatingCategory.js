import {InforUrl} from "../until/InforUrl";
import axios from "axios";

export const fetchRatingCategory = async () => {
    try {
        const response = await axios.get(`${InforUrl}/ratings/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}