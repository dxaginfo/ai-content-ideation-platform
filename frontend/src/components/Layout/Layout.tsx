import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import Notification from '../UI/Notification';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Container>
      </Box>
      <Footer />
      <Notification />
    </>
  );
};

export default Layout;
