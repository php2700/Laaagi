import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UploadDesignForm.css';
import { useNavigate } from 'react-router-dom';
import { invitationCategory } from "../category"

export const
    UploadDesign = () => {
        const navigate = useNavigate();

        const [name, setName] = useState('');
        const [category, setCategory] = useState('');
        const [error, setError] = useState({});
        const [amount, setAmount] = useState('');
        const [notes, setNotes] = useState('');
        const [designFile, setDesignFile] = useState(null);
        const [previewURL, setPreviewURL] = useState(null);
        const [message, setMessage] = useState('');
        const [isLoading, setIsLoading] = useState(false);

        const handleFileChange = (e) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                setDesignFile(file);
                const fileURL = URL.createObjectURL(file);
                setPreviewURL(fileURL);
            }
        };

        const validate = () => {
            const newError = {};

            if (!name?.trim()) newError.name = 'Name is required.';
            else if (name.trim().length < 3) newError.name = 'Name must be at least 3 characters.';

            if (!amount?.trim()) newError.amount = 'Amount is required.';
            else if (isNaN(amount)) newError.amount = 'Amount must be a number.';

            if (!category) newError.category = 'Category is required.';

            if (!notes?.trim()) newError.notes = 'Description is required.';
            else if (notes.trim().length < 10) newError.notes = 'Description must be at least 10 characters.';

            if (!designFile) {
                setMessage('Please upload a design file.');
            }

            setError(newError);
            return Object.keys(newError).length;
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setMessage('');
            setIsLoading(true);

            if (validate()) {
                setIsLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('price', amount.trim());
            formData.append('category', category);
            formData.append('description', notes.trim());
            formData.append('image', designFile);

            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}api/user/upload-design-quote`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    }
                );
                setMessage(response.data.message || 'Request submitted successfully!');
                setName('');
                setCategory('');
                setAmount('');
                setNotes('');
                setDesignFile(null);
                setPreviewURL(null);

                const fileInput = document.getElementById('designFile');
                if (fileInput) fileInput.value = '';

                setTimeout(() => {
                    setMessage('');
                    navigate('/invitation');
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
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                placeholder='Enter Invitation Name'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError((prev) => ({ ...prev, name: '' }));
                                }}
                            />
                            <div className="error">{error?.name || ''}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category:</label>
                            <select
                                className='invitation-select-category'
                                id="category"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setError((prev) => ({ ...prev, category: '' }));
                                }}
                            >
                                <option value=""> Choose Your Category </option>
                                {invitationCategory.map((cat, index) => (
                                    <option key={index} value={cat} >{cat}</option>
                                ))}
                            </select>
                            <div className="error">{error?.category || ''}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="designFile">Upload Design (JPG, JPEG, PNG):</label>
                            <input
                                className='invitation-upload-file'
                                type="file"
                                id="designFile"
                                onChange={handleFileChange}
                                accept=".jpg,.jpeg,.png"
                            />
                            <div className="error">{message}</div>

                            {previewURL && (
                                <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
                                    <strong>Preview:</strong><br />
                                    <img
                                        src={previewURL}
                                        alt="Design Preview"
                                        style={{
                                            maxWidth: '25%',
                                            height: 'auto',
                                            border: '1px solid #ccc',
                                            padding: '5px',
                                            marginTop: '5px'
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            setPreviewURL(null);
                                            setDesignFile(null);
                                            const fileInput = document.getElementById('designFile');
                                            if (fileInput) fileInput.value = '';
                                        }}
                                        style={{
                                            position: 'absolute',
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
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setError((prev) => ({ ...prev, amount: '' }));
                                }}
                                placeholder="Enter amount"
                            />
                            <div className="error">{error?.amount || ''}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">Description:</label>
                            <textarea
                                id="notes"
                                placeholder='Enter Description'
                                value={notes}
                                onChange={(e) => {
                                    setNotes(e.target.value);
                                    setError((prev) => ({ ...prev, notes: '' }));
                                }}
                                rows="3"
                            ></textarea>
                            <div className="error">{error?.notes || ''}</div>
                        </div>

                        <button id="sub" type="submit" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Get Quote'}
                        </button>
                    </form>

                    {message && !message.includes("upload") && (
                        <p className={`message ${message.toLowerCase().includes('error') || message.toLowerCase().includes('please') ? 'error' : 'success'}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        );
    };

