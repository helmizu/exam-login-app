import * as React from 'react';
import ValidIcon from '@mui/icons-material/Check';
import InvalidIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';

const ValidationChecker = ({ valid, message }) => {
  const Icon = valid ? ValidIcon : InvalidIcon;
  const color = valid ? 'success.main' : 'error.main';

  return (
    <Typography display="inline-flex" alignItems="center" variant="body2" color={color} gap={0.5}>
      <Icon sx={{ color: 'inherit', fontSize: 'inherit', mb: '2px' }} /> {message}
    </Typography>
  )
}

export default ValidationChecker;
