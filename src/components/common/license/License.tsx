import {Box, BoxProps, styled, Typography} from "@mui/material";
import CopyrightIcon from '@mui/icons-material/Copyright';

const LicenseBox = styled(Box)<BoxProps>(({theme}) => ({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontFamily:"Druk Wide Trial",
    paddingRight:"2rem",
    fontSize: "2rem",
    position:"fixed",
    backgroundColor:"#121212",
    bottom:0,
    width:"100%",
    [theme.breakpoints.down('md')]: {
        fontSize: "2rem"
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: "1.7rem"
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: "1.2rem"
    },
}));
export const License = () => {
    return (
        <LicenseBox>
            <Typography sx={{ marginRight:"1rem"}}>All Rights Reserved</Typography>
            <Typography sx={{fontFamily:"inherit"}}>2024 <CopyrightIcon sx={{fontSize:"inherit"}}/></Typography>
        </LicenseBox>
    );
};