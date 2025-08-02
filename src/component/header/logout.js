import { Modal, Box, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

export const Logout = ({ open, handleClose }) => {
    const context = useContext(AuthContext);
    const setToken = context?.setToken;
    const setUserData = context?.setStoreUserData;

    const navigate = useNavigate()
    const logoutUsers = () => {
        localStorage.removeItem("_id")
        localStorage.removeItem("token")
        setUserData('')
        setToken('')
        handleClose()
        navigate('/')
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '8px'
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3, textAlign:'center'}}>
                    Are you sure you want to Logout
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClose}
                    >
                        No
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => logoutUsers()}
                    >
                        Yes
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}