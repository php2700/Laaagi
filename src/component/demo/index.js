import { useContext, useEffect, useState } from "react"
import laaagi from "../../assets/logo/laaagi.png"
import Google from "../../assets/sign-up/google 1.png"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context"


export const DemoVideo = () => {
    const [showDemo, setShowDemo] = useState(false);
    const context = useContext(AuthContext)
    const token = context?.token || localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const onClose = () => {
        setShowDemo(false)
        navigate('/');
    }

    useEffect(() => {
        if (!token)
            setShowDemo(true)
    }, [location?.pathname]);

    return (
        <>
            {showDemo && (
                <div className="modal-overlay"  >

                    <div className='model' onClick={(e) => e.stopPropagation()}>
                        <div className='close-model'>
                            <button onClick={onClose}>X</button>
                        </div>
                        <div className="sign-up-top">
                            <video
                                controls
                                playsInline
                                muted
                            >
                                <source src='/video.mp4' type='video/mp4' />
                            </video>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}
