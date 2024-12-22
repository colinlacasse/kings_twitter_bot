export type JwtResponse = {
    "type": string,
    "accessToken": string,
    "refreshToken": string
};

export type RoleResponse = {
    "authorities": string[]
};

export type LoginParams = {
    email: string,
    password: string
};

export type RegistrationParams = {
    email: string,
    password: string,
};

export type RefreshJwtRequest = {
    refreshToken: string
};

export type SetNewPasswordParams = {
    password:string,
    accessToken: string
};