import { GuestLayout } from '@/layout/GuestLayout';

const LoginPage = () => {
  return <>Login page</>;
};

LoginPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;
export default LoginPage;
