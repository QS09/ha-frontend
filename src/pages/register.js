import { GuestLayout } from '@/layouts/GuestLayout';
import { RegisterForm } from '@/components/RegisterForm';
import { Box } from '@mui/material';
const RegisterPage = () => {
  return (
    <Box sx={{ maxWidth: '500px' }}>
      <RegisterForm />
    </Box>
  );
};

RegisterPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;
export default RegisterPage;
