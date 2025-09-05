import { useContext, useEffect, useState } from "react"
import laaagi from "../../assets/logo/laaagi.png"
import Google from "../../assets/sign-up/google 1.png"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context"
import './demo.css'

export const LoginDemoVideo = () => {
    const [showDemo, setShowDemo] = useState(true);
    const context = useContext(AuthContext)
    const token = context?.token || localStorage.getItem('token');
    const navigate = useNavigate();
    // const location = useLocation();

    const onClose = () => {
        setShowDemo(false)
        navigate('/');
    }

    return (
        <>
            {showDemo && (
                <div className="demo-overlay"  >

                    <div className='demo' onClick={(e) => e.stopPropagation()}>
                        <div className='close-demo'>
                            <button onClick={onClose}>X</button>
                        </div>
                        <div>
                            <video
                                controls
                                playsInline
                                muted style={{
                                    width: '100%',
                                    maxWidth: '700px',
                                    height: 'auto',
                                    objectFit: 'contain'
                                }}
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
