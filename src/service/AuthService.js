import axios from "axios";

export const accessToken = sessionStorage.getItem("user");
export const Login = async (username, password) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/api/auths/login`, {
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
