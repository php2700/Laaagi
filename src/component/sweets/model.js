
import './model.css';

export const AddSweets = ({ open, handleClose, data, selectedSweet }) => {


    if (!open) return null;
    const handleDone = () => {
        data()
        handleClose();
    }

    const CancelSelectSweet = () => {
        handleClose()
    }

    return (
        <div className="done-overlay" onClick={handleClose}>
            <div className='done-model' onClick={(e) => e.stopPropagation()}>
                <div className='done-text'>Are you sure you want to add {selectedSweet?.name[0].toUpperCase() + selectedSweet?.name.slice(1).toLowerCase()} ?</div>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button className='done-btn' onClick={handleDone}>Yes</button>
                    <button className='done-btn' onClick={CancelSelectSweet}>No</button>
                </div>
            </div>
        </div>
    );
};
