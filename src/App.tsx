import React, {useEffect, useState} from 'react';
import {JwtResponse} from "./components/types/AuthTypes";
import {Box, BoxProps, createTheme, CssBaseline, styled, ThemeProvider} from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from './components/context/auth/AuthContext';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { HomePage } from './components/pages/HomePage';
import { UserPage } from './components/pages/UserPage';
import { ResetPasPage } from './components/pages/ResetPasPage';
import {LoginPage} from "./components/pages/LoginPage";
import {RegisterPage} from "./components/pages/RegisterPage";
import { License } from './components/common/license/License';
import { NewPasPage } from './components/pages/NewPasPage';
import {NavBar} from "./components/common/navbar/NavBar";
import { ModelPage } from './components/pages/ModelPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AppPageBox = styled(Box)<BoxProps>(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
}))

function App() {
  const [authValue, setAuthValue] = useState<JwtResponse | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const handleAuthValue = (jwt: JwtResponse | null) => {
    setAuthValue(jwt);
  }

  const handleRoleValue = (role: string | null) => {
    setRole(role);
  }

  useEffect(() => {
    const item = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    setRole(role);
    if (item) {
      setAuthValue(JSON.parse(item));
    }
  }, [])
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <BrowserRouter>
          <AuthContext.Provider
              value={{jwt: authValue, role: role, setJwt: handleAuthValue, setRole: handleRoleValue}}>
            <AppPageBox>
              <NavBar/>
              <Routes>
                <Route path="*" element={<NotFoundPage/>}/>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/reset-password" element={<ResetPasPage/>}/>
                <Route path="/model/:id" element={<ModelPage/>}/>
                <Route path="/new-password/:token" element={<NewPasPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
              </Routes>
              <License/>
            </AppPageBox>
          </AuthContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
