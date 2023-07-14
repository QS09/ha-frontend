import { Box, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '0px',
        left: '0px',
        width: '100%',
        height: '64px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1200,
      }}
    >
      <Typography variant="body2">Made with ❤️❤️❤️</Typography>
    </Box>
  );
};
