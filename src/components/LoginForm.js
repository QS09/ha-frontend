import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import {
  Button,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import useAuthContext from '@/hooks/useAuthContext';

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup.string().min(8).max(255).required('Password is required'),
    }),

    onSubmit: async ({ email, password }) => {
      try {
        await login({
          email,
          password,
        });
        enqueueSnackbar('User logged in successfully!', {
          variant: 'success',
        });
        formik.resetForm();
        router.push('/profile');
      } catch (err) {
        enqueueSnackbar('User login failed failed!', {
          variant: 'error',
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="email">Email Address*</InputLabel>
            <OutlinedInput
              fullWidth
              id="email"
              type="email"
              value={formik.values.email}
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Email"
              inputProps={{}}
              error={Boolean(formik.touched.email && formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <FormHelperText error>{formik.errors.email}</FormHelperText>
            )}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <InputLabel htmlFor="password-signup">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password-signup"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="******"
              inputProps={{}}
              error={Boolean(formik.touched.password && formik.errors.password)}
            />
            {formik.touched.password && formik.errors.password && (
              <FormHelperText error>{formik.errors.password}</FormHelperText>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={25} color="info" />
              ) : (
                <span>Login</span>
              )}
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="title" textAlign="center">
              No account yet? <Link href="/register">Register</Link>
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};
