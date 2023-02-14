import * as React from 'react'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack, TextField, InputAdornment, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuthContext } from '../lib/AuthProvider';
import { REGEX } from '../constants';
import { sendRecoveryByEmail, sendRecoveryByUsername } from '../lib/Supabase';

const Error = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const error = state?.error?.split('_')?.join(' ') || 'Error';
  const errorCode = state?.errorCode || '000';
  const errorMessage = state?.errorMessage || 'Error Message';

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Header />
      <Stack direction="column" spacing={3} textAlign="center" alignItems="center">
        <Box width={400}>
          <Typography variant="h4" fontWeight={600} textTransform="capitalize">{`${error} (${errorCode})`}</Typography>
          <Typography variant="body1" px={1.5} mt={2}>
            {errorMessage}
          </Typography>
        </Box>
        <Button onClick={() => navigate('/')} variant='contained' fullWidth>
          Back to Home
        </Button>
      </Stack>
    </Box>
  )
}

export default Error