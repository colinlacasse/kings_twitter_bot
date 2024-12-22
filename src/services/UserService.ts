import axios, { AxiosResponse } from "axios";
import {ModelCreate, ModelDelete, ModelUpdate, UserData} from "../components/types/UserTypes";


export const getUser = async (requestBody: string): Promise<UserData> => {
    const {data} = await axios.get<UserData>("/api/v1/user", {
        headers: {
            'Authorization': 'Bearer ' + requestBody
        }
    })
    return data;
}

export const addModel = async (requestParams: ModelCreate): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/model`, {
        name: requestParams.name,

    }, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
}

export const updateModel = async (requestParams: ModelUpdate): Promise<any> => {
    const {data} = await axios.patch<any>(`/api/v1/model/${requestParams.id}`, {
        name: requestParams.name,

    }, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
}

export const deleteModel = async ({token, id}: ModelDelete): Promise<AxiosResponse> => {
    const {data} = await axios.delete<AxiosResponse>(`/api/v1/model/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    return data;
}