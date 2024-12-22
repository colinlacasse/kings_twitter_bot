import {TwitterAccountData} from "../../types/TwitterTypes";

export type TwitterAccountRowData = {
    auth?: string;
    ct0?:string;
    data: TwitterAccountData;
}