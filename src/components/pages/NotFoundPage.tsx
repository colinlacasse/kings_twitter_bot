import React from 'react';
import {Avatar, AvatarProps, Box, Link, styled, Typography, TypographyProps} from "@mui/material";

export const AvatarStyled = styled(Avatar)<AvatarProps>(({theme}) => ({
    width: 500,
    height: 500,
    borderRadius: "25px",
    [theme.breakpoints.down('md')]: {
        width: 400,
        height: 400,
    },
    [theme.breakpoints.down('sm')]: {
        width: 350,
        height: 350,
    },
    [theme.breakpoints.only('xs')]: {
        width: 280,
        height: 280,
    },
}));

const TitleTypography = styled(Typography)<TypographyProps>(({theme}) => ({
    fontFamily: "Druk Wide Trial",
    fontSize: "3rem",
    [theme.breakpoints.up('lg')]: {
        fontSize: "3rem",
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: "3rem",
    },
    [theme.breakpoints.down('md')]: {
        fontSize: "2.5rem",
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: "2rem",
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: "1rem",
    },
}));

const LinkTypography = styled(Typography)<TypographyProps>(({theme}) => ({
    fontFamily: "Druk Wide Trial",
    fontSize: "1.5rem",
    [theme.breakpoints.up('lg')]: {
        fontSize: "1.5rem",
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: "1.5rem",
    },
    [theme.breakpoints.down('md')]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: "1rem",
    },

}));

export const NotFoundPage = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10vh", width:"90%", justifyContent:"center"}}>
            <AvatarStyled variant="square" src="404.png"/>
            <TitleTypography sx={{color: "#faf8f8"}}>Page does not exist</TitleTypography>
            <Link href="/home" sx={{color: "#0eb59e"}}>
                <LinkTypography>Go home</LinkTypography>
            </Link>
        </Box>
    );
};

