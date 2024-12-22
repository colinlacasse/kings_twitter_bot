import axios, {AxiosResponse} from "axios";
import {
    JwtResponse,
    LoginParams,
    RefreshJwtRequest,
    RegistrationParams,
    RoleResponse, SetNewPasswordParams
} from "../components/types/AuthTypes";

export const login = async (requestBody: LoginParams): Promise<JwtResponse> => {
    const {data} = await axios.post<JwtResponse>("/api/v1/auth/login", {
            email: requestBody.email,
            password: requestBody.password
        }
    );
    return data;
}

export const refreshAccess = async (requestBody: RefreshJwtRequest): Promise<JwtResponse> => {
    const {data} = await axios.post<JwtResponse>("/api/v1/auth/access", {
            refreshToken: requestBody.refreshToken
        }
    );
    return data;
}

export const register = async (requestBody: RegistrationParams): Promise<any> => {
    const {data} = await axios.post("/api/v1/auth/register", {
            email: requestBody.email,
            password: requestBody.password,
        },
    );
    return data;
}

export const getRole = async (requestBody: string): Promise<RoleResponse> => {
    const {data} = await axios.get<RoleResponse>("/api/v1/auth/authorities", {
            headers: {
                'Authorization': 'Bearer ' + requestBody
            }
        }
    );
    return data;
}

export const logout = async (requestBody: string): Promise<AxiosResponse> => {
    const {data} = await axios.post<AxiosResponse>("/api/v1/auth/logout", {}, {
        headers: {
            'Authorization': 'Bearer ' + requestBody
        }
    })
    return data;
}

export const resetPassword = async (email: string): Promise<AxiosResponse> => {
    const {data} = await axios.post<AxiosResponse>("/api/v1/auth/reset-password", {
            email: email,
        }
    );
    return data;
}

export const setNewPassword = async (requestBody: SetNewPasswordParams): Promise<AxiosResponse> => {
    const {data} = await axios.post<AxiosResponse>("/api/v1/auth/new-password", {
            password: requestBody.password
        }, {
            headers: {
                'Authorization': 'Bearer ' + requestBody.accessToken
            }
        }
    );
    return data;
}