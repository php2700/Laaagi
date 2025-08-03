import { useContext, useEffect, useState } from "react"
import laaagi from "../../assets/logo/laaagi.png"
import './index.css'
import Google from "../../assets/sign-up/google 1.png"
import axios from "axios"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context"


export const SignUp = () => {
    const [showsignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate()
    const { loginData } = useContext(AuthContext)
    const [name, setName] = useState()
    const [mobile, setMobile] = useState();
    const [_id, setId] = useState()
    const [otpModel, setOtpModel] = useState(false)
    const [otp, setOtp] = useState()
    const [data, setData] = useState()
    const [error, setError] = useState({})
    const [nameModel, setNameModel] = useState(false)
    const context = useContext(AuthContext)
    const token = context?.token || localStorage.getItem('token');
    const userId = localStorage.getItem("_id");
    const headerUpdate = context?.setHeaderUpdate;
    const [otpVerifyError, setOtpVerifyError] = useState();



    const fetchUserData = async () => {
        if (!userId || !token) {
            setShowSignUp(true);
            return
        }
        try {
            await axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((res) => {
                navigate('/')
            })
        } catch (err) {
            if (err?.response?.data?.Message === 'jwt expired') {
                setShowSignUp(true);
            }
            console.error("Error fetching user data:", err);
        }
    };

    useEffect(() => {
        if (!nameModel)
            fetchUserData();
    }, [token, userId]);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse, "aaaaaaaaaaaa")
            await axios.post(`${process.env.REACT_APP_BASE_URL}api/user/google-login`, {
                access_token: tokenResponse?.access_token
            })
                .then((res) => {
                    setShowSignUp(false)
                    loginData(res?.data?.token)
                    localStorage.setItem("_id", res?.data?.user?._id)
                    navigate("/")
                }).catch((error) => {
                    console.log(error, '33')
                })
        },
        onError: () => {
            console.log('Login Failed------------------------------------');
        },
        // scope: 'https://www.googleapis.com/auth/contacts.readonly',
    });
    console.log("sho----w", showsignUp, token)


    const validate = () => {
        let newError = {};
        if (!mobile) {
            newError.mobile = 'Mobile number is required*';
        } else if (!/^\d+$/.test(mobile)) {
            newError.mobile = 'Mobile number must contain digits only';
        } else if (mobile.length < 10) {
            newError.mobile = 'Mobile number must be at least 10 digits';
        } else if (mobile.length > 12) {
            newError.mobile = 'Mobile number must not exceed 12 digits';
        }
        setError(newError);
        return Object.keys(newError)?.length;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            return
        }

        setMobile(mobile?.trim())
        const signupData = {
            mobile
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/register`, signupData).then((res) => {
            console.log(res?.data)
            setShowSignUp(false)
            setOtpModel(true)
            setOtp("")
            setData(res?.data?.userData)
            setId(res?.data?.userData?._id)
            setName("")
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleVerify = (e) => {
        e.preventDefault();
        const verifyData = {
            otp, _id
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/verify-otp`, verifyData).then((res) => {
            loginData(res?.data?.token)
            localStorage.setItem("_id", res?.data?.user?._id)
            if (res?.data?.user?.name) {
                navigate("/")
            } else {
                setOtpModel(false)
                setNameModel(true)
            }

        }).catch((error) => {
            if (error?.response?.data?.message == 'otp does not match') {
                setOtpVerifyError('OTP does not match');
            }
        })
    }

    const handelResend = (e) => {
        handleSubmit(e);
    }

    const handleOtpClose = () => {
        setOtpModel(false)
        onClose()
    }

    const validateName = () => {
        let newError = {};

        if (!name?.trim()) {
            newError.name = 'Name is required'
        } else if (name?.length < 3) {
            newError.name = 'minimum 3 character required'
        }

        setError(newError);
        return Object.keys(newError)?.length;
    }

    const handleName = (e) => {
        e.preventDefault();

        setName(name?.trim());
        const userDetilas = {
            _id, name
        }


        if (validateName())
            return
        axios.patch(`${process.env.REACT_APP_BASE_URL}api/user/update`, userDetilas,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {
                headerUpdate(true)
                setShowSignUp(false)
                setNameModel(false)
                setOtpModel(false)
                navigate("/")
            }).catch((error) => {
                console.log(error);
            })
    }

    const onClose = () => {
        setShowSignUp(false)
        const lastURL = localStorage.getItem('lastURL');
        const secondLastURL = localStorage.getItem('secondLastUrl');
        navigate(`${lastURL}`)
    }

    return (

        <>
            {showsignUp && (
                <div className="modal-overlay"  >

                    <div className='model' onClick={(e) => e.stopPropagation()}>
                        <div className='close-model'>
                            <button onClick={onClose}>X</button>
                        </div>
                        <div className="sign-up-top">
                            <div className="sign-up-header">
                                <img src={laaagi} alt="laaagi" />
                                <div >Laaagi</div>
                            </div>
                            <div className='model-text'>Login/Signup with Laaagi</div>
                            <div className="sign-up-form-main" >
                                <form className="sign-up-form" onSubmit={handleSubmit}>
                                    <div className="sign-up-input">
                                        <input type="text" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => {
                                            const newValue = e.target.value;
                                            if (newValue?.length <= 10) {
                                                setMobile(newValue)
                                            }
                                            setError({ ...error, mobile: '' })

                                        }} />

                                        {error.mobile && (<div className="error-msg">{error?.mobile}</div>)}

                                    </div>
                                    <div className="sign-up-submit">

                                    </div>
                                    <div className="sign-up-submit">
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="sign-up-or">or</div>
                            <div className="sign-up-google-login" onClick={
                                () => { login() }} >
                                <img src={Google} />
                                <div>
                                    &nbsp;sign in with google
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
            {nameModel &&
                (<div className="modal-overlay">
                    <div className='model' onClick={(e) => e.stopPropagation()}>
                        <div className="sign-up-top">
                            <div className="sign-up-header">
                                <img src={laaagi} alt="laaagi" />
                                <div >Laaagi</div>
                            </div>
                            <div className='model-text'>Please Fill Details</div>
                            <div className="sign-up-form-main" >
                                <form className="sign-up-form" onSubmit={handleName}>
                                    <div className="sign-up-input">
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            value={name}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^[a-zA-Z\s]*$/.test(value)) {
                                                    setName(value);
                                                }
                                            }}
                                        />

                                    </div>
                                    {error.name && (<div className="error-msg">{error?.name}</div>)}
                                    <div className="sign-up-submit">
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>)

            }
            {
                otpModel &&
                (<div className="modal-overlay" onClick={handleOtpClose}>
                    <div className='model' onClick={(e) => e.stopPropagation()}>
                        <div className='close-model'>
                            <button onClick={handleOtpClose}>X</button>
                        </div>
                        <div className="sign-up-top">
                            <div className="sign-up-header">
                                <img src={laaagi} alt="laaagi" />
                                <div >Laaagi</div>
                            </div>
                            <div className='model-text'>We sent OTP on : {mobile}</div>
                            <div className="sign-up-form-main" >
                                <form className="sign-up-form" onSubmit={handleVerify}>
                                    <div className="sign-up-input">
                                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    </div>
                                    {otpVerifyError && (<div className="error-msg">{otpVerifyError}</div>)}
                                    <div className="sign-up-submit">
                                        <button type="submit">Next</button>
                                    </div>
                                </form>
                            </div>
                            <div className="sign-up-or" onClick={handelResend}>Resend</div>
                            <div>Your OTP: {data?.otp}</div>
                        </div>
                    </div>
                </div>)
            }
        </>

























        // <>{
        //     showsignUp && (
        //         !otpModel ? (<div className="modal-overlay"  >

        //             <div className='model' onClick={(e) => e.stopPropagation()}>
        //                 <div className='close-model'>
        //                     <button onClick={onClose}>X</button>
        //                 </div>
        //                 <div className="sign-up-top">
        //                     <div className="sign-up-header">
        //                         <img src={laaagi} alt="laaagi" />
        //                         <div >Laaagi</div>
        //                     </div>
        //                     <div className='model-text'>Login/Signup with Laaagi</div>
        //                     <div className="sign-up-form-main" >
        //                         <form className="sign-up-form" onSubmit={handleSubmit}>
        //                             <div className="sign-up-input">
        //                                 <input type="text" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => {
        //                                     const newValue = e.target.value;
        //                                     if (newValue?.length <= 10) {
        //                                         setMobile(newValue)
        //                                     }
        //                                     setError({ ...error, mobile: '' })

        //                                 }} />

        //                                 {error.mobile && (<div className="error-msg">{error?.mobile}</div>)}

        //                             </div>
        //                             <div className="sign-up-submit">

        //                             </div>
        //                             <div className="sign-up-submit">
        //                                 <button type="submit">Submit</button>
        //                             </div>
        //                         </form>
        //                     </div>
        //                     <div className="sign-up-or">or</div>
        //                     <div className="sign-up-google-login" onClick={
        //                         () => { login() }} >
        //                         <img src={Google} />
        //                         <div>
        //                             &nbsp;sign in with google
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>) : (nameModel ?
        //             (<div className="modal-overlay">
        //                 <div className='model' onClick={(e) => e.stopPropagation()}>
        //                     <div className="sign-up-top">
        //                         <div className="sign-up-header">
        //                             <img src={laaagi} alt="laaagi" />
        //                             <div >Laaagi</div>
        //                         </div>
        //                         <div className='model-text'>Please Fill Details</div>
        //                         <div className="sign-up-form-main" >
        //                             <form className="sign-up-form" onSubmit={handleName}>
        //                                 <div className="sign-up-input">
        //                                     <input
        //                                         type="text"
        //                                         placeholder="Enter Name"
        //                                         value={name}
        //                                         onChange={(e) => {
        //                                             const value = e.target.value;
        //                                             if (/^[a-zA-Z\s]*$/.test(value)) {
        //                                                 setName(value);
        //                                             }
        //                                         }}
        //                                     />

        //                                 </div>
        //                                 {error.name && (<div className="error-msg">{error?.name}</div>)}
        //                                 <div className="sign-up-submit">
        //                                     <button type="submit">Submit</button>
        //                                 </div>
        //                             </form>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>)
        //             : (<div className="modal-overlay" onClick={handleOtpClose}>
        //                 <div className='model' onClick={(e) => e.stopPropagation()}>
        //                     <div className='close-model'>
        //                         <button onClick={handleOtpClose}>X</button>
        //                     </div>
        //                     <div className="sign-up-top">
        //                         <div className="sign-up-header">
        //                             <img src={laaagi} alt="laaagi" />
        //                             <div >Laaagi</div>
        //                         </div>
        //                         <div className='model-text'>We sent OTP on : {mobile}</div>
        //                         <div className="sign-up-form-main" >
        //                             <form className="sign-up-form" onSubmit={handleVerify}>
        //                                 <div className="sign-up-input">
        //                                     <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        //                                 </div>
        //                                 {otpVerifyError && (<div className="error-msg">{otpVerifyError}</div>)}
        //                                 <div className="sign-up-submit">
        //                                     <button type="submit">Next</button>
        //                                 </div>
        //                             </form>
        //                         </div>
        //                         <div className="sign-up-or" onClick={handelResend}>Resend</div>
        //                         <div>Your OTP: {data?.otp}</div>
        //                     </div>
        //                 </div>
        //             </div>))
        //     )
        // }
        // </>
    )
}

