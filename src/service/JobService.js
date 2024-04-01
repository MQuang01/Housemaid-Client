import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchJobs = async () => {
    try {
        const response = await axios.get(`${InforUrl}/jobs`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data)
    }
}
export const fetchJobsByCategoryId = async (id) => {
    try {
        const response = await axios.get(`${InforUrl}/jobs/category/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data)
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

