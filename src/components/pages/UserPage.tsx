import React, {useEffect, useState} from 'react';
import {getUser} from '../../services/UserService';
import {useNavigate} from "react-router-dom";
import {UserData} from "../types/UserTypes";
import {useAuth} from "../context/auth/useAuth";
import {ErrorModal} from '../common/alerts/ErrorModal';
import {Box, BoxProps, Button, IconButton, Link, styled, Tooltip, Typography, TypographyProps} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {ModelForm} from "../common/model/ModelForm";
import {ModelTable} from "../common/model/ModelTable";
import {TwitterAccountData, TwitterChatMessageData} from "../types/TwitterTypes";
import {getFilteredAccounts} from "../../services/TwitterService";
import {TwitterAccountTable} from "../common/twitter/TwitterAccountTable";
import {ChatMessageModal} from "../common/twitter/ChatMessageModal";
import {Loading} from "../common/loading/Loading";
import {SubscriptionForm} from "../common/subscription/SubscriptionForm";
import {StatisticModal} from "../common/twitter/StatisticModal";


const ButtonBox = styled(Box)<BoxProps>(({theme}) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down('md')]: {
        flexDirection: "column"
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: "column"
    },
    [theme.breakpoints.only('xs')]: {
        flexDirection: "column"
    },
}));

export const InfoTypography = styled(Typography)<TypographyProps>(({theme}) => ({
    fontSize: "1.3rem",
    [theme.breakpoints.down('md')]: {
        fontSize: "1rem"
    },
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.only('xs')]: {},
}));

export const InfoValueTypography = styled(Typography)<TypographyProps>(({theme}) => ({
    fontSize: "1.3rem",
    [theme.breakpoints.down('md')]: {
        fontSize: "1rem"
    },
    [theme.breakpoints.down('sm')]: {},
    [theme.breakpoints.only('xs')]: {},
}));

const InfoBox = styled(Box)<BoxProps>(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
}));

const InfoTextBox = styled(Box)<BoxProps>(() => ({
    display: "flex",
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "column",
    width: "50%"
}));

const InfoButtonBox = styled(Box)<BoxProps>(() => ({
    display: "flex",
    justifyContent: "start",
    alignItems: "end",
    flexDirection: "column",
    width: "50%"
}));
export const UserPage = () => {
    const navigate = useNavigate();
    const {jwt} = useAuth();
    const [status, setStatus] = useState<string>("ALL");
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>();
    const [totalPages, setTotalPages] = useState(0);
    const [userData, setUserData] = useState<UserData>();
    const [twitterData, setTwitterData] = useState<TwitterAccountData[]>();
    const [isModelOpened, setIsModelOpened] = useState<boolean>(false);
    const [isLoadingOpened, setIsLoadingOpened] = useState<boolean>(false);
    const [isModelsOpened, setIsModelsOpened] = useState<boolean>(true);
    const [isModalOpened, setIsModalOpened] = React.useState<boolean>(false);
    const [isAccountsOpened, setIsAccountsOpened] = React.useState<boolean>(false);
    const [isStatisticOpened, setIsStatisticOpened] = React.useState<boolean>(false);
    const [isMessageModalOpened, setIsMessageModalOpened] = useState<boolean>(false);
    const [isSubscriptionModalOpened, setIsSubscriptionModalOpened] = useState<boolean>(false);
    const [messages, setMessages] = useState<TwitterChatMessageData[]>();
    const [twitterAccountId, setTwitterAccountId] = useState<number>();
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);

    useEffect(() => {
        refetchUser();
    }, [jwt, page, size, status])

    const refetchUser = () => {
        if (jwt) {
            const response = getUser(jwt.accessToken);
            response.then(data => {
                setUserData(data);
            }).catch(err => {
                if (err.response.status === 403) {
                    navigate("/login");
                } else {
                    setError(true);
                    setErrorText(err.response.data.errorMessages);
                }
            });
            const resp = getFilteredAccounts({token: jwt.accessToken, status: status, page: page, size: size});
            resp.then(data => {
                setTwitterData(data.elements);
                setTotalPages(data.totalElements)
            }).catch(err => {
                if (err.response.status === 403) {
                    navigate("/login");
                } else {
                    setError(true);
                    setErrorText(err.response.data.errorMessages);
                }
            });
        }
    }

    const handleUpdateLoading = () => {
        setIsLoadingOpened(oldStateIsLoading => !oldStateIsLoading);
    }

    const handleCloseError = () => {
        setError(false);
    }
    const handleOpenError = () => {
        setError(true);
    }
    const handleErrorText = (msg: string) => {
        setErrorText(msg)
    }
    const handleCloseSubscriptionModal = () => {
        setIsSubscriptionModalOpened(false);
    };
    const handleCloseModal = () => {
        setIsModalOpened(!isModalOpened);
    };

    const handleChangeModelOpened = () => {
        setIsModelOpened(!isModelOpened);
    }

    const handleOpenMessageModal = () => {
        setIsMessageModalOpened(true);
    }
    const handleCloseMessageModal = () => {
        setIsMessageModalOpened(!isMessageModalOpened);
    };

    const handleOpenStatisticModal = () => {
        setIsStatisticOpened(true);
    }
    const handleCloseStatisticModal = () => {
        setIsStatisticOpened(!isStatisticOpened);
    };

    const handleChangeTwitterAccountId = (id: number) => {
        setTwitterAccountId(id);
    };
    const handleSetMessages = (messages: TwitterChatMessageData[]) => {
        setMessages(messages)
    }
    const handleOpenSubscriptionModal = () => {
        setIsSubscriptionModalOpened(true);
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value);
        const newPage = Math.min(page, Math.floor((twitterData!.length - 1) / newSize));
        setSize(newSize);
        setPage(newPage);
    };

    const handleChangeModelButton = () => {
        // setStatus("ACTIVE")
        setIsModelsOpened(true);
        setIsAccountsOpened(false);
        refetchUser();
    }

    const handleChangeLockButton = () => {
        setStatus("LOCKED")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }
    const handleChangeSuspendedButton = () => {
        setStatus("SUSPENDED")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }

    const handleChangeCooldownButton = () => {
        setStatus("COOLDOWN")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }
    const handleChangeInvalidButton = () => {
        setStatus("INVALID_COOKIES")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }
    const handleChangeActiveButton = () => {
        setStatus("ACTIVE")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }

    const handleChangeDisabledButton = () => {
        setStatus("DISABLED")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }
    const handleChangeErrorButton = () => {
        setStatus("UNEXPECTED_ERROR")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }
    const handleChangeStoppingButton = () => {
        setStatus("STOPPING")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }
    const handleChangePrxErrButton = () => {
        setStatus("PROXY_ERROR")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }

    const handleChangeAllButton = () => {
        setStatus("ALL")
        setIsAccountsOpened(true);
        setIsModelsOpened(false);
    }

    return (
        <Box sx={{padding: "1rem"}}>
            {userData ?
                <Box>
                    <InfoBox>
                        <InfoTextBox>
                            <InfoTypography>Balance : <InfoValueTypography color="text.secondary"
                                                                           component="span">{userData!.balance!}$</InfoValueTypography>
                            </InfoTypography>
                            <InfoTypography>Subscription : <InfoValueTypography color="text.secondary"
                                                                                component="span">{userData!.subscription!}</InfoValueTypography>
                            </InfoTypography>
                            <InfoTypography>To get FREE Trial : <Link href="https://t.me/SpaceTraffSoftBot"
                                                                      sx={{color: "white", textDecoration: "none"}}
                                                                      textAlign="center">
                                <InfoValueTypography color="#0fb886"
                                                     component="span">Verify email</InfoValueTypography>
                            </Link>
                            </InfoTypography>
                        </InfoTextBox>
                        <InfoButtonBox>
                            <Tooltip title="Top up balance">
                                <Link href="https://t.me/SpaceTraffSoftBot"
                                      sx={{color: "white", textDecoration: "none"}} textAlign="center">
                                    <IconButton>
                                        <AccountBalanceWalletIcon/>
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            <IconButton onClick={handleChangeModelOpened}>
                                <Tooltip title="Add model">
                                    <AddIcon/>
                                </Tooltip>
                            </IconButton>
                        </InfoButtonBox>
                    </InfoBox>
                </Box>
                : null}
            {isModelOpened ?
                <ModelForm openErrorModal={handleOpenError} refetchAccount={refetchUser} setErrorText={handleErrorText}
                           closeModal={handleCloseModal}/> : null}
            {userData ? <ButtonBox sx={{display: "flex", justifyContent: "center"}}>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <Button onClick={handleChangeModelButton}>Models</Button>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeAllButton}>All</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.all}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeActiveButton}>Active</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.active}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeDisabledButton}>Disabled</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.disabled}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeStoppingButton}>Stopping</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.stopping}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeCooldownButton}>Cooldown</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.cooldown}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeLockButton}>Locked</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.locked}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeInvalidButton}>Invalid Cookies</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.invalid}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangePrxErrButton}>Proxy Error</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.proxyerr}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeSuspendedButton}>Suspended</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.suspended}</Typography>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", marginLeft: "10px"}}>
                    <Button onClick={handleChangeErrorButton}>Unexpected Error</Button>
                    <Typography sx={{marginLeft: "5px"}}>{userData!.error}</Typography>
                </Box>
            </ButtonBox> : null}
            {isLoadingOpened ? <Loading/> : null}
            {userData && isModelsOpened ?
                <ModelTable models={userData.models} openErrorModal={handleOpenError} refetchAccount={refetchUser}
                            setErrorText={handleErrorText}
                            closeModal={handleCloseModal}/> : null}
            {isSubscriptionModalOpened ?
                <SubscriptionForm refetchData={refetchUser} twitterAccountId={twitterAccountId!}
                                  open={isSubscriptionModalOpened} closeModal={handleCloseSubscriptionModal}/> : null}
            {twitterData && isAccountsOpened ?
                <TwitterAccountTable
                    key={status + "twitterAccountTable"}
                    totalPages={totalPages!}
                    openErrorModal={handleOpenError}
                    setErrorText={handleErrorText}
                    closeModal={handleCloseModal}
                    refetchAccount={refetchUser}
                    handleChangeTwitterAccountId={handleChangeTwitterAccountId}
                    handleOpenMessageModal={handleOpenMessageModal}
                    handleOpenSubscriptionModal={handleOpenSubscriptionModal}
                    handleOpenStatisticModal={handleOpenStatisticModal}
                    handleSetMessages={handleSetMessages}
                    accounts={twitterData}
                    page={page}
                    size={size}
                    handleChangePage={handleChangePage}
                    handleChangeLoading={handleUpdateLoading}
                    handleChangeSize={handleChangeSize}/> : null}
            {isMessageModalOpened ?
                <ChatMessageModal refetchData={refetchUser} twitterAccountId={twitterAccountId!} messages={messages!}
                                  open={isMessageModalOpened} closeModal={handleCloseMessageModal}/> : null}
            {isStatisticOpened ?
                <StatisticModal closeModal={handleCloseStatisticModal} open={isStatisticOpened} id={twitterAccountId!}
                                openErrorModal={handleOpenError} setErrorText={handleErrorText}/> : null}
            {error ? <ErrorModal closeModal={handleCloseError} open={error} text={errorText!}/> : null}
        </Box>
    );
};
