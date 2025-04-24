import React, { useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../context';

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

export const DeleteGuest = ({ open, handleClose, guest, guestList }) => {
    const content = useContext(AuthContext);
    const token = content?.token;
    const handleDelete = (guestId) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}api/user/delete-guest/${guestId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            guestList()
            handleClose()
            console.log(res)
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
                    Are you sure you want to delete this Guest?
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
                        onClick={() => handleDelete(guest?._id)}
                    >
                        Yes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};
