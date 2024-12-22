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
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {register} from "../../services/AuthService";
import axios, {AxiosError} from "axios";
import {ErrorModal} from "../common/alerts/ErrorModal";
import LockIcon from '@mui/icons-material/Lock';
import {LoginBox} from "./LoginPage";

const RegistrationContainer = styled(Container)<ContainerProps>(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    height: "100vh",
}));

export const RegisterPage = (): React.ReactElement => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>();
    const navigate = useNavigate();

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value)
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value)
    }

    const handleCloseError = () => {
        setError(false);
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = register({
            email: email!,
            password: password!,
        })

        response.then(data => {
            navigate("/login")
        }).catch((err: Error | AxiosError) => {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    setError(true);
                    setErrorText(err.response.data.errorMessages);
                } else {
                    setError(true);
                    setErrorText(err.response!.data.errorMessages);
                }
            }
        })

    };

    return (
        <RegistrationContainer maxWidth="xs">
            {error ? <ErrorModal closeModal={handleCloseError} open={error} text={errorText!}/> : null}
            <LoginBox

            >
                <Avatar sx={{m: 1, bgcolor: '#3c9ffa'}}>
                    <LockIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
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
                                backgroundColor: "##3c9ffa", color: "black"
                            }
                        }}
                    >
                        Sign up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2" sx={{color: "white"}}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                    {error ? <ErrorModal closeModal={handleCloseError} open={error} text={errorText!}/> : null}
                </Box>
            </LoginBox>
        </RegistrationContainer>
    )
}