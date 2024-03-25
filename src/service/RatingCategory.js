import {InforUrl} from "../components/until/InforUrl";
import axios from "axios";

export const fetchRatingCategory = async () => {
    try {
        const response = await axios.get(`${InforUrl}/ratings/categories`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}