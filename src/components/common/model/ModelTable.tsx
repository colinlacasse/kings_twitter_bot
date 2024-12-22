import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import React, {useState} from 'react';
import {Model} from "../../types/UserTypes";
import RefreshIcon from '@mui/icons-material/Refresh';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteModel, updateModel} from "../../../services/UserService";
import {useAuth} from "../../context/auth/useAuth";
import {useNavigate} from "react-router-dom";
import {TablePaper} from "../twitter/TwitterAccountTable";

type ModelTableProps = {
    models: Model[],
    refetchAccount: () => void,
    closeModal: () => void,
    openErrorModal: (bool: boolean) => void,
    setErrorText: (msg: string) => void
}
export const ModelTable = ({models, refetchAccount, closeModal, openErrorModal, setErrorText}: ModelTableProps) => {
    const [names, setNames] = useState<string[]>(models.map(model => model.name));
    const {jwt} = useAuth();
    const navigate = useNavigate();

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void => {
        const updatedNames = [...names];
        updatedNames[index] = (event.target as HTMLInputElement).value;
        setNames(updatedNames);
    }

    const handleUpdateModel = (id: number, index: number) => {
        const response = updateModel({
            id: id,
            name: names[index],
            token: jwt!.accessToken
        });
        response.then(res => {
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
        })
    }
    const handleUpdateModelWithPrevent = (id: number, index: number, event: React.MouseEvent): void => {
        event.stopPropagation();
        handleUpdateModel(id, index);
    };

    const handleDeleteModelWithPrevent = (id: number, index: number, event: React.MouseEvent): void => {
        event.stopPropagation();
        handleDeleteModel(id, index);
    };

    const handleDeleteModel = (id: number, index: number) => {
        const response = deleteModel({token: jwt!.accessToken, id: id});

        response.then(res => {
            const updatedModels = [...models];
            updatedModels.splice(index, 1);
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
        })
    }

    return (
        <TablePaper>
            <TableContainer>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Accounts</TableCell>
                            <TableCell align="right">Update</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {models.map((row, index) => (
                            <TableRow
                                onClick={() => navigate("/model/" + row.id)}
                                key={row.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}, cursor: "pointer"}}
                            >
                                <TableCell component="th" scope="row">
                                    <TextField
                                        variant="standard"
                                        value={names[index]}
                                        onClick={(event) => event.stopPropagation()}
                                        onChange={(event) => handleChangeName(event, index)}
                                    />
                                </TableCell>
                                <TableCell align="right">{row.accounts}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={(event) => handleUpdateModelWithPrevent(row.id, index, event)}>
                                        <RefreshIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton color="error"
                                                onClick={(event) => handleDeleteModelWithPrevent(row.id, index, event)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </TablePaper>
    );
};