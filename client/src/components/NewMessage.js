import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Env from './Env'

import axios from 'axios';
import AddReceiver from './AddReceiver'
import sendMessage from './helper/SendMessage'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "100%",
        },
    },
    reciverInput: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "50%",
        },
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function EmailInputTextField({ loggedUser }) {
    const classes = useStyles();

    // Get all users
    // const [users, setUsers] = useState([]);
    const [newMessageBody, setMessageBody] = useState()
    const [newMessageReceiver, setMessageReceiver] = useState([])

    // async function getAllUsers() {
    //     try {
    //         const users = await axios.get(Env.BACK_URL +'/users')
    //         console.log(users)
    //         setUsers(users.data.users)

    //     } catch (error) {
    //         // TODO
    //         console.error(error);
    //     }
    // }

    const handleMessageTextChange = (event) => {
        setMessageBody(event.target.value)
    }

    const handleReceiverChange = (newReceiver) => {
        setMessageReceiver(newReceiver)
    }

    const handleSendMessage = () => {
        const messageReceiver = []
        newMessageReceiver.map((rec) => {
            messageReceiver.push(rec.id)
        })
        let newMessage = {
            senderID: loggedUser.uid,
            recipientIDs: messageReceiver,
            body: newMessageBody
        }
        sendMessage(newMessage)
    }   

    useEffect(() => {
        // getAllUsers()
    }, [newMessageReceiver])


    return (
        <form className={classes.root} noValidate autoComplete="off">
            <form className={classes.reciverInput} noValidate autoComplete="off">
                <div>
                    <AddReceiver newMessageReceiver={newMessageReceiver} handleReceiverChange={handleReceiverChange} />
                </div>
            </form>
            <form className={classes.root} noValidate autoComplete="off">
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="Nachricht"
                        multiline
                        rows={25}
                        variant="outlined"
                        value={newMessageBody}
                        onChange={handleMessageTextChange}
                    />
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<Icon>send</Icon>}
                        onClick={handleSendMessage}
                    >
                        Nachricht Senden
                    </Button>
                </div>
            </form>
        </form>

    );
}