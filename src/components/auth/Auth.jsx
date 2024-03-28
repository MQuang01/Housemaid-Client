import React, {useEffect, useState} from "react"
import './Auth.css'
import {useLocation, useNavigate} from "react-router-dom";
import LoginForm from './LoginForm'
import {useAuth} from "../../context/AuthContext";
import RegisterForm from "./RegisterForm";



const Auth = () => {
    let navigate = useNavigate();
    const {isLoggedIn} = useAuth();
    if(isLoggedIn) {
        navigate("/");
    }

    const location = useLocation();
    const [mode, setMode] = useState('');

    useEffect(() => {
        if (location && location.search) {
            const searchParams = new URLSearchParams(location.search);
            const modeParam = searchParams.get('mode');

            const isAuthModeLogin = /auth\?mode=login/.test(location.search);

            if (!isAuthModeLogin) {
                setMode(modeParam);
            }
        }

    }, [location.search]);



    return (
        <div className='row vh-100 g-0'>
            {mode === 'login' && (
                <>
                    <div className='col-lg-6 position-relative d-none d-lg-block'>
                        <div className='bg-holder' style={{backgroundImage: `url("/assets/img/login.png")`}}>
                        </div>
                    </div>
                    <LoginForm/>
                </>
            )}
            {mode === "register" && (
                <>
                    <div className='col-lg-5 position-relative d-none d-lg-block'>
                        <div className='bg-holder' style={{backgroundImage: `url("/assets/img/register.jpg")`}}>
                        </div>
                    </div>
                    <RegisterForm />
                </>
            )}
        </div>
    )
}

export default Auth;