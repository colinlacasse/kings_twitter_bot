import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
export const Loading = () => {
    return (
        <Box sx={{ display: 'flex', width:"100%", justifyContent:"center", alignItems:"center",marginBottom:"2rem", marginTop:"1rem" }}>
            <CircularProgress />
        </Box>
    );
};
