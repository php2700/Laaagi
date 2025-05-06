import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [selectSweet, setSelectSweet] = useState({})
    const [amounts, setAmounts] = useState([0, 0, 0, 0, 0]);
    const [boxName, setBoxName] = useState('Normal Box');
    const [weight, setWeight] = useState(500)
    const [defaultProfile, setDefaultProfile] = useState(false)
    const [headerUpdate, setHeaderUpdate] = useState(false)
    const [sweetsInfo, setSweetsInfo] = useState({})


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


    return (
        <AuthContext.Provider value={{ setSweetsInfo, sweetsInfo, setHeaderUpdate, headerUpdate, token, loginData, selectSweet, setSelectSweet, amounts, setAmounts, boxName, setBoxName, weight, setWeight, setToken, setDefaultProfile, defaultProfile }} >{children}</AuthContext.Provider>
    )
}