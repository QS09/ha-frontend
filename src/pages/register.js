import { Box } from '@mui/material';
import { GuestLayout } from '@/layouts/GuestLayout';
import { RegisterForm } from '@/components/RegisterForm';

const RegisterPage = () => {
  return (
    <Box sx={{ maxWidth: '500px' }}>
      <RegisterForm />
    </Box>
  );
};

RegisterPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;
export default RegisterPage;
