'use client';

import React from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRegister } from './useRegister';
import { RegisterFormValues } from '@/types/types';

const RegisterForm = () => {
  const { registerUser, error, isLoading } = useRegister();

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: RegisterFormValues) => {
    await registerUser(data);
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <form
          className="RegisterForm"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid
            spacing={4}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={4}>
              <TextField
                label="Name"
                type="text"
                {...register('name', {
                  required: 'Name is required',
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{ background: '#3d3934' }}
              >
                {!isLoading && <span>Register</span>}
                {isLoading && <span>Registering...</span>}
              </Button>
            </Grid>
            <Grid item xs={4}>
              {error && (
                <Typography variant="body1" sx={{ color: 'red' }}>
                  {error}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default RegisterForm;
