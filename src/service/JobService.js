import axios from "axios";
import {InforUrl} from "../components/until/InforUrl";


export const fetchJobsPaging = async (page) => {
    try {
        const response = await axios.get(`${InforUrl}/jobs?page=${page}&size=4`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

