import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import ViewMessage from './ViewMessage'
import AnswerMessage from './AnswerMessage'
import deleteMessage from './helper/DeleteMessage'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function MessageActionButtonGroup({ message, getMessages, loggedUser }) {
    const classes = useStyles();

    const handleDelete = async () => {
        await deleteMessage(message.id)
        getMessages()
    }

    return (
        <div className={classes.root}>
            <ButtonGroup orientation="vertical" aria-label="vertical contained primary button group" variant="text">
                <ViewMessage message={message} />
                <AnswerMessage message={message} loggedUser={loggedUser} />
                <Button onClick={handleDelete}>Löschen</Button>
            </ButtonGroup>
        </div>
    );
}
