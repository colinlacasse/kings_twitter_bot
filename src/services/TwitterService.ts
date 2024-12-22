import {ModelDataRequest} from "../components/types/UserTypes";
import {
    PageableResponse,
    TwitterAccountCreate,
    TwitterAccountData, TwitterAccountDataFiltered, TwitterAccountBasic, TwitterAccountDifference,
    TwitterAccountUpdate,
    TwitterChatMessageCreate,
    TwitterChatMessageDelete, TwitterSubscription, XAccountStatistic, XStatistic
} from "../components/types/TwitterTypes";
import axios, {AxiosResponse} from "axios";

export const getAccountsByModel = async (requestBody: ModelDataRequest): Promise<PageableResponse<TwitterAccountData>> => {
    const {data} = await axios.get<PageableResponse<TwitterAccountData>>(`/api/v1/account/${requestBody.id}`, {
        headers: {
            'Authorization': 'Bearer ' + requestBody.token
        },
        params: {
            page: requestBody.page,
            size: requestBody.size,
        },
    });
    return data;
};

export const getFilteredAccounts = async (requestBody: TwitterAccountDataFiltered): Promise<PageableResponse<TwitterAccountData>> => {
    const {data} = await axios.get<PageableResponse<TwitterAccountData>>(`/api/v1/account/twitter-accounts`, {
        headers: {
            'Authorization': 'Bearer ' + requestBody.token
        },
        params: {
            status: requestBody.status,
            page: requestBody.page,
            size: requestBody.size,
        },
    });
    return data;
};

export const addTwitterAccount = async (requestParams: TwitterAccountCreate): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/account/${requestParams.modelId}`, {
        username: requestParams.username,
        email: requestParams.email,
        proxy: requestParams.proxy,
        authToken: requestParams.authToken,
        csrfToken: requestParams.csrfToken,
        message: requestParams.message,
        password: requestParams.password
    }, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const addTwitterChatMessage = async (requestParams: TwitterChatMessageCreate): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/account/${requestParams.id}/message`, {
        message: requestParams.message,
        gifUrl: requestParams.gif
    }, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const deleteChatMessage = async ({token, id}: TwitterChatMessageDelete): Promise<AxiosResponse> => {
    const {data} = await axios.delete<AxiosResponse>(`/api/v1/account/message/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    return data;
};

export const deleteTwitterAccount = async ({token, id}: TwitterAccountBasic): Promise<AxiosResponse> => {
    const {data} = await axios.delete<AxiosResponse>(`/api/v1/account/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    return data;
};

export const updateTwitterAccount = async (requestParams: TwitterAccountUpdate): Promise<any> => {
    const {data} = await axios.patch<any>(`/api/v1/account/${requestParams.id}`, {
        username: requestParams.username,
        authToken: requestParams.authToken,
        csrfToken: requestParams.csrfToken,
        proxy: requestParams.proxy,
        email: requestParams.email,
        password: requestParams.password

    }, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const ressetMessageDifference = async (requestParams: TwitterAccountDifference): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/account/${requestParams.id}/reset-messages`, {}, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const ressetFriendDifference = async (requestParams: TwitterAccountDifference): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/account/${requestParams.id}/reset-friends`, {}, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const ressetRetweetDifference = async (requestParams: TwitterAccountDifference): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/account/${requestParams.id}/reset-retweets`, {}, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const run = async (requestParams: TwitterAccountDifference): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/app/${requestParams.id}/run`, {}, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const stop = async (requestParams: TwitterAccountDifference): Promise<any> => {
    const {data} = await axios.post<any>(`/api/v1/app/${requestParams.id}/stop`, {}, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const updateSubscription = async (requestParams: TwitterSubscription): Promise<AxiosResponse> => {
    const {data} = await axios.post<AxiosResponse>(`/api/v1/account/${requestParams.id}/subscription`, {
        month: requestParams.month,
    }, {
        headers: {
            'Authorization': 'Bearer ' + requestParams.token
        }
    });
    return data;
};

export const getAccountStatistic = async (requestBody: TwitterAccountBasic): Promise<XStatistic> => {
    const {data} = await axios.get<XStatistic>(`/api/v1/account/${requestBody.id}/statistic`, {
        headers: {
            'Authorization': 'Bearer ' + requestBody.token
        }
    });
    return data;
};