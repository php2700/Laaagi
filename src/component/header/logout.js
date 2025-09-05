import { Modal, Box, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context';

export const Logout = ({ open, handleClose }) => {
  const { setToken, setStoreUserData } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const logoutUsers = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("token");
    setStoreUserData('');
    setToken('');
    handleClose();
    navigate('/');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: '85%',  
            sm: 360,     
            md: 400     
          },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="logout-modal-description"
          sx={{
            mt: 2,
            mb: 3,
            textAlign: 'center',
            fontSize: {
              xs: '1rem',
              sm: '1.1rem'
            }
          }}
        >
          Are you sure you want to log out?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row'
            },
            gap: 2
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            fullWidth
          >
            No
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={logoutUsers}
            fullWidth
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
