import React, {useState} from 'react';
import {Box, IconButton, TextField, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useAuth} from "../../context/auth/useAuth";
import {addModel} from "../../../services/UserService";
import {useNavigate} from "react-router-dom";

type ModelFormProps = {
    refetchAccount: () => void,
    closeModal: () => void,
    openErrorModal: (bool: boolean) => void,
    setErrorText: (msg: string) => void
}
export const ModelForm = ({refetchAccount, closeModal, openErrorModal, setErrorText}: ModelFormProps) => {
    const [name, setName] = useState<string>();
    const {jwt} = useAuth();
    const navigate = useNavigate();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    }
    const handleSubmit = () => {
        const response = addModel({
            name: name!,
            token: jwt!.accessToken
        });
        response.then(res => {
            window.location.reload();
            refetchAccount();
            closeModal();
        }).catch(err => {
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            } else {
                openErrorModal(true);
                setErrorText(err.response.data.errorMessages);
            }
        })
    };

    return (
        <Box sx={{display: "flex", justifyContent: "center", alignItems:"center"}}>
            <TextField
                margin="normal"
                required
                label="Name"
                fullWidth
                value={name}
                onChange={handleChangeName}
                sx={{
                    "& label.Mui-focused": {
                        color: "#fff"
                    }, "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "#fff"
                        }
                    }, input: {
                        "&:-webkit-autofill": {
                            WebkitBoxShadow: "0 0 0 1000px #000000 inset"
                        }
                    }
                }}
            />

            <IconButton onClick={handleSubmit} sx={{marginLeft: "0.5em"}}>
                <Tooltip title="Add">
                    <AddIcon sx={{fontSize: "2rem"}}/>
                </Tooltip>
            </IconButton>

        </Box>
    );
};