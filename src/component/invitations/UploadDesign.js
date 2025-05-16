
import React, { useState } from 'react';
import axios from 'axios';
import './UploadDesignForm.css';
import { useNavigate } from 'react-router-dom';


export const UploadDesign = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [Category, setCategory] = useState('');

    const [Amount, setAmount] = useState('');
    const [notes, setNotes] = useState('');
    const [designFile, setDesignFile] = useState(null);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setDesignFile(e.target.files[0]);
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
        formData.append('text', Amount);
        formData.append('category',Category);
        formData.append('notes', notes);
        formData.append('designFile', designFile);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}api/user/add_invitation`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setMessage(response.data.message || 'Request submitted successfully!');
            setName('');
            setCategory('');
            setAmount('');
            setNotes('');
            setDesignFile(null);

            if (document.getElementById('designFile')) {
                document.getElementById('designFile').value = "";
            }

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
                    <button className="close-button" onClick={handleClose} style={{ cursor: 'pointer', background: 'transparent', border: 'none', fontSize: '1.5rem' }}>X</button> {/* onClose को handleClose से बदल दिया */}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
  <label htmlFor="category">Category:</label>
  <select
    id="category"
    value={Category}
    onChange={(e) => setCategory(e.target.value)}
  >
    <option value="">-- Select Category --</option>
    <option value="Only Invitation">Only Invitation</option>
    <option value="Invitation on Wooden Box">Invitation on Wooden Box</option>
    <option value="Invitation on Box">Invitation on Box</option>
    <option value="Invitation on Glass Box">Invitation on Glass Box</option>
    <option value="Misc Invitation">Misc Invitation</option>
  </select>
</div>
                    <div className="form-group">
                        <label htmlFor="designFile">Upload Design (PDF, JPG, PNG):</label>
                        <input type="file" id="designFile" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" required />
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
                {message && <p className={`message ${message.toLowerCase().includes('error') || message.toLowerCase().includes('please') ? 'error' : 'success'}`}>{message}</p>}
            </div>
        </div>
    );
};

