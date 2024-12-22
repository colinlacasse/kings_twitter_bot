import styled from "@emotion/styled";
import {AppBar, AppBarProps, Box, IconButton, Link, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {getRole, logout} from "../../../services/AuthService";
import {useAuth} from "../../context/auth/useAuth";
import MenuIcon from '@mui/icons-material/Menu'
import React from "react";

export const AppBarStyled = styled(AppBar)<AppBarProps>(() => ({
    width: "100%",
    backgroundColor: "#3c9ffa",
}))

export const NavBar = () => {
    const {jwt, clearJwt} = useAuth();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenAccount = () => {
        if (jwt) {
            const response = getRole(jwt!.accessToken);
            response.then(data => {
                if (data.authorities[0] === "ADMIN") {
                    navigate("/admin")

                } else {
                    navigate("/user")
                    // window.location.reload();
                }
            }).catch((err) => {
                navigate("/login");
            })
        } else {
            navigate("/login");
        }
    }

    const handleLogout = () => {
        if (jwt) {
            const response = logout(jwt!.accessToken);
            response.then(data => {
                    clearJwt();
                    navigate("/home");
                }
            ).catch((err: Error | AxiosError) => {
                navigate("/error")
            })
        } else {
            navigate("/error")
        }
    }


    return (
        <AppBarStyled position="static">
            <Toolbar>
                <Box onClick={() => navigate("/home")}>
                    <Tooltip title="Go home">
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                width: 120,
                                maxHeight: {xs: 60, md: 50},
                                maxWidth: {xs: 80, md: 50},
                                cursor: "pointer"
                            }}
                            alt="logo"
                            src="125x125_logo.webp"
                        />
                    </Tooltip>
                </Box>
                <Box sx={{width:"100%"}}></Box>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ml: 2}}
                    onClick={handleOpenUserMenu}
                >
                    <MenuIcon/>
                </IconButton>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem key="Account" onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={handleOpenAccount}>Account</Typography>
                    </MenuItem>
                    <MenuItem key="Log out" onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={handleLogout}>Log out</Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBarStyled>

    )
};