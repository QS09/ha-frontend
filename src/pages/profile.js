import { Box, Typography } from '@mui/material';
import { AuthLayout } from '@/layouts/AuthLayout';

const ProfilePage = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Typography variant="h6">Your profile page</Typography>
    </Box>
  );
};

ProfilePage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;
export default ProfilePage;
