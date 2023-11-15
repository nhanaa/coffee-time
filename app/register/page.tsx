import { Typography } from '@mui/material';
import React from 'react';
import '../../styles/Register.css';
import RegisterForm from './form/RegisterForm';

const Register = () => {
  return (
    <div>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center', margin: 4 }}
      >
        Register
      </Typography>
      <RegisterForm />
    </div>
  );
};

export default Register;
