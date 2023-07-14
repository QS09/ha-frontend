import { Box, Container } from '@mui/material';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const GuestLayout = ({ children }) => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Header />
      <Box
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {children}
      </Box>
      <Footer />
    </Container>
  );
};
