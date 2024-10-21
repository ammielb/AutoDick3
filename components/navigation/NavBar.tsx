import * as React from 'react';



import { Divider } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

export function NavBar() {
  return (
    <Box sx={{ 
        flexGrow: 1,
        height:100
      
      }}>
    <AppBar 
        position="relative"
        // color="primary"
    >
      <Toolbar>
      <Typography variant="h6" component="div" align='left' sx={{ flexGrow: 1 }}>
              huidige tijd
            </Typography>

        <Divider orientation='vertical' flexItem/>

            <Typography variant="h6" component="div" align='center' sx={{ flexGrow: 1 }}>
              Home
            </Typography>

        <Divider orientation='vertical' flexItem/>

            <Typography variant="h6" component="div" align='right' sx={{ flexGrow: 1 }}>
                go to presets
            </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  );
}