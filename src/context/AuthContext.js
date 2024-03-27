import React, {createContext, useContext, useState} from "react";
import {accessToken, Logout} from "../service/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!accessToken);

    const login = () => {
        setIsLoggedIn(true)
    }
    const logout = () => {
        Logout();
        setIsLoggedIn(false)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

