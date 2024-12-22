import {
    Avatar,
    Box,
    BoxProps,
    Button,
    Container,
    ContainerProps,
    Grid,
    Link,
    styled,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import LockIcon from '@mui/icons-material/Lock';
import axios, {AxiosError} from "axios";
import {useAuth} from "../context/auth/useAuth";
import { ErrorModal } from "../common/alerts/ErrorModal";
import {getRole, login} from "../../services/AuthService";


export const LoginBox = styled(Box)<BoxProps>(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "1em",
    borderRadius: "10px",
}));

export const LoginContainer = styled(Container)<ContainerProps>(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    height: "100vh",
}));

export const LoginContainer2 = styled(Container)<ContainerProps>(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    marginBottom:"2rem"
}));


export const LoginPage = (): React.ReactElement => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>();
    const {addJwt, addRole} = useAuth();


    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const handleCloseError = () => {
        setError(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = login({email, password});
        response.then(data => {
            addJwt(data);
            const roleResponse = getRole(data.accessToken);
            roleResponse.then(data => {
                addRole(data.authorities[0]);
                if (data.authorities[0] === "ADMIN") {
                    navigate("/admin")
                } else {
                    navigate("/user")
                }
            }).catch((err: Error | AxiosError) => {
                if (axios.isAxiosError(err)) {
                    if (err.response) {
                        setError(true);
                        setErrorText(err.response.data.errorMessages);
                    }  else {
                        setError(true);
                        setErrorText(err.response!.data.errorMessages);
                    }
                }
            })
        }).catch(err => {
            setError(true);
            setErrorText(err.response.data.errorMessages);
        })
    };

    return (
        <LoginContainer maxWidth="xs">
            {error ? <ErrorModal closeModal={handleCloseError} open={error} text={errorText!}/> : null}
            <LoginBox
            >
                <Avatar sx={{m: 1, bgcolor: '#3c9ffa'}}>
                    <LockIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
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
                        fullWidth
                        label="Password"
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 3, mb: 2, backgroundColor: "#3c9ffa", color: "white", "&:hover": {
                                backgroundColor: "#3c9ffa", color: "black"
                            }
                        }}
                    >
                        Sign in
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/reset-password" variant="body2" sx={{color: "white"}}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2" sx={{color: "white"}}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </LoginBox>
        </LoginContainer>
    )
}