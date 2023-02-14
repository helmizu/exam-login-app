import * as React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, Button, Stack, TextField, InputAdornment, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuthContext } from '../lib/AuthProvider';
import { REGEX } from '../constants';
import { sendRecoveryByEmail, sendRecoveryByUsername } from '../lib/Supabase';

const schema = yup.object({
  username: yup.string().lowercase().required(),
}).required();

const ForgotPassword = () => {
  const { session } = useAuthContext();
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const exec = searchParams.get('exec') || '';
  
  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: '',
    },
    resolver: yupResolver(schema)
  });
  const onSubmit = async ({ username }) => {
    try {
      setLoading(true);
      const isEmail = REGEX.EMAIL_VALIDATION.test(username);
      const payload = {};
      const redirectUrl = window.location.origin + '?exec=reset-password&redirectTo=/reset-password'
      const sendRecovery = isEmail ? sendRecoveryByEmail : sendRecoveryByUsername;
      if (isEmail) payload.email = username;
      else payload.username = username;
      const { error } = await sendRecovery(payload, redirectUrl);
      if (!error) {
        navigate('/forgot-password?exec=email-sent')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!!session) {
    const redirectPath = location.state?.from || '/';
    return navigate(redirectPath, { replace: true })
  }

  if (exec === 'email-sent') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Stack direction="column" spacing={3} textAlign="center" alignItems="center">
          <Box width={400}>
            <Typography variant="h4" fontWeight={600}>Check your email to continue</Typography>
            <Typography variant="body1" px={1.5} mt={2}>
              We sent instructions on how to reset your password to the email you used to set up your account. Check your spam folder if you don't see it within the next few minutes.
            </Typography>
          </Box>
          <Button onClick={() => navigate('/sign-in')} variant='contained' fullWidth>
            Back to Sign In
          </Button>
        </Stack>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={3} textAlign="center" alignItems="center">
          <Box width={400}>
            <Typography variant="h4" fontWeight={600}>Password Recovery</Typography>
            <Typography variant="body1" px={1.5} mt={2}>
              Enter the <b>username</b> or <b>email address</b> of the account you're having trouble accessing. We'll send you instructions to reset your password.
            </Typography>
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
          <Button type="submit" variant='contained' disabled={loading} fullWidth>
            Send Email
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default ForgotPassword