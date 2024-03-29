import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchJobsPaging = async (page) => {
    try {
        const response = await axios.get(`${InforUrl}/jobs?page=${page}&size=4`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export const fetchJobByCategoryId = async (id) => {
    try {
        const response = await axios.get(`${InforUrl}/jobs/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

