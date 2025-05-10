// src/components/UploadDesignForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './UploadDesignForm.css'; // We'll create this CSS file


export const UploadDesignForm = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [quantity, setQuantity] = useState('');
    const [notes, setNotes] = useState('');
    const [designFile, setDesignFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setDesignFile(e.target.files[0]);
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
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('quantity', quantity);
        formData.append('notes', notes);
        formData.append('designFile', designFile); // 'designFile' should match multer field name

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}api/user/forms`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setMessage(response.data.message || 'Request submitted successfully!');
            // Optionally reset form
            setName('');
            setEmail('');
            setPhone('');
            setQuantity('');
            setNotes('');
            setDesignFile(null);
            // e.target.reset(); // or this to reset the form element
            setTimeout(() => {
                onClose(); // Close modal after a delay
                setMessage('');
            }, 3000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. Please try again.');
            console.error("Error submitting design quote:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Upload Your Design for a Quote</h2>
                <button className="modal-close-button" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Expected Quantity:</label>
                        <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="designFile">Upload Design (PDF, JPG, PNG):</label>
                        <input type="file" id="designFile" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Additional Notes:</label>
                        <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows="3"></textarea>
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Get Quote'}
                    </button>
                </form>
                {message && <p className={`message ${message.includes('error') ? 'error' : 'success'}`}>{message}</p>}
            </div>
        </div>
    );
};

// export default UploadDesignForm;