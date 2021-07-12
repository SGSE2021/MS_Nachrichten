import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
    const [newMessageBody, setMessageBody] = useState()
    const [newMessageReceiver, setMessageReceiver] = useState([])
    const [selectedUsers, setSelectedUsers] = React.useState([]);



    const handleMessageTextChange = (event) => {
        setMessageBody(event.target.value)
    }

    const handleReceiverChange = (newReceiver) => {
        setMessageReceiver(newReceiver)
    }

    const resetSelectedUsers = () => {
        setSelectedUsers([])
    }

    const handleSendMessage = async () => {
        const messageReceiver = []
        newMessageReceiver.map((rec) => {
            messageReceiver.push(rec.id)
        })
        let newMessage = {
            senderID: loggedUser.uid,
            recipientIDs: messageReceiver,
            body: newMessageBody
        }
        await sendMessage(newMessage)
        setMessageBody('')
        setMessageReceiver([])
        resetSelectedUsers()
    }

    useEffect(() => {
        // getAllUsers()
    }, [newMessageReceiver])


    return (
        <form className={classes.root} noValidate autoComplete="off">
            <form className={classes.reciverInput} noValidate autoComplete="off">
                <div>
                    <AddReceiver loggedUser={loggedUser}
                        newMessageReceiver={newMessageReceiver}
                        handleReceiverChange={handleReceiverChange}
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers} />
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
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={
                            () => console.log("Recv:", newMessageReceiver)
                        }>
                    </Button>
                </div>
            </form>
        </form>

    );
}