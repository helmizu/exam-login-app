import * as React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, Stack, TextField, InputAdornment, Avatar, Collapse } from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuthContext } from '../lib/AuthProvider';
import { registerUser } from '../lib/Supabase';
import { REGEX } from '../constants';
import ValidationChecker from '../components/ValidationChecker';

const schema = yup.object({
  name: yup.string().required(),
  username: yup.string().lowercase().required(),
  email: yup.string().email().required(),
  password: yup.string().matches(REGEX.PASSWORD_VALIDATION, "password does not match with patterns").min(8).required(),
}).required();

const Register = () => {
  const { session } = useAuthContext();
  const navigate = useNavigate()
  const [passwordChecker, setPasswordChecker] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = async data => {
    try {
      setLoading(true);
      console.log(data);
      const res = await registerUser(data);
      console.log(res);
      if (res) {
        navigate('/sign-in');
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (!!session) {
      navigate('/', { replace: true });
    }
  }, [session])

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
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AbcIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="Full Name"
                sx={{ width: 400 }}
                color="primary"
              />
            )}
          />
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
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="Email"
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
                onFocus={() => setPasswordChecker(true)}
              />
            )}
          />
          <Collapse in={passwordChecker} sx={{ width: '100%' }}>
            <Stack direction="column" gap={0.5} width="100%" alignItems="flex-start" textAlign="left" px={0.5}>
              <ValidationChecker valid={REGEX.UPPERCASE_LETTER.test(watch('password'))} message="At least 1 uppercase letter" />
              <ValidationChecker valid={REGEX.LOWERCASE_LETTER.test(watch('password'))} message="At least 1 lowercase letter" />
              <ValidationChecker valid={REGEX.NUMERIC_CHAR.test(watch('password'))} message="At least 1 number" />
              <ValidationChecker valid={REGEX.SPECIAL_CHAR.test(watch('password'))} message="At least 1 symbols (!@#$%^&*)" />
              <ValidationChecker valid={watch('password').length >= 8} message="8 or more characters" />
            </Stack>
          </Collapse>
          <Button type="submit" variant='contained' fullWidth disabled={loading}>
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default Register