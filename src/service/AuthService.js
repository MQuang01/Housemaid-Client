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
        sessionStorage.setItem("user", response.data);
        return true;
    } catch (error) {
        return false;
    }
}
export const Logout = () => {
    sessionStorage.removeItem("user");
}
