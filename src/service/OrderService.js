import {InforUrl} from "../until/InforUrl";
import axios from "axios";


export const fetchCreateOrder = async (data) => {
    const jwt = localStorage.getItem('user')
    console.log(jwt)
    const response = await axios.post(`${InforUrl}/orders`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });
    // return response.data
}