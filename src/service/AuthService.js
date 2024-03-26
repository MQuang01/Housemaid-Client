import axios from "axios";
import toastr from "toastr";

export const accessToken = sessionStorage.getItem("user");
export const Login = async (username, password) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/auths/login", {
                username: username,
                password: password,
            });
        toastr.success("Đăng nhập thành công");
        sessionStorage.setItem("user", response.data);
        console.log(accessToken);
        return true; // Trả về true để biểu thị đăng nhập thành công
    } catch (error) {
        toastr.error("Tên tài khoản hoặc mật khẩu bị sai");
        return false; // Trả về false để biểu thị đăng nhập thất bại
    }
}
export const Logout = () => {
    sessionStorage.removeItem("user");
}
