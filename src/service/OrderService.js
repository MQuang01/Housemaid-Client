import {InforUrl} from "../until/InforUrl";
import axios, {isAxiosError} from "axios";


export const fetchCreateOrder = async (data) => {
    const jwt = localStorage.getItem('accessToken');
    console.log(jwt)
    const response = await axios.post(`${InforUrl}/orders`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });
    // return response.data
}

export const fetchOrderByCode = async (code) => {
    const jwt = localStorage.getItem('accessToken');
    const response = await axios.get(`${InforUrl}/orders/info-order/${code}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    });
    console.log(response.data)
    return response.data
}