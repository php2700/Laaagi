import './AddAddressModal.css';
import logoImage from '../../assets/logo.png';
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context';

export const Addadress = ({ open, onClose, userData }) => {
  const context = useContext(AuthContext);
  const token = context?.token;
  const id = localStorage.getItem("_id");
  const [_id, setId] = useState(id);
  const [address, setAddress] = useState(userData?.address);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      _id: _id,
      address: address,
    }

    axios.patch(`${process.env.REACT_APP_BASE_URL}api/user/update`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      onClose();
    }).catch((error) => {

      console.log("error", error)
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
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
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            className="modal-input"
            placeholder="Google Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button type="submit" className="modal-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
