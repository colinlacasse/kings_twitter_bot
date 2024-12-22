import React, {useEffect, useState} from 'react';
import {XAccountStatistic, XStatistic} from "../../types/TwitterTypes";
import {useAuth} from "../../context/auth/useAuth";
import {getAccountStatistic} from "../../../services/TwitterService";
import {useNavigate} from "react-router-dom";
import {Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TablePaper} from "./TwitterAccountTable";
import {Loading} from "../loading/Loading";
import CircularProgress from "@mui/material/CircularProgress";

type StatisticModalProps = {
    id: number,
    openErrorModal: (bool: boolean) => void,
    setErrorText: (msg: string) => void,
    closeModal: () => void,
    open: boolean
}
export const StatisticModal = ({id, openErrorModal, setErrorText, closeModal, open}: StatisticModalProps) => {
    const [statistic, setStatistic] = useState<XStatistic>();
    const {jwt} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const resp = getAccountStatistic({id: id, token: jwt!.accessToken});
        resp.then(data => {
            setStatistic(data);
            console.log(data.xAccountTimeZone.data.account.timezone);
        }).catch(err => {
            if (err.response.status === 403) {
                navigate("/login");
            } else {
                openErrorModal(true);
                setErrorText(err.response.data.errorMessages);
            }
        });
    }, [jwt]);

    return (
        <Modal open={open} onClose={closeModal} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <TablePaper sx={{width: "80%", height: "80%",}}>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Retweets</TableCell>
                                <TableCell align="right">Link Clicks</TableCell>
                                <TableCell align="right">Likes</TableCell>
                                <TableCell align="right">Replies</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {statistic ? statistic!.xAccountStatistic.timeSeries.retweets.map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {/*{new Date(Date.now() - ((statistic!.timeSeries.retweets.length - (index+1)) * 86400000)).toLocaleDateString()}*/}
                                        {new Date((statistic!.xAccountStatistic.endTime) - ((statistic!.xAccountStatistic.timeSeries.retweets.length - (index + 1)) * 86400000)).toLocaleDateString('ru-RU', {timeZone: statistic.xAccountTimeZone.data.account.timezone})}
                                    </TableCell>
                                    <TableCell align="right">{statistic!.xAccountStatistic.timeSeries.retweets[index]}</TableCell>
                                    <TableCell align="right">{statistic!.xAccountStatistic.timeSeries.urlClicks[index]}</TableCell>
                                    <TableCell align="right">{statistic!.xAccountStatistic.timeSeries.favorites[index]}</TableCell>
                                    <TableCell align="right">{statistic!.xAccountStatistic.timeSeries.replies[index]}</TableCell>
                                </TableRow>
                            )) : <Loading/>}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TablePaper>
        </Modal>
    );
};
