import React from 'react';
import {Box, BoxProps, Button, ButtonProps, styled, Typography, TypographyProps} from "@mui/material";
import {useNavigate} from "react-router-dom";

const HomePageBox = styled(Box)<BoxProps>(() => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1em",
    height: "100vh",
    width:"100%",
    backgroundColor: "#f9fdff",
}));

const MainPageTypography = styled(Typography)<TypographyProps>(({theme}) => ({
    fontFamily: "Druk Wide Trial",
    letterSpacing: "-0.05em",
    lineHeight: 0.8,
    textTransform: "uppercase",
    fontSize: "12em",
    [theme.breakpoints.up('lg')]: {
        fontSize: "11em"
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: "7em"
    },
    [theme.breakpoints.down('md')]: {
        fontSize: "5em"

    },
    [theme.breakpoints.down('sm')]: {
        fontSize: "3em"
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: "2.5em"
    },
}));

const ButtonBox = styled(Box)<BoxProps>(({theme}) => ({
    width:"40vw", display:"flex", alignItems:"end", justifyContent:"end",  padding: "1em",
    [theme.breakpoints.down('md')]: {
        width:"50vw"
    },
    [theme.breakpoints.down('sm')]: {
        width:"80vw"
    },
    [theme.breakpoints.only('xs')]: {
        width:"80vw"}
}));

const ButtonStyled = styled(Button)<ButtonProps>(({theme}) => ({
    backgroundColor: "#3c9ffa", width:"40%",
    [theme.breakpoints.down('md')]: {
        width:"50%"
    },
    [theme.breakpoints.down('sm')]: {
        width:"80%"
    },
    [theme.breakpoints.only('xs')]: {
        width:"80%"}
}));

const PromoTypography = styled(Typography)<TypographyProps>(({theme}) => ({
    fontFamily: "Druk Wide Trial",
    fontSize: "1.5rem",
    [theme.breakpoints.up('lg')]: {
        fontSize: "1.5rem"
    },
    [theme.breakpoints.down('lg')]: {
        fontSize: "1.2em"
    },
    [theme.breakpoints.down('md')]: {
        fontSize: "1em"

    },
    [theme.breakpoints.down('sm')]: {
        fontSize: "1em"
    },
    [theme.breakpoints.only('xs')]: {
        fontSize: "1em"
    },
}));

const PromoTypography2 = styled(Typography)<TypographyProps>(({theme}) => ({
    fontFamily: "Nunito",
    fontSize: "1.5rem"
}));

const TextContainer = styled(Box)<BoxProps>(({theme}) => ({
    display: "flex",
    justifyContent: "start",
    width: "80vw",
    padding: "1em",
    marginTop: "15vh",
    color: "#3c9ffa",
    [theme.breakpoints.up('lg')]: {
        justifyContent: "start",
        width: "80vw",
        padding: "1em",
    },
    [theme.breakpoints.down('lg')]: {
        justifyContent: "start",
        width: "80vw",
        padding: "1em",
    },
    [theme.breakpoints.down('md')]: {
        justifyContent: "center",
        width: "80vw",
        padding: "1em",

    },
    [theme.breakpoints.down('sm')]: {
        justifyContent: "center",
        width: "80vw",
        padding: "1em",
    },
    [theme.breakpoints.only('xs')]: {
        justifyContent: "center",
        width: "80vw",
        padding: "1em",
    },
}));

const TextContainer2 = styled(Box)<BoxProps>(({theme}) => ({
    display: "flex",
    justifyContent: "end",
    padding: "1em",
    width: "80vw",
    color: "#3c9ffa",
    [theme.breakpoints.up('lg')]: {
        justifyContent: "end",
        width: "80vw",
        padding: "1em",
    },
    [theme.breakpoints.down('lg')]: {
        justifyContent: "end",
        width: "80vw",
        padding: "1em",
    },
    [theme.breakpoints.down('md')]: {
        justifyContent: "center",
        width: "80vw",
        padding: "1em",

    },
    [theme.breakpoints.down('sm')]: {
        justifyContent: "center",
        width: "80vw",
        padding: "1em",
    },
    [theme.breakpoints.only('xs')]: {
        justifyContent: "center",
        width: "80vw",
        padding: "1em",
    },
}));

const PromoContainer = styled(Box)<BoxProps>(({theme}) => ({
    display: "flex",
    [theme.breakpoints.up('lg')]: {
        display: "flex",
    },
    [theme.breakpoints.down('lg')]: {
        display: "flex",
    },
    [theme.breakpoints.down('md')]: {
        display: "flex",
        alignItems:"center",
        flexDirection:"column"
    },
    [theme.breakpoints.down('sm')]: {
        display: "flex",
        alignItems:"center",
        flexDirection:"column"
    },
    [theme.breakpoints.only('xs')]: {
        display: "flex",
        alignItems:"center",
        flexDirection:"column"
    },
}));

const TextContainer3 = styled(Box)<BoxProps>(({theme}) => ({
    display: "block",
    padding: "1em",
    width: "40vw",
    [theme.breakpoints.up('lg')]: {
        width: "40vw",
    },
    [theme.breakpoints.down('lg')]: {
        width: "40vw",
    },
    [theme.breakpoints.down('md')]: {
        justifyContent: "center",
        width: "80%",
    },
    [theme.breakpoints.down('sm')]: {
        justifyContent: "center",
        width: "80%",
    },
    [theme.breakpoints.only('xs')]: {
        justifyContent: "center",
        width: "80%",
    },
}));


export const HomePage = (): React.ReactElement => {
    const navigate = useNavigate();
    return (
        <HomePageBox>
            <TextContainer><MainPageTypography>Twitter</MainPageTypography></TextContainer>
            <TextContainer2><MainPageTypography>KINGS</MainPageTypography></TextContainer2>
            <PromoContainer>
                <TextContainer3>
                    <PromoTypography sx={{color: "#3c9ffa"}}>powered by ONLY KINGS</PromoTypography>
                </TextContainer3>
                <ButtonBox>
                    <ButtonStyled onClick={() => navigate("/register")} variant="contained">Try now</ButtonStyled>
                </ButtonBox>
            </PromoContainer>
        </HomePageBox>
    );
};