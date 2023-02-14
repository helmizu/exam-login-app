import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, Stack, TextField, InputAdornment, Avatar, FormControlLabel, Checkbox, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Link, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { useAuthContext } from '../lib/AuthProvider';

const schema = yup.object({
  username: yup.string().lowercase().required(),
  password: yup.string().required(),
}).required();

const Login = () => {
  const { session, signin, singining } = useAuthContext();
  const location = useLocation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
      password: '',
      remember: false,
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = data => {
    console.log({ data })
    signin(data)
  };

  if (!!session) {
    const redirectPath = location.state?.from || '/';
    return <Navigate to={redirectPath} replace />
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} textAlign="center" alignItems="center">
          <Box pb={2}>
            <Avatar sx={{ width: 80, height: 80 }}>
              <PersonIcon sx={{ fontSize: 64 }} />
            </Avatar>
          </Box>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="Username"
                sx={{ width: 400 }}
                color="primary"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="Password"
                sx={{ width: 400 }}
                color="info"
                type="password"
              />
            )}
          />
          <Stack direction="row" justifyContent="space-between" textAlign="center" alignItems="center" width="100%" px={0.5}>
            <Controller
              name="remember"
              control={control}
              render={({ field }) => (
                <FormControlLabel control={<Checkbox {...field} />} label="Remember me" />
              )}
            />
            <Link to="/forgot-password">
              <Typography variant="caption">Forgot Password?</Typography>
            </Link>
          </Stack>
          <Button type="submit" variant='contained' disabled={singining} fullWidth>
            Sign in
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default Login