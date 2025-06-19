import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar, Alert } from '@mui/material';

import { RootState } from '../../redux/store';
import { hideNotification } from '../../redux/slices/uiSlice';

const Notification: React.FC = () => {
  const dispatch = useDispatch();
  const { show, message, type } = useSelector((state: RootState) => state.ui.notification);

  const handleClose = () => {
    dispatch(hideNotification());
  };

  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show, dispatch]);

  return (
    <Snackbar
      open={show}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={type || 'info'}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
