import React from 'react';
import {Avatar, AvatarProps, styled, Typography} from "@mui/material";

type DifferenceSpanProps = {
    num:number;
}

const DifferenceAvatarStyled = styled(Avatar)<AvatarProps>(() => ({
    width:"40px",
    height:"30px",
    backgroundColor:"#0fb886",
    display:"flex",
    justifyContent:"start"
}));

export const DifferenceSpan = ({num}: DifferenceSpanProps) => {
    return (
        <DifferenceAvatarStyled>
            <Typography>+{num}</Typography>
        </DifferenceAvatarStyled>
    );
};
