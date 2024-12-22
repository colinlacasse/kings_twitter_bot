import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import React from 'react';

type ErrorProps = {
    closeModal: () => void,
    text: string,
    open: boolean
}
export const ErrorModal = ({closeModal, text, open}: ErrorProps) => {
    return (
        <Dialog
            open={open}
            onClose={closeModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" sx={{color:"#fa5352"}}>
                {"Error"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};