import React, {useState} from 'react';
import {Box, IconButton, Modal, TextField, Tooltip, Typography} from "@mui/material";
import {TwitterChatMessageData} from "../../types/TwitterTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import {addTwitterChatMessage, deleteChatMessage} from "../../../services/TwitterService";
import {useAuth} from "../../context/auth/useAuth";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";

type ChatMessageModalProps = {
    twitterAccountId: number,
    closeModal: () => void,
    messages: TwitterChatMessageData[],
    refetchData: () => void,
    open: boolean
}
export const ChatMessageModal = ({twitterAccountId, closeModal, messages, open, refetchData}: ChatMessageModalProps) => {
    const {jwt} = useAuth();
    const navigate = useNavigate();
    const [newMessage, setNewMessage] = useState<string>();
    const [gifUrl, setGifUrl] = useState<string | null>();
    const handleDelete = (id: number) => {
        const response = deleteChatMessage({token: jwt!.accessToken, id: id!,});
        response.then(data => {
            closeModal();
            refetchData();
        }).catch(err => {
            closeModal();
            if (err.response.status === 403) {
                navigate("/login");
            }
        })
    };

    const handleChangeNewMessage = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setNewMessage(event.target.value);
    }

    const handleChangeGifUrl = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setGifUrl(event.target.value);
    }

    const handleAddMessage = () => {
        const response = addTwitterChatMessage({id: twitterAccountId!, message: newMessage!, gif:gifUrl!, token: jwt!.accessToken});
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
        <Modal
            open={open}
            onClose={closeModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60vw',
                height: '50vh',
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
                <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <TextField
                        label="New Message"
                        multiline
                        fullWidth
                        value={newMessage}
                        onChange={handleChangeNewMessage}
                        sx={{
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
                        }}
                    />
                    <TextField
                        label="GIF url"
                        multiline
                        fullWidth
                        value={gifUrl}
                        onChange={handleChangeGifUrl}
                        sx={{
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
                        }}
                    />
                    <IconButton onClick={handleAddMessage}>
                        <Tooltip title="Add">
                            <AddIcon/>
                        </Tooltip>
                    </IconButton>
                </Box>
                {messages.map((msg) => (
                    <Box key={msg.id} sx={{display: "flex"}}>
                        <Typography sx={{width: "50%", padding: "5px", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{msg.text}</Typography>
                        <Typography sx={{width: "50%", padding: "5px", overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{msg.gifUrl}</Typography>
                        <IconButton
                            color="error"
                            onClick={() => handleDelete(msg.id)}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Box>
                ))}
            </Box>
        </Modal>
    );
};

