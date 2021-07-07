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
import MessageActionButtonGroup from './MessageActionButtonGroup';
import getAllMessagesUser from './helper/GetAllMessagesUser'



const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function SimpleTable({loggedUser}) {
    const [messages, setMessages] = useState([]);

    // TODO FILTER ONLY IF RECIPIENT

    async function getMessages() {
        const tempMessages = await getAllMessagesUser(loggedUser.uid)
        setMessages(tempMessages)
    }

    useEffect(() => {
        getMessages()
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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {messages.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left"> <MessageActionButtonGroup message={row} /> </TableCell>
                            <TableCell align="left">{row.body}</TableCell>
                            <TableCell align="left">{row.senderName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}
