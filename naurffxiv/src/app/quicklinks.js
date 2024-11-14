import React from 'react';
import { Box, MenuItem, Typography } from '@mui/material';
import Link from 'next/link';
import { ultimateList } from './constants.js';

export default function QuickLinks() {
  return (
    <>
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          right: 0,
          justifyContent: 'right',
        }}
        justifyContent='flex-end'
      >
        {ultimateList.map((fight, i) => (
          <MenuItem key={i}>
            <Typography
              variant="subtitle1"
              component="div"
              align="right"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }} }
            >
              <Link href={fight.link}>
                {fight.name}
              </Link>
            </Typography>
          </MenuItem>
        ))}
      </Box>
    </>
  );
}
