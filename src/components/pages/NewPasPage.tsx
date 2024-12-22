import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {setNewPassword} from "../../services/AuthService";
import {LoginBox, LoginContainer} from "./LoginPage";
import {Avatar, Box, Button, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

type NewPasPageParams = {
    token: string
}

export const NewPasPage = () => {
    const navigate = useNavigate();
    const {token} = useParams<NewPasPageParams>();
    const [password, setPassword] = useState<string>("");
    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        setNewPassword({password,accessToken:token!});
        navigate("/login");
    }

    return (
        <LoginContainer maxWidth="xs">
            {/*{error ? <ErrorModal closeModal={handleCloseError} open={error} text={errorText!}/> : null}*/}
            <LoginBox
            >
                <Avatar sx={{m: 1, bgcolor: '#e01d1d'}}>
                    <LockIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset password
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="New Password"
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
                            mt: 3, mb: 2, backgroundColor: "#e01d1d", color: "white", "&:hover": {
                                backgroundColor: "#e01d1d", color: "black"
                            }
                        }}
                    >
                        Reset password
                    </Button>
                </Box>
            </LoginBox>
        </LoginContainer>
    );
};