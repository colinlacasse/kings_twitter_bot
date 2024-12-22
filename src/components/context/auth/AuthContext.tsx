import {createContext} from "react";
import {JwtResponse} from "../../types/AuthTypes";


type AuthContext = {
    jwt: JwtResponse | null;
    role: string | null;
    setJwt: (jwt: JwtResponse | null) => void;
    setRole: (role: string | null) => void;
}

export const AuthContext = createContext<AuthContext>({
    jwt: null,
    role: null,
    setJwt: () => {
    },
    setRole: () => {
    }
});