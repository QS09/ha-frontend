import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import useAuthContext from '@/hooks/useAuthContext';
import { useEffect } from 'react';

export const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuthContext();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);

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
