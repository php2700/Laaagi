import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.css';
import laaagiLogo from '../../assets/logo.png';
import { AuthContext } from '../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';


export const ProfilePage = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const setDefaultProfile = context?.setDefaultProfile;
    const setUserData = context?.setStoreUserData;
    const logout = context?.logout;
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [mobile, setMobile] = useState()
    const [address, setAddress] = useState()
    const [profile, setProfile] = useState()
    const [profilePreview, setProfilePreview] = useState();
    const [tempMobile, setTempMobile] = useState();


    const userId = localStorage.getItem("_id");
    const token = context?.token || localStorage.getItem('token')


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}api/user/data/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setName(res?.data?.userData?.name)
            setEmail(res?.data?.userData?.email)
            setMobile(res?.data?.userData?.mobile)
            setTempMobile(res?.data?.userData?.mobile)
            setAddress(res?.data?.userData?.address)
            setProfilePreview(res?.data?.userData?.profile ? `${process.env.REACT_APP_BASE_URL}uploads/${res?.data?.userData?.profile}` : laaagiLogo)
        }).catch((error) => {
            if (error?.response?.data?.Message === 'jwt expired') {
                logout()
            }
            console.log(error);
        })

    }, [userId, token])




    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_id", userId);
        formData.append("name", name);
        if (mobile != tempMobile) {
            formData.append("mobile", mobile)
        }
        if (profile) {
            formData.append("profile", profile);
        }
        await axios.patch(`${process.env.REACT_APP_BASE_URL}api/user/update`, formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            setUserData(res?.data?.response)
            setDefaultProfile(true)
            toast.success('Profile update successfully', {
                position: 'top-right'
            })
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }).catch((error) => {

            if (error.response?.data?.message == 'mobile_exist') {
                toast.error('Mobile Already Exist', {
                    position: 'bottom-right'
                })
            }
        })


    };


    return (
        <div className="account-profile-page">
            <div className="profile-header-banner">
                <h1> Profile</h1>
            </div>

            <div className="profile-content">


                <form onSubmit={handleUpdate} className="profile-form">
                    <div className="avatar-section">
                        <img
                            src={profilePreview || laaagiLogo}
                            alt="User Avatar"
                            className="profile-avatar"
                        />
                        <input
                            type="file"
                            id="profilePicInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setProfile(file);
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setProfilePreview(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                        <EditIcon
                            onClick={() => document.getElementById('profilePicInput').click()}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label"style={{ fontFamily: '"FKGroteskNeue", "Geist", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-input"
                            value={name}
                            onChange={(e) => {
                                const input = e.target.value;
                                const onlyLetters = input.replace(/[^a-zA-Z ]/g, '');
                                setName(onlyLetters);
                            }}
                        //  placeholder="Only letters allowed"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={email}
                            readOnly
                        />
                    </div>
<div className="form-group">
  <label htmlFor="mobile" className="form-label">Mobile</label>
  <input
    type="tel"
    id="mobile"
    name="mobile"
    className="form-input"
    value={mobile}
    onChange={(e) => {
      const val = e.target.value.replace(/\D/g, ""); // sirf digits allow
      if (val.length <= 10) {
        setMobile(val);
      }
    }}
    maxLength={10}
    placeholder="Enter 10-digit mobile number"
  />

</div>

                    <div className="form-group">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            className="form-input"
                            readOnly
                            value={address}
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="update-button">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};