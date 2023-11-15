import { AppBar, Link, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      className="Navbar"
      sx={{ background: '#3d3934' }}
    >
      <Toolbar>
        <Typography
          className="AppName"
          variant="h5"
          component="div"
          fontFamily={'inherit'}
          sx={{ color: '#eebc1d', font: '1.75rem bold', flexGrow: 1 }}
        >
          Coffee Time
        </Typography>
        <Link
          href="/"
          color="inherit"
          underline="none"
          sx={{ margin: 2 }}
        >
          Home
        </Link>
        <Link
          href="/register"
          color="inherit"
          underline="none"
          sx={{ margin: 2 }}
        >
          Register
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
