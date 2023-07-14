import { GuestLayout } from '@/layouts/GuestLayout';

const LoginPage = () => {
  return <>Login page</>;
};

LoginPage.getLayout = (page) => <GuestLayout>{page}</GuestLayout>;
export default LoginPage;
