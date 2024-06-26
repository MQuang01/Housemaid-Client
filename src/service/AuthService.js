import axios from "axios";
import {InforUrl} from "../until/InforUrl";

export const accessToken = sessionStorage.getItem("user");
export const Login = async (username, password) => {
    try {
        const response = await axios.post(
            `${InforUrl}/auths/login`, {
                username: username,
                password: password,
            });
        sessionStorage.setItem("accessToken", response.data);
        localStorage.setItem("accessToken", response.data);
        return true;
    } catch (error) {
        return false;
    }
}
export const Logout = () => {
    sessionStorage.removeItem("user");
}

export const fetchRegister = async (formData) => {
    try {
        const response = await axios.post(`${InforUrl}/auths/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data); // Ném ra một Error với thông báo lỗi từ máy chủ
    }
}

export const fetchUserByUserName = async (username) => {

    try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${InforUrl}/users/current-user/${username}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        ;

        localStorage.setItem("infoUser", JSON.stringify(response.data));

        return response.data;
    } catch (error) {
        throw new Error(error.response.data); // Ném ra một Error với thông báo lỗi không máy chủ
    }
}