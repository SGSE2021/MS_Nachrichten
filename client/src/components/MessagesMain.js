/* eslint-disable no-multi-str */
import React, { useEffect, useState } from 'react';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MessageAcionButtonGroup from './MessageAcionButtonGroup';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Env from './Env'

import axios from 'axios';
import ViewMessage from './ViewMessage'



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SimpleTable() {
    const [messages, setMessages] = useState([]);

    async function getAllMessages() {
        try {
            // URL + /API/messages
            const messages = await axios.get(Env.BACK_URL + '/messages')
            setMessages(messages.data)

        } catch (error) {
            // TODO
            console.error(error);
        }
    }

    useEffect(() => {
        getAllMessages()
    }, [setMessages])


    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">Nachricht</TableCell>
                        <TableCell align="left">Absender</TableCell>
                        <TableCell align="left">Gelesen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {messages.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left"> <MessageAcionButtonGroup message={row} /> </TableCell>
                            <TableCell align="left">{row.body}</TableCell>
                            <TableCell align="left">{row.senderName}</TableCell>
                            <TableCell align="left">{(() => {
                                if (row.isRead === 1) {
                                    return <CheckBoxIcon />
                                }
                                else {
                                    return <CheckBoxOutlineBlankIcon />
                                }
                            })()
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
