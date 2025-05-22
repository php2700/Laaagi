import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadDesignForm.css';
import { useNavigate } from 'react-router-dom';
import { invitationCategory as invitationCategoryList } from '../category'; // ✅ avoid name clash

export const UploadDesign = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [Category, setCategory] = useState('');
    const [invitationCategory, setInvitationCategory] = useState([]);

    const [Amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [designFile, setDesignFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Load category list from import on mount
    useEffect(() => {
        setInvitationCategory(invitationCategoryList);
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setDesignFile(file);
            const fileURL = URL.createObjectURL(file);
            setPreviewURL(fileURL);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setIsLoading(true);

        if (!designFile) {
            setMessage('Please upload a design file.');
            setIsLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', Amount);
        formData.append('category', Category);
        formData.append('invitationCategory', invitationCategory); // 🟡 Just confirm this is needed by your API
        formData.append('description', notes);
        formData.append('image', designFile);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}api/user/add_invitation`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            setMessage(response.data.message || 'Request submitted successfully!');
            setName('');
            setCategory('');
            setInvitationCategory([]);
            setAmount('');
            setNotes('');
            setDesignFile(null);
            setPreviewURL(null);

            const fileInput = document.getElementById('designFile');
            if (fileInput) fileInput.value = "";

            setTimeout(() => {
                setMessage('');
                navigate('/some-thank-you-page-or-back');
            }, 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
            console.error("Error submitting design quote:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="upload-design-page-container">
            <div className="upload-design-form-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Upload Your Design for a Quote</h2>
                    <button className="close-button" onClick={handleClose} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontSize: '1.5rem' }}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            value={Category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">-- Select Category --</option>
                            {invitationCategory.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="designFile">Upload Design (JPG, JPEG, PNG):</label>
                        <input
                            type="file"
                            id="designFile"
                            // value={designFile}
                            onChange={handleFileChange}
                            accept=".jpg,.jpeg,.png"
                            required
                        />
                        {previewURL && (
                            <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
                                <strong>Preview:</strong><br />
                                <img
                                    src={previewURL}
                                    alt="Design Preview"
                                    style={{
                                        maxWidth: '25%',
                                        height: '25%',
                                        border: '1px solid #ccc',
                                        padding: '5px',
                                        marginTop: '5px'
                                    }}
                                />
                                <button
                                    onClick={() => setPreviewURL(null)}
                                    style={{
                                        position: 'relative',
                                        top: 0,
                                        right: 0,
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        cursor: 'pointer',
                                        lineHeight: '18px',
                                        padding: 0
                                    }}
                                    title="Remove preview"
                                    type="button"
                                >
                                    &times;
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="text"
                            id="amount"
                            value={Amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Description:</label>
                        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows="3"></textarea>
                    </div>

                    <button id="sub" type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Get Quote'}
                    </button>
                </form>

                {message && (
                    <p className={`message ${message.toLowerCase().includes('error') || message.toLowerCase().includes('please') ? 'error' : 'success'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};
