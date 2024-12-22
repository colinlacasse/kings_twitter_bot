import React, {useEffect, useState} from 'react';
import {TwitterAccountData, TwitterChatMessageData} from "../types/TwitterTypes";
import {getAccountsByModel} from "../../services/TwitterService";
import {useAuth} from "../context/auth/useAuth";
import {useNavigate, useParams} from "react-router-dom";
import {TwitterAccountTable} from "../common/twitter/TwitterAccountTable";
import {TwitterForm} from "../common/twitter/TwitterForm";
import {ChatMessageModal} from "../common/twitter/ChatMessageModal";
import { Box } from '@mui/material';
import {ErrorModal} from "../common/alerts/ErrorModal";
import {SubscriptionForm} from "../common/subscription/SubscriptionForm";
import {Loading} from "../common/loading/Loading";
import {StatisticModal} from "../common/twitter/StatisticModal";

type ModelPageParams = {
    id: string
}
export const ModelPage = () => {
    const {id} = useParams<ModelPageParams>();
    const [accounts, setAccounts] = useState<TwitterAccountData[]>();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);
    const [totalPages, setTotalPages] = useState(0);
    const {jwt} = useAuth();
    const navigate = useNavigate();
    const [isLoadingOpened, setIsLoadingOpened] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>();
    const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);
    const [isMessageModalOpened, setIsMessageModalOpened] = useState<boolean>(false);
    const [isSubscriptionModalOpened, setIsSubscriptionModalOpened] = useState<boolean>(false);
    const [messages, setMessages] = useState<TwitterChatMessageData[]>();
    const [twitterAccountId, setTwitterAccountId] = useState<number>();
    const [isStatisticOpened, setIsStatisticOpened] = React.useState<boolean>(false);

    useEffect(() => {
        refetchData();
    }, [jwt, size, page])

    const refetchData = () => {
        if (jwt) {
            const response = getAccountsByModel({id: +id!, page, size, token: jwt!.accessToken});
            response.then(data => {
                setAccounts(data.elements);
                setTotalPages(data.totalElements)
            }).catch(err => {
                if (err.response.status === 403) {
                    navigate("/login");
                } else {
                    setError(true);
                    setErrorText(err.response.data.errorMessages);
                }
            })
        }
    }
    const handleOpenError = () => {
        setError(true);
    }

    const handleSetMessages = (messages:TwitterChatMessageData[]) => {
        setMessages(messages)
    }
    const handleErrorText = (msg: string) => {
        setErrorText(msg)
    }
    const handleCloseModal = () => {
        setIsModalOpened(!isModalOpened);
    };
    const handleOpenMessageModal = () => {
        setIsMessageModalOpened(true);
    }
    const handleCloseMessageModal = () => {
        setIsMessageModalOpened(false);
    };

    const handleOpenSubscriptionModal = () => {
        setIsSubscriptionModalOpened(true);
    }
    const handleCloseSubscriptionModal = () => {
        setIsSubscriptionModalOpened(false);
    };

    const handleChangeTwitterAccountId = (id: number) => {
        setTwitterAccountId(id);
    };

    const handleUpdateLoading = () => {
        setIsLoadingOpened(oldStateIsLoading => !oldStateIsLoading);
    }

    const handleCloseError = () => {
        setError(false);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value);
        const newPage = Math.min(page, Math.floor((accounts!.length - 1) / newSize));
        setSize(newSize);
        setPage(newPage);
    };

    const handleOpenStatisticModal = () => {
        setIsStatisticOpened(true);
    }
    const handleCloseStatisticModal = () => {
        setIsStatisticOpened(!isStatisticOpened);
    };

    return (
        <Box sx={{padding:"1rem"}}>
            <TwitterForm openErrorModal={handleOpenError} refetchAccount={refetchData} setErrorText={handleErrorText}
                         closeModal={handleCloseModal} modelId={+id!} handleChangeLoading={handleUpdateLoading}/>
            {isMessageModalOpened ? <ChatMessageModal refetchData={refetchData} twitterAccountId={twitterAccountId!} messages={messages!} open={isMessageModalOpened} closeModal={handleCloseMessageModal}/> : null}
            {isSubscriptionModalOpened ? <SubscriptionForm refetchData={refetchData} twitterAccountId={twitterAccountId!} open={isSubscriptionModalOpened} closeModal={handleCloseSubscriptionModal}/> : null}
            {isLoadingOpened ? <Loading/> : null}
            {accounts ? <TwitterAccountTable
                totalPages={totalPages!}
                openErrorModal={handleOpenError}
                setErrorText={handleErrorText}
                closeModal={handleCloseModal}
                refetchAccount={refetchData}
                handleChangeTwitterAccountId={handleChangeTwitterAccountId}
                handleOpenMessageModal={handleOpenMessageModal}
                handleOpenSubscriptionModal={handleOpenSubscriptionModal}
                handleOpenStatisticModal={handleOpenStatisticModal}
                handleChangeLoading={handleUpdateLoading}
                handleSetMessages={handleSetMessages}
                accounts={accounts}
                page={page}
                size={size}
                handleChangePage={handleChangePage}
                handleChangeSize={handleChangeSize}
            /> : null}
            {isStatisticOpened ? <StatisticModal closeModal={handleCloseStatisticModal} open={isStatisticOpened} id={twitterAccountId!} openErrorModal={handleOpenError} setErrorText={handleErrorText}/> : null}
            {error ? <ErrorModal closeModal={handleCloseError} open={error} text={errorText!}/> : null}
        </Box>
    );
};
