

import './AddAddressModal.css';
import logoImage from '../../assets/logo.png';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';

export const Addadress = ({ open, onClose, userData }) => {
  const context = useContext(AuthContext);
  const logout = context?.logout;
  const token = context?.token || localStorage.getItem('token');
  const _id = localStorage.getItem('_id');

  const [address, setAddress] = useState('');
  const [googleAddress, setGoogleAddress] = useState('');
  const [error, setError] = useState({});
  const [pincode, setPincode] = useState('');
  const inputRef = useRef(null);

  const handleClose = () => {
    setError({});
    setAddress('');
    setGoogleAddress('');
    setPincode('');
    onClose();
  };
  const onSelect = (formattedAddress) => {
    setGoogleAddress(formattedAddress);
    setAddress('');
    setError((prev) => ({ ...prev, googleAddress: '', address: '' }));
  };

  useEffect(() => {
    if (!open || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'in' },
      fields: ['formatted_address', 'geometry'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place?.formatted_address) {
        onSelect(place.formatted_address);
      }
    });
  }, []);

  useEffect(() => {
    if (open) {
      console.log(userData, 'aaaaaaaaaaa')
      if (userData?.pincode) {
        setPincode(userData?.pincode || '')
      }
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
      setError({});
    }
  }, [open, userData]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newError = {};

    if (!pincode) {
      newError.pincode = 'Pincode required.';
    } else if (!/^[0-9]+$/.test(pincode)) {
      newError.pincode = 'Only number allowed.';
    }
    else if (!pincode.trim()) {
      newError.pincode = 'Can not be empty.';
    } else if (pincode?.length != 6) {
      newError.pincode = 'Not a valid pincode.';
    }

    if (address && googleAddress) {
      newError.googleAddress = 'Only one address field can be filled.';
    } else if (!address?.trim() && !googleAddress?.trim()) {
      newError.googleAddress = 'Both address fields cannot be empty.';
    } else if (address && address.trim().length < 3) {
      newError.address = 'Address must be at least 3 characters long.';
    } else if (!/^[a-zA-Z\s0-9]+$/.test(address)) {
      newError.address = 'Not Allowed special character.';
    }

    setError(newError);
    if (Object.keys(newError)?.length > 0) return;

    const addressBy = address ? 'custom' : 'google';
    const payload = {
      _id,
      address: address || googleAddress,
      addressBy,
      pincode,
    };

    axios
      .patch(`${process.env.REACT_APP_BASE_URL}api/user/update`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => handleClose())
      .catch((error) => {
        if (error?.response?.data?.Message === 'jwt expired') {
          logout();
        }
        console.error('Update address error:', error);
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
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              setError(prev => ({ ...prev, pincode: '' }));
            }}
          />
          <div style={{ color: 'red', minHeight: '19px' }}>{error.pincode || ''}</div>

          <input
            type="text"
            className="modal-input"
            placeholder="Enter Full Address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setGoogleAddress('');
              setError(prev => ({ ...prev, googleAddress: '', address: '' }));
            }}
          />
          {error.address && <div style={{ color: 'red' }}>{error.address}</div>}

          <div>OR</div>
          <input
            ref={inputRef}
            type="text"
            className="modal-input"
            placeholder="Google Address"
            value={googleAddress}
            onChange={(e) => {
              setGoogleAddress(e.target.value);
              setAddress('');
              setError(prev => ({ ...prev, address: '', googleAddress: '' }));
            }}
          />
          {error.googleAddress && <div style={{ color: 'red' }}>{error.googleAddress}</div>}





          <button type="submit" className="modal-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
