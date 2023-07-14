import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/register');
  }, [router]);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
        <Typography variant="h1">
          Welcome to <a href="https://nextjs.org">Next.js + MUI!</a>
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
}
