export type TwitterAccountData = {
    id: number;
    username: string;
    password: string;
    model: string;
    status: string;
    paidTo: string;
    proxy: string;
    email: string;
    messages: number;
    friends: number;
    retweets: number;
    groups: number;
    friendsDifference: number;
    retweetsDifference: number;
    messagesDifference: number;
    chatMessages: TwitterChatMessageData[]
};


export type PageableResponse<T> = {
    elements: T[];
    page: number;
    totalPages: number;
    totalElements: number;
}

export type TwitterAccountUpdate = {
    id: number;
    authToken: string | any;
    csrfToken: string | any;
    proxy: string | any;
    token: string;
    email: string | any;
    password: string | any;
    username: string | any;
};

export type TwitterAccountCreate = {
    username: string;
    proxy: string;
    email: string;
    password: string;
    message: string;
    authToken: string;
    csrfToken: string;
    token: string;
    modelId: number;
};

export type TwitterChatMessageData = {
    id: number;
    text: string;
    gifUrl: string;
};

export type TwitterChatMessageCreate = {
    id: number;
    token: string;
    message: string;
    gif: string | null;
}

export type TwitterChatMessageDelete = {
    id: number;
    token: string;
}
export type TwitterAccountDataFiltered = {
    token: string;
    status: string;
    page: number;
    size: number;
}

export type TwitterAccountDifference = {
    id: number;
    token: string;
}

export type TwitterAccountBasic = {
    id: number;
    token: string;
}

export type TwitterSubscription = {
    month: number,
    token: string,
    id: number
}

export type XStatistic = {
    xAccountStatistic: XAccountStatistic;
    xAccountTimeZone: XAccountTimeZone;
}

export type XAccountStatistic = {
    startTime: number;
    endTime: number;
    totals: TotalsDTO;
    timeSeries: TimeSeriesDTO;
}

type TotalsDTO = {
    impressions: number;
}

type TimeSeriesDTO = {
    orgImpressions: number[];
    prImpressions: number[];
    impressions: number[];
    urlClicks: number[];
    retweets: number[];
    favorites: number[];
    replies: number[];
    engagements: number[];
    engagementRate: number[];
}

type XAccountTimeZone = {
    data: XData
}

type XData = {
    account: Account;
}

type Account = {
    name: string;
    timezone: string;
}
