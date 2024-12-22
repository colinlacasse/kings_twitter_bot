import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {resetPassword} from "../../services/AuthService";
import {LoginBox, LoginContainer } from "./LoginPage";
import {Avatar, Box, Button, TextField, Typography} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

export const ResetPasPage = () => {
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        resetPassword(email);
        navigate("/home");
    }

    return (
        <LoginContainer maxWidth="xs">
            {/*{error ? <ErrorModal closeModal={handleCloseError} open={error} text={errorText!}/> : null}*/}
            <LoginBox
            >
                <Avatar sx={{m: 1, bgcolor: '#3c9ffa'}}>
                    <LockIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Get reset link on email
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
                        Send link
                    </Button>
                </Box>
            </LoginBox>
        </LoginContainer>
    );
};