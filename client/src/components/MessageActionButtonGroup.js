import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import ViewMessage from './ViewMessage'
import AnswerMessage from './AnswerMessage'

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

export default function MessageActionButtonGroup({message}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonGroup orientation="vertical" aria-label="vertical contained primary button group" variant="text">
                <ViewMessage message={message}/>
                <AnswerMessage message={message}/>
                <Button onClick={
                    // TODO DELETE REST
                    console.log("DELETE MESSAGE")
                }>Löschen</Button>
            </ButtonGroup>
        </div>
    );
}
