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
import { resetUserPassword } from '../lib/Supabase';
import ValidationChecker from '../components/ValidationChecker';

const schema = yup.object({
  password: yup.string().matches(REGEX.PASSWORD_VALIDATION, "password does not match with patterns").min(8).required(),
}).required();

const ResetPassword = () => {
  const [loading, setLoading] = React.useState(false);
  const [passwordChecker, setPasswordChecker] = React.useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exec = searchParams.get('exec') || '';

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async ({ password }) => {
    try {
      setLoading(true);
      const { error } = await resetUserPassword({ password });
      console.log({ password, error })
      if (!error) {
        navigate('/reset-password?exec=password-changed')
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
        <Stack direction="column" spacing={3} textAlign="center" alignItems="center">
          <Box width={400}>
            <Typography variant="h4" fontWeight={600}>Success!</Typography>
            <Typography variant="body1" px={1.5} mt={2}>
              Your password has been changed. Sign in to access your account!
            </Typography>
          </Box>
          <Button onClick={() => navigate('/sign-in')} variant='contained' fullWidth>
            Sign In
          </Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} textAlign="center" alignItems="center">
          <Box width={400} pb={1}>
            <Typography variant="h4" fontWeight={600}>Reset Your Password</Typography>
            <Typography variant="body1" px={1.5} mt={2}>
              Please enter your new password below.
            </Typography>
          </Box>
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
                placeholder="Password"
                sx={{ width: 400 }}
                color="secondary"
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

export default ResetPassword;
