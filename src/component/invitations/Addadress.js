import './AddAddressModal.css';
import logoImage from '../../assets/logo.png';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';

export const Addadress = ({ open, onClose, userData }) => {
  const context = useContext(AuthContext);
  const logout = context?.logout;
  const token = context?.token || localStorage.getItem('token');
  const id = localStorage.getItem("_id");
  const [_id] = useState(id);
  const [address, setAddress] = useState('');
  const [googleAddress, setGoogleAddress] = useState('');
  const [error, setError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handleClose = () => {
    setError('');
    setAddressError('');
    setAddress('');
    setGoogleAddress('');
    onClose();
  };

  useEffect(() => {
    if (open) {
      if (userData?.addressBy === 'custom') {
        setAddress(userData?.address || '');
        setGoogleAddress('');
      } else if (userData?.addressBy === 'google') {
        setGoogleAddress(userData?.address || '');
        setAddress('');
      } else {
        setAddress('');
        setGoogleAddress('');
      }
      setError('');
      setAddressError('');
    }
  }, [open, userData]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (address && googleAddress) {
      setError('Only one address field can be filled.');
      return;
    } else if (!address?.trim() && !googleAddress?.trim()) {
      setError('Both address fields cannot be empty.');
      return;
    } else if (address && address.trim().length < 3) {
      setAddressError('Address must be at least 3 characters long.');
      return;
    }

    const addressBy = address ? 'custom' : 'google';

    const payload = {
      _id: _id,
      address: address || googleAddress,
      addressBy: addressBy
    };

    axios.patch(`${process.env.REACT_APP_BASE_URL}api/user/update`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      handleClose();
    }).catch((error) => {
      if (error?.response?.data?.Message === 'jwt expired') {
        logout();
      }
      console.error("Update address error:", error);
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={handleClose} aria-label="Close modal">
          ×
        </button>
        <div className="modal-header">
          <img src={logoImage} alt="Laaagi Logo" className="modal-logo" />
          <span className="modal-brand-name">Laaagi</span>
        </div>
        <h2 className="modal-title" id="titles">Add My Address</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal-input"
            placeholder="Enter Full Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setGoogleAddress('');
              setError('');
              setAddressError('');
            }}
          />
          {addressError && <div style={{ color: 'red' }}>{addressError}</div>}
          <input
            type="text"
            className="modal-input"
            placeholder="Google Address"
            value={googleAddress}
            onChange={(e) => {
              setGoogleAddress(e.target.value);
              setAddress('');
              setError('');
              setAddressError('');
            }}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" className="modal-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
