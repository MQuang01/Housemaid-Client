import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const fetchJobs = async (page) => {
    try {
        const response = await axios.get(`${InforUrl}/jobs`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

export const fetchJobById = async (id) => {
    try {
        const response = await axios.get(`${InforUrl}/jobs/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

