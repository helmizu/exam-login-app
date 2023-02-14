import * as React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, Stack, TextField, InputAdornment, Typography, Collapse } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuthContext } from '../lib/AuthProvider';
import { REGEX } from '../constants';
import { resetUserPassword, updateUserPassword } from '../lib/Supabase';
import ValidationChecker from '../components/ValidationChecker';

const schema = yup.object({
  currentPassword: yup.string().required().label('current password'),
  password: yup.string().matches(REGEX.PASSWORD_VALIDATION, "password does not match with patterns").min(8).required(),
}).required();

const ChangePassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [passwordChecker, setPasswordChecker] = React.useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exec = searchParams.get('exec') || '';

  const { control, handleSubmit, watch, setError } = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async ({ currentPassword, password }) => {
    try {
      setLoading(true);
      const { error } = await updateUserPassword({ currentPassword, password });
      if (error) {
        const err = error?.message || '';
        const errorKey = err.split(": ")[0];
        const errorMessage = err.split(": ")[1]
        setError(errorKey, { message: errorMessage });
      }
      if (!error) {
        navigate('/change-password?exec=password-changed')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (exec === 'password-changed') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Header />
        <Stack direction="column" spacing={3} textAlign="center" alignItems="center">
          <Box width={400}>
            <Typography variant="h4" fontWeight={600}>Success!</Typography>
            <Typography variant="body1" px={1.5} mt={2}>
              Your password has been changed.
            </Typography>
          </Box>
        </Stack>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} textAlign="center" alignItems="center">
          <Box width={400} pb={1}>
            <Typography variant="h4" fontWeight={600}>Change Password</Typography>
            <Typography variant="body1" px={1.5} mt={2}>
              Please enter your password below.
            </Typography>
          </Box>
          <Controller
            name="currentPassword"
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
                placeholder="Current Password"
                sx={{ width: 400 }}
                color="primary"
                type="password"
                onFocus={() => setPasswordChecker(true)}
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
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                placeholder="New Password"
                sx={{ width: 400 }}
                color="primary"
                type="password"
                onFocus={() => setPasswordChecker(true)}
              />
            )}
          />
          <Collapse in={passwordChecker} sx={{ width: '100%' }}>
            <Stack direction="column" gap={0.5} width="100%" alignItems="flex-start" textAlign="left" px={0.5} pb={1}>
              <ValidationChecker valid={REGEX.UPPERCASE_LETTER.test(watch('password'))} message="At least 1 uppercase letter" />
              <ValidationChecker valid={REGEX.LOWERCASE_LETTER.test(watch('password'))} message="At least 1 lowercase letter" />
              <ValidationChecker valid={REGEX.NUMERIC_CHAR.test(watch('password'))} message="At least 1 number" />
              <ValidationChecker valid={REGEX.SPECIAL_CHAR.test(watch('password'))} message="At least 1 symbols (!@#$%^&*)" />
              <ValidationChecker valid={watch('password').length >= 8} message="8 or more characters" />
            </Stack>
          </Collapse>
          <Button type="submit" variant='contained' disabled={loading} fullWidth>
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default ChangePassword;
