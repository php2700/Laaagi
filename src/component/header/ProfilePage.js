import React, { useContext, useEffect, useState } from 'react';
import './ProfilePage.css';
import laaagiLogo from '../../assets/logo.png';
import { AuthContext } from '../context';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import defaultProfile from "../../assets/login/default-profile.png"
import EditIcon from '@mui/icons-material/Edit';


export const ProfilePage = () => {
    const context = useContext(AuthContext);

    const content = useLocation();
    const navigate = useNavigate();

    const userData = context?.storeUserData;
    const setUserData = context?.setStoreUserData;

    const [name, setName] = useState(userData?.name)
    const [email, setEmail] = useState(userData?.email)
    const [mobile, setMobile] = useState(userData?.mobile)
    const [address, setAddress] = useState(userData?.address)
    const [profile, setProfile] = useState()
    const [profilePreview, setProfilePreview] = useState(userData?.profile ? `${process.env.REACT_APP_BASE_URL}uploads/${userData?.profile}` : laaagiLogo);
    const token = context?.token;
    const setDefaultProfile = context?.setDefaultProfile;
    const userId = localStorage.getItem("_id")

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("_id", userId);
        formData.append("name", name);
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
            navigate('/')
        }).catch((error) => {
            console.log(error);
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
                        <label htmlFor="name" className="form-label">Name</label>
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
                        <label htmlFor="Mobile" className="form-label">Mobile</label>
                        <input
                            type="Mobile"
                            id="Mobile"
                            name="Mobile"
                            className="form-input"
                            value={mobile}
                            readOnly
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