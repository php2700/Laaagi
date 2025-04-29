import { useContext, useState } from "react"
import laaagi from "../../assets/logo/laaagi.png"
import './index.css'
import Google from "../../assets/sign-up/google 1.png"
import axios from "axios"
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../context"


// export const SignUp = ({ open, onClose }) => {
export const SignUp = () => {
    // temp
    const [showsignUp, setShowSignUp] = useState(true);


    const navigate = useNavigate()
    const { loginData } = useContext(AuthContext)
    const [name, setName] = useState()
    const [mobile, setMobile] = useState();
    const [_id, setId] = useState()
    const [otpModel, setOtpModel] = useState(false)
    const [otp, setOtp] = useState()
    const [data, setData] = useState()
    const [error, setError] = useState({})

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            await axios.post(`${process.env.REACT_APP_BASE_URL}api/user/google-login`, {
                access_token: tokenResponse?.access_token
            })
                .then((res) => {
                    loginData(res?.data?.token)
                    localStorage.setItem("_id", res?.data?.user?._id)
                    navigate("/")
                }).catch((error) => {
                    console.log(error)
                })
        },
        onError: () => {
            console.log('Login Failed');
        }
    });


    // if (!open) return null;

    const validate = () => {
        let newError = {};

        if (!name?.trim()) {
            newError.name = 'Name is required'
        } else if (name?.length < 3) {
            newError.name = 'minimum 3 character required'
        }

        if (!mobile) {
            newError.mobile = 'Mobile number required'
        } else if (mobile?.length < 10) {
            newError.mobile = 'minimum 10 number required'
        } else if (mobile?.length > 12) {
            newError.mobile = 'mobile max length'
        }

        setError(newError);
        return Object.keys(newError)?.length;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            return
        }

        const signupData = {
            name, mobile
        }

        axios.post(`${process.env.REACT_APP_BASE_URL}api/user/register`, signupData).then((res) => {
            console.log(res?.data)
            setOtpModel(true)
            setOtp("")
            setData(res?.data?.userData)
            setId(res?.data?.userData?._id)
            setMobile("")
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
            navigate("/")
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleOtpClose = () => {
        setOtpModel(false)
        onClose()
    }

    const onClose = () => {
        setShowSignUp(false)
        navigate("/")
    }

    return (
        <>{
            showsignUp && (
                // !otpModel ? (<div className="modal-overlay" onClick={onClose} >
                !otpModel ? (<div className="modal-overlay"  >

                    <div className='model' onClick={(e) => e.stopPropagation()}>
                        <div className='close-model'>
                            <button onClick={onClose}>X</button>
                        </div>
                        <div className="sign-up-top">
                            <div className="sign-up-header">
                                <img src={laaagi} alt="laaagi" />
                                <div >Laaagi</div>
                            </div>
                            <div className='model-text'>Login/Signup with laaagi</div>
                            <div className="sign-up-form-main" >
                                <form className="sign-up-form" onSubmit={handleSubmit}>
                                    <div className="sign-up-input">
                                        <input type="text" placeholder="Enter Name" value={name} onChange={(e) => {
                                            setName(e.target.value)
                                            setError({ ...error, name: '' })
                                        }} />
                                        {error.name && (<div className="error-msg">{error?.name}</div>)}
                                    </div>
                                    <div className="sign-up-input">
                                        <input type="number" placeholder="Enter Mobile Number" value={mobile} onChange={(e) => {
                                            setMobile(e.target.value)
                                            setError({ ...error, mobile: '' })
                                        }} />
                                        {error.mobile && (<div className="error-msg">{error?.mobile}</div>)}

                                    </div>
                                    <div className="sign-up-submit">
                                        <button type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                            <div className="sign-up-or">or</div>
                            <div className="sign-up-google-login" onClick={() => login()} >
                                <img src={Google} />
                                <div>
                                    &nbsp;sign in with google
                                </div>
                            </div>
                        </div>
                    </div>
                </div>) : (<div className="modal-overlay" onClick={handleOtpClose}>
                    <div className='model' onClick={(e) => e.stopPropagation()}>
                        <div className='close-model'>
                            <button onClick={handleOtpClose}>X</button>
                        </div>
                        <div className="sign-up-top">
                            <div className="sign-up-header">
                                <img src={laaagi} alt="laaagi" />
                                <div >Laaagi</div>
                            </div>
                            <div className='model-text'>We sent OTP on {mobile}</div>
                            <div className="sign-up-form-main" >
                                <form className="sign-up-form" onSubmit={handleVerify}>
                                    <div className="sign-up-input">
                                        <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                                    </div>
                                    <div className="sign-up-submit">
                                        <button type="submit">Next</button>
                                    </div>
                                </form>
                            </div>
                            <div className="sign-up-or">resend</div>
                        </div>
                    </div>
                </div>)
            )
        }

        </>
    )
}

