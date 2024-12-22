import {useContext} from "react";
import {AuthContext} from "./AuthContext";
import {JwtResponse} from "../../types/AuthTypes";

export const useAuth = () => {
    const {jwt, setJwt, role, setRole} = useContext(AuthContext);
    // const {role, setRole} = useContext(AuthContext);

    const addJwt = (jwt: JwtResponse) => {
        setJwt(jwt);
        localStorage.setItem("jwt", JSON.stringify(jwt));
    };

    const clearJwt = () => {
        setJwt(null);
        localStorage.removeItem("jwt");
    };

    const addRole = (role: string) => {
        setRole(role);
        localStorage.setItem("role", JSON.stringify(role));
    };

    const clearRole = () => {
        setRole(null);
        localStorage.removeItem("role");
    };

    return {jwt, addJwt, clearJwt, role, addRole, clearRole};
}