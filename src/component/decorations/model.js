import './model.css';

export const Model = ({ open, onClose, data }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className='model' onClick={(e) => e.stopPropagation()}>
                <div className='close-model'>
                    <button onClick={onClose}>X</button>
                </div>
                <div>
                    <div className='model-text'>Get Quote with Laaagi</div>
                </div>
                <div  >
                    <form className='model-form' >
                        <div className='model-name'>
                            <input type="text" placeholder="First Name*" />
                            <input type="text" placeholder="Last Name*" />
                        </div>
                        <input type="email" placeholder="Email*" />
                        <input type="number" placeholder="Phone Number*" />
                        <textarea className='model-desc' placeholder="Your Message" />

                        <button className='model-button' type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

