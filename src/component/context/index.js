import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [selectSweet, setSelectSweet] = useState({})
    const [amounts, setAmounts] = useState([0, 0, 0, 0, 0]);
    const [boxName, setBoxName] = useState('Normal Box');
    const [weight, setWeight] = useState(500)
    const [defaultProfile, setDefaultProfile] = useState(false)
    const [headerUpdate, setHeaderUpdate] = useState(false)
    const [sweetsInfo, setSweetsInfo] = useState({})
    const [storeUserData, setStoreUserData] = useState({})


    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setToken(token)
        }
    }, [])

    const loginData = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
    }

    const logout = () => {
        navigate('/');
        setTimeout(() => {
            setToken("");
            localStorage.removeItem("_id");
            localStorage.removeItem("token");
        }, 100);

    };


    return (
        <AuthContext.Provider value={{ logout, storeUserData, setStoreUserData, setSweetsInfo, sweetsInfo, setHeaderUpdate, headerUpdate, token, loginData, selectSweet, setSelectSweet, amounts, setAmounts, boxName, setBoxName, weight, setWeight, setToken, setDefaultProfile, defaultProfile }} >{children}</AuthContext.Provider>
    )
}