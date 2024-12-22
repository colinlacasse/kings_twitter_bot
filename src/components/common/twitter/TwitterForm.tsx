import {Box, BoxProps, IconButton, styled, TextField, Tooltip} from '@mui/material';
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import {addTwitterAccount} from "../../../services/TwitterService";
import {useAuth} from "../../context/auth/useAuth";
import {useNavigate} from "react-router-dom";

type TwitterFormProps = {
    modelId: number,
    refetchAccount: () => void,
    closeModal: () => void,
    openErrorModal: (bool: boolean) => void,
    setErrorText: (msg: string) => void,
    handleChangeLoading : () => void
}

export const TwitterBox = styled(Box)<BoxProps>(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent:"center",
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        width:"90%"
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        width:"90%"
    },
    [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
        width:"90%"
    },
}));
export const TwitterForm = ({modelId, refetchAccount, closeModal, openErrorModal, setErrorText, handleChangeLoading}: TwitterFormProps) => {
    const {jwt} = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [proxy, setProxy] = useState<string>();
    const [token, setToken] = useState<string>();
    const [ct0, setCt0] = useState<string>();

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }

    const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMessage(event.target.value);
    }

    const handleChangeProxy = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setProxy(event.target.value);
    }

    const handleChangeToken = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setToken(event.target.value);
    }

    const handleChangeCt0 = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setCt0(event.target.value);
    }

    const handleSubmit = () => {
        handleChangeLoading();
        const response = addTwitterAccount({
            modelId: modelId,
            username: username!,
            email: email!,
            password: password!,
            proxy: proxy!,
            authToken: token!,
            csrfToken: ct0!,
            message: message!,
            token: jwt!.accessToken
        });
        response.then(res => {
            handleChangeLoading();
            window.location.reload();
            refetchAccount();
            closeModal();
        }).catch(err => {
            handleChangeLoading();
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
        <TwitterBox>
            <TextField
                margin="normal"
                required
                label="Username"
                fullWidth
                value={username}
                onChange={handleChangeUsername}
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

            <TextField
                margin="normal"
                required
                label="Password"
                fullWidth
                value={password}
                onChange={handleChangePassword}
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

            <TextField
                margin="normal"
                required
                label="Email"
                fullWidth
                value={email}
                onChange={handleChangeEmail}
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

            <TextField
                margin="normal"
                required
                label="Proxy"
                fullWidth
                value={proxy}
                onChange={handleChangeProxy}
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

            <TextField
                margin="normal"
                required
                label="Token"
                fullWidth
                value={token}
                onChange={handleChangeToken}
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

            <TextField
                margin="normal"
                required
                label="Ct0"
                fullWidth
                value={ct0}
                onChange={handleChangeCt0}
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

            <TextField
                margin="normal"
                required
                multiline
                label="Message"
                fullWidth
                value={message}
                onChange={handleChangeMessage}
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

        </TwitterBox>
    );
};
