
import './model.css';

export const AddSweets = ({ open, handleClose, data, selectedSweet }) => {


    if (!open) return null;
    const handleDone = () => {
        data()
        handleClose();
    }

    return (
        <div className="done-overlay" onClick={handleClose}>
            <div className='done-model' onClick={(e) => e.stopPropagation()}>
                <div className='done-text'>Are you sure you want to add this sweet {selectedSweet?.name} ?</div>
                <button className='done-btn' onClick={handleDone}>Done</button>
            </div>
        </div>
    );
};
