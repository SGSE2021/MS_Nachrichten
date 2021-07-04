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

    // TODO FILTER ONLY IF RECIPIENT

    async function getUserById(userId) {
        try {
            // URL + /API/messages
            let user = await axios.get(Env.BACK_URL + '/users/students/' + userId)
            if (user.data.id === "") {
                user = await axios.get(Env.BACK_URL + '/users/lecturers/' + userId)
            }
            if (user.data.id === "") {
                // const user = await axios.get(Env.BACK_URL + '/users/students/' + userId) //TODO
            }
            return user
        } catch (error) {
            // TODO
            console.error(error);
        }
    }

    async function getAllMessages() {
        try {
            // URL + /API/messages
            let messages = await axios.get(Env.BACK_URL + '/messages')
            messages = messages.data
            for (let i = 0; i < messages.length; i++) {
                const user = await getUserById(messages[i].senderID)
                messages[i].senderName = user.data.firstname + " " + user.data.lastname
            }

            setMessages(messages)
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
