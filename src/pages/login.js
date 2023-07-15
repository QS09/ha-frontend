import { Box } from '@mui/material';
import { GuestLayout } from '@/layouts/GuestLayout';
import { LoginForm } from '@/components/LoginForm';

const LoginPage = () => {
  return (
    <Box sx={{ maxWidth: '500px' }}>
      <LoginForm />
    </Box>
  );
};

LoginPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;
export default LoginPage;
