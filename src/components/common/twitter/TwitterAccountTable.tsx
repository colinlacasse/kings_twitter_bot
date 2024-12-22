import {
    IconButton,
    Paper,
    PaperProps,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {TwitterAccountData, TwitterChatMessageData} from "../../types/TwitterTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import {
    deleteTwitterAccount,
    ressetFriendDifference,
    ressetMessageDifference,
    ressetRetweetDifference,
    run,
    stop,
    updateTwitterAccount
} from "../../../services/TwitterService";
import {useAuth} from "../../context/auth/useAuth";
import {useNavigate} from "react-router-dom";
import RefreshIcon from '@mui/icons-material/Refresh';
import {DifferenceSpan} from "../span/DifferenceSpan";
import {TwitterAccountRowData} from "./types";

type TwitterAccountTableProps = {
    totalPages: number,
    accounts: TwitterAccountData[],
    page: number,
    size: number,
    handleChangePage: (event: unknown, newPage: number) => void,
    handleChangeSize: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleOpenMessageModal: () => void,
    handleOpenSubscriptionModal: () => void,
    handleOpenStatisticModal: () => void,
    handleSetMessages: (messages: TwitterChatMessageData[]) => void,
    handleChangeTwitterAccountId: (id: number) => void,
    refetchAccount: () => void,
    closeModal: () => void,
    openErrorModal: (bool: boolean) => void,
    setErrorText: (msg: string) => void,
    handleChangeLoading: () => void
}

export const TablePaper = styled(Paper)<PaperProps>(({theme}) => ({
    width: "100%",
    overflowX: "auto",
    [theme.breakpoints.down('md')]: {
        maxWidth: "600px"
    },
    [theme.breakpoints.down('sm')]: {
        maxWidth: "400px"
    },
    [theme.breakpoints.only('xs')]: {
        maxWidth: "300px"
    },
}));

export const TwitterAccountTable = ({
                                        totalPages,
                                        accounts,
                                        page,
                                        size,
                                        handleChangeSize,
                                        handleChangePage,
                                        handleOpenMessageModal,
                                        handleSetMessages,
                                        handleChangeTwitterAccountId,
                                        handleOpenSubscriptionModal,
                                        handleOpenStatisticModal,
                                        refetchAccount,
                                        closeModal,
                                        openErrorModal,
                                        setErrorText,
                                        handleChangeLoading
                                    }: TwitterAccountTableProps) => {
    const {jwt} = useAuth();
    const navigate = useNavigate();
    const [rows, setRows] = useState<TwitterAccountRowData[]>([]);
    const [auth, setAuth] = useState<string[]>([]);
    const [ct0, setCt0] = useState<string[]>([]);


    useEffect(() => {
        let updatedRows = accounts.map(account => {
            return {
                data: {...account}
            }
        })
        setRows(updatedRows);
    }, [accounts]);

    const handleRunApp = (id: number): void => {
        handleChangeLoading();
        const response = run({token: jwt!.accessToken, id: id});
        response.then(() => {
            handleChangeLoading();
            refetchAccount();
            closeModal();
        }).catch(err => {
            handleChangeLoading();
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            } else {
                openErrorModal(true);
                setErrorText(err.response.data.errorMessages);
            }
        });
    }
    const handleStopApp = (id: number): void => {
        handleChangeLoading();
        const response = stop({token: jwt!.accessToken, id: id});
        response.then(() => {
            handleChangeLoading();
            refetchAccount();
            closeModal();
        }).catch(err => {
            handleChangeLoading();
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            } else {
                openErrorModal(true);
                setErrorText(err.response.data.errorMessages);
            }
        });
    }

    // const handleChangeFD = (id: number): void => {
    //     const response = ressetFriendDifference({token: jwt!.accessToken, id: id});
    //     response.then(() => {
    //         // window.location.reload();
    //         refetchAccount();
    //         closeModal();
    //     }).catch(err => {
    //         closeModal();
    //         if (err.response.status === 403) {
    //             navigate("/login");
    //         } else {
    //             openErrorModal(true);
    //             setErrorText(err.response.data.errorMessages);
    //         }
    //     });
    // }

    const handleChangeMD = (id: number): void => {
        const response = ressetMessageDifference({token: jwt!.accessToken, id: id});
        response.then(() => {
            // window.location.reload();
            refetchAccount();
            closeModal();
        }).catch(err => {
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            } else {
                openErrorModal(true);
                setErrorText(err.response.data.errorMessages);
            }
        });
    }

    // const handleChangeRD = (id: number): void => {
    //     const response = ressetRetweetDifference({token: jwt!.accessToken, id: id});
    //     response.then(() => {
    //         // window.location.reload();
    //         refetchAccount();
    //         closeModal();
    //     }).catch(err => {
    //         closeModal();
    //         if (err.response.status === 403) {
    //             navigate("/login");
    //         } else {
    //             openErrorModal(true);
    //             setErrorText(err.response.data.errorMessages);
    //         }
    //     });
    // }
    const handleDeleteTwitterAccount = (id: number): void => {
        const response = deleteTwitterAccount({token: jwt!.accessToken, id: id});
        response.then(() => {
            // window.location.reload();
            refetchAccount();
            closeModal();
        }).catch(err => {
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            } else {
                openErrorModal(true);
                setErrorText(err.response.data.errorMessages);
            }
        });
    }

    const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const newUsernameValue = event.target.value;
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index].data.username = newUsernameValue;
            return updatedRows;
        });
    }

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const newPasswordValue = event.target.value;
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index].data.password = newPasswordValue;
            return updatedRows;
        });
    }

    const handleChangeProxy = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const newProxyValue = event.target.value;
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index].data.proxy = newProxyValue;
            return updatedRows;
        });
    }

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const newEmailValue = event.target.value;
        setRows(prevRows => {
            const updatedRows = [...prevRows];
            updatedRows[index].data.email = newEmailValue;
            return updatedRows;
        });
    }
    const handleChangeAuth = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const newAuthValue = (event.target as HTMLInputElement).value;
        if (newAuthValue !== auth[index]) {
            const updatedAuth = [...auth];
            updatedAuth[index] = newAuthValue;
            setAuth(updatedAuth);
        }
    }

    const handleChangeCt0 = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const newCt0Value = (event.target as HTMLInputElement).value;
        if (newCt0Value !== ct0[index]) {
            const updatedCt0 = [...ct0];
            updatedCt0[index] = newCt0Value;
            setCt0(updatedCt0);
        }
    }

    const handleOpenMessageModalSetMSG = (messages: TwitterChatMessageData[], id: number) => {
        handleChangeTwitterAccountId(id)
        handleOpenMessageModal();
        handleSetMessages(messages);
    }

    const handleOpenSubscriptionModalS = (id: number) => {
        handleChangeTwitterAccountId(id)
        handleOpenSubscriptionModal();
    }

    const handleOpenStatistic = (id: number) => {
        handleChangeTwitterAccountId(id)
        handleOpenStatisticModal();
    }

    const handleUpdateTwitterAccount = (id: number, index: number) => {
        const updatedValues: { [key: string]: string | undefined } = {};

        if (rows[index].data.username !== accounts[index].username) {
            updatedValues['username'] = rows[index].data.username;
        }

        if (rows[index].data.email !== accounts[index].email) {
            updatedValues['email'] = rows[index].data.email;
        }
        if (rows[index].data.password !== accounts[index].password) {
            updatedValues['password'] = rows[index].data.password;
        }

        if (rows[index].data.proxy !== accounts[index].proxy) {
            updatedValues['proxy'] = rows[index].data.proxy;
        }

        if (auth[index] !== "") {
            updatedValues['authToken'] = auth[index];
        }

        if (ct0[index] !== "") {
            updatedValues['csrfToken'] = ct0[index];
        }

        const response = updateTwitterAccount({
            id: id,
            authToken: updatedValues['authToken'],
            csrfToken: updatedValues['csrfToken'],
            username: updatedValues['username'],
            proxy: updatedValues['proxy'],
            email: updatedValues['email'],
            password: updatedValues['password'],
            token: jwt!.accessToken
        });

        response.then(() => {
            window.location.reload();
            refetchAccount();
            closeModal();
        }).catch(err => {
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            } else {
                openErrorModal(true);
                setErrorText(err.response.data.errorMessages);
            }
        });
    }

    return (
        <TablePaper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Model</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Paid To</TableCell>
                            <TableCell>Proxy</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Chat msg</TableCell>
                            <TableCell>Groups</TableCell>
                            <TableCell>Token</TableCell>
                            <TableCell>Ct0</TableCell>
                            <TableCell>Messages</TableCell>
                            <TableCell>Followers</TableCell>
                            <TableCell>Statistic</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>Stop</TableCell>
                            <TableCell>Update</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((account, index) => (
                            <TableRow
                                key={account.data.id}>
                                <TableCell>{account.data.model!}</TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={account.data.username}
                                        onChange={(event) => handleChangeUsername(event, index)}
                                    />
                                </TableCell>
                                <TableCell
                                    style={{
                                        backgroundColor: account.data.status === 'ACTIVE' ? '#0fb886'
                                            : account.data.status === 'LOCKED' ? '#fa5352'
                                                : account.data.status === 'UNEXPECTED ERROR' ? '#fa5352'
                                                    : account.data.status === 'PROXY ERROR' ? '#fa5352'
                                                        : account.data.status === 'SUSPENDED' ? '#fa5352'
                                                            : account.data.status === 'INVALID COOKIES' ? '#fa5352'
                                                                : account.data.status === 'Unable to connect' ? '#fa5352'
                                                                    : account.data.status === 'COOLDOWN' ? '#e3721b'
                                                                        : account.data.status === 'STOPPING' ? '#e3d21b'
                                                                            : account.data.status === 'DISABLED' ? '#212121'
                                                                                : '#212121'
                                    }}
                                >{account.data.status!}
                                </TableCell>
                                <TableCell onClick={() => handleOpenSubscriptionModalS(account.data.id)}
                                           sx={{cursor: "pointer"}}>{account.data.paidTo ? account.data.paidTo : "-"}</TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={account.data.proxy}
                                        onChange={(event) => handleChangeProxy(event, index)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={account.data.email}
                                        onChange={(event) => handleChangeEmail(event, index)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={account.data.password}
                                        onChange={(event) => handleChangePassword(event, index)}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{cursor: "pointer"}}
                                    onClick={() => handleOpenMessageModalSetMSG(account.data.chatMessages!, account.data.id)}>
                                    {account.data.chatMessages ? account.data.chatMessages.length : "-"}
                                </TableCell>
                                <TableCell>{account.data.groups ? account.data.groups : "-"}</TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={auth[index]}
                                        onChange={(event) => handleChangeAuth(event, index)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        variant="standard"
                                        value={ct0[index]}
                                        onChange={(event) => handleChangeCt0(event, index)}
                                    />
                                </TableCell>
                                <TableCell onClick={() => handleChangeMD(account.data.id)} sx={{cursor: "pointer"}}>
                                    <DifferenceSpan num={account.data.messagesDifference}/>
                                    {account.data.messages ? account.data.messages : "-"}
                                </TableCell>
                                <TableCell>
                                    {/*<DifferenceSpan num={account.data.friendsDifference}/>*/}
                                    {account.data.friends ? account.data.friends : "-"}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleOpenStatistic(account.data.id)}>
                                        <AnalyticsIcon/>
                                    </IconButton>
                                </TableCell>
                                {/*<TableCell onClick={() => handleChangeRD(account.data.id)} sx={{cursor: "pointer"}}>*/}
                                {/*    <DifferenceSpan num={account.data.retweetsDifference}/>*/}
                                {/*    {account.data.retweets ? account.data.retweets : "-"}*/}
                                {/*</TableCell>*/}
                                <TableCell>
                                    <IconButton onClick={() => handleRunApp(account.data.id)}
                                                disabled={account.data.status === 'ACTIVE' || account.data.status === 'COOLDOWN'}>
                                        <PlayArrowIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleStopApp(account.data.id)}>
                                        <StopIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleUpdateTwitterAccount(account.data.id, index)}>
                                        <RefreshIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton color="error"
                                                onClick={() => handleDeleteTwitterAccount(account.data.id)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 15, 50, 100]}
                component="div"
                count={totalPages}
                rowsPerPage={size}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeSize}
            />
        </TablePaper>
    );
};
