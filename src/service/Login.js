import axios from "axios";
import toastr from "toastr";
import {InforUrl} from "../until/InforUrl";


export const fetchLogin = async (username, password) => {

    const data = {
        username,
        password
    }
    try {
        const response = await axios.post(`${InforUrl}/auths/login`, data)
        toastr.success('Login successfully')
        return response.data
    } catch (error) {
        toastr.error("Wrong username or password");
    }
}