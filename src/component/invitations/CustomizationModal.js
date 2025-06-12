
import React, { useState } from 'react';
import './CustomizationModal.css';
import axios from 'axios';

const CustomizationModal = ({ isOpen, onClose, onFormSubmitSuccess, invitationId }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [mobile, setMobile] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState({})

  if (!isOpen) return null;

  const handleContainerClick = (e) => {
    e.stopPropagation();
  }

  const validate = () => {
    const newError = {};
    if (!firstName?.trim())
      newError.firstName = 'First name is required.'
    else if (!/^[a-zA-Z\s]*$/.test(firstName)) {
      newError.firstName = 'Plaese enter valid name.'
    } else if (firstName?.length < 3)
      newError.firstName = 'Min 3 character required.'


    if (!lastName?.trim())
      newError.lastName = 'Last name is required.'
    else if (!/^[a-zA-Z\s]*$/.test(lastName)) {
      newError.firstName = 'Plaese enter valid name.'
    } else if (lastName?.length < 3)
      newError.lastName = 'Min 3 character required.'


    if (!mobile) {
      newError.mobile = 'Mobile number is required.';
    } else if (!/^\d+$/.test(mobile)) {
      newError.mobile = 'Mobile number must contain digits only.';
    } else if(mobile?.length !=10){
      newError.mobile = 'Please enter valid number.';
    }

    if (!message?.trim())
      newError.message = 'Messsage is required.'
    else if (message?.length < 3)
      newError.message = 'Min 10 character required.'


    setError(newError)
    return Object.keys(newError)?.length;


  }
  const handleOnclose = () => {
    setError({})
    setFirstName()
    setLastName()
    setMessage()
    setMobile()
    onClose()
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    if (validate()) return


    const customizationData = {
      invitationId,
      firstName, lastName,
      mobile, message,

    }

    axios.post(`${process.env.REACT_APP_BASE_URL}api/user/customization-requests`, customizationData).then((res) => {
      onFormSubmitSuccess();
    }).catch((error) => {
      console.log(error)
    })
  };



  return (
    <div className="modal-overlay" onClick={handleOnclose}>
      <div className="customization-container" onClick={handleContainerClick}>
        <h2 className="modal-title">Get Customization Box</h2>
        <form className="customization-form" onSubmit={handleSubmit}>
          <div className="modal-row">
            <div>
              <input type="text" placeholder="First Name" className="modalinputs" value={firstName} onChange={(e) => {
                setFirstName(e.target.value)
                setError((prev) => ({ ...prev, firstName: '' }))
              }} />
              <div className='customi-error-color'>{error?.firstName || ''}</div>
            </div>
            <div>
              <input type="text" placeholder="Last Name" className="modalinputs" value={lastName} onChange={(e) => {
                setError((prev) => ({ ...prev, setError, lastName: '' }))
                setLastName(e.target.value)
              }} />
              <div className='customi-error-color'>{error?.lastName || ''}</div>

            </div>
          </div>
          <div>
            <input type="text" placeholder="Phone Number" className="modalinputs full" value={mobile} onChange={(e) => {
              setError((prev) => ({ ...prev, setError, mobile: '' }))

              const newValue = e.target.value;
              if (newValue?.length <= 10) {
                setMobile(newValue)
              }
              setError((prev) => ({ ...prev, setError, mobile: '' }))
            }} />
            <div className='customi-error-color'>{error?.mobile || ''}</div>
          </div>
          <div>
            <textarea placeholder="Your Message" className="modal-textarea" value={message} onChange={(e) => {
              setError((prev) => ({ ...prev, setError, message: '' }))
              setMessage(e.target.value)
            }
            }></textarea>
            <div className='customi-error-color'>{error?.message || ''}</div> :
          </div>
          <button type="submit" className="modal-button">Get Customize</button>
        </form>
        <button onClick={handleOnclose} className="modal-close">✕</button>
      </div>
    </div>
  );
};

export default CustomizationModal;