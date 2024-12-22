import React, {useState} from 'react';
import {useAuth} from "../../context/auth/useAuth";
import {useNavigate} from "react-router-dom";
import {
    Box,
    BoxProps,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    styled,
    Tooltip
} from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import {updateSubscription} from "../../../services/TwitterService";

type SubscriptionFormProps = {
    twitterAccountId: number,
    closeModal: () => void,
    refetchData: () => void,
    open: boolean
}

const XSubscriptionModal = styled(Box)<BoxProps>(() => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));
export const SubscriptionForm = ({
                                     twitterAccountId,
                                     closeModal,
                                     refetchData,
                                     open,
                                 }: SubscriptionFormProps) => {
    const {jwt} = useAuth();
    const [month, setMonth] = useState<number>();
    const navigate = useNavigate();
    const handleChangeMonth = (event: SelectChangeEvent) => {
        // event.preventDefault()
        setMonth(+event.target.value);
    };

    const handleSubmit = () => {
        // console.log("MONTH : " + month)
        const response = updateSubscription({id: twitterAccountId, month: month!, token: jwt!.accessToken});
        response.then(data => {
            closeModal();
            refetchData();
        }).catch(err => {
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            }
        })
    }

    return (
        <Modal open={open}
               onClose={closeModal}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '25wv',
                height: '40vh',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                "& label.Mui-focused": {
                    color: "#fff"
                }, "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "#fff"
                    }
                }, input: {
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px #000000 inset"
                    }
                }
            }}>
                <Box component="form" onSubmit={handleSubmit} sx={{display:"flex", alignItems:"center",justifyContent:"center"}}>

                    <FormControl>
                        <InputLabel id="Days to continue" sx={{
                            color: "#fff",
                            "&.Mui-focused": {
                                color: "#fff"
                            }
                        }}>Days to continue</InputLabel>
                        <Select
                            value={String(month)}
                            label="Days to continue"
                            onChange={handleChangeMonth}
                            sx={{
                                width: "250px",
                                color: "white",
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#656565',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#fff',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#fff',
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: "white !important",
                                },
                            }}
                        >
                            <MenuItem value={1}>30Days = 29$</MenuItem>
                            <MenuItem value={2}>60Days = 58$</MenuItem>
                            <MenuItem value={3}>90Days = 87$</MenuItem>
                            <MenuItem value={6}>180Days = 174$</MenuItem>
                            <MenuItem value={12}>360Days = 348$</MenuItem>
                        </Select>
                    </FormControl>

                    <Tooltip title="Subscribe">
                        <IconButton type="submit" sx={{marginLeft: "0.5em"}}>
                            <RefreshIcon/>
                        </IconButton>
                    </Tooltip>

                </Box>
            </Box>

        </Modal>
    );
};

