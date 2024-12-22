export type UserData = {
    "balance": number,
    "subscription": string,
    "active": number,
    "cooldown": number,
    "disabled": number,
    "locked": number,
    "invalid": number,
    "suspended": number,
    "error": number,
    "stopping": number,
    "all": number,
    "proxyerr": number,
    "updated": number,
    "models" : Model[]
};

export type Model = {
    "id": number,
    "name": string,
    "accounts": number
};

export type ModelDataRequest = {
    "id": number,
    "page": number,
    "size": number,
    "token": string,
}

export type ModelCreate = {
    token: string,
    "name": string
};

export type ModelUpdate = {
    id: number,
    token: string,
    "name": string
};

export type ModelDelete = {
    id: number,
    token: string,
};