import { Modal, Box, Typography, Button } from '@mui/material';

export const Logout = ({ open, handleClose, logoutUser }) => {
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
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
                    Are you sure you want to Logout
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        onClick={() => logoutUser()}
                    >
                        Yes
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}