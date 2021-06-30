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

export default function MessageAcionButtonGroup() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ButtonGroup orientation="vertical" aria-label="vertical contained primary button group" variant="text">
                <ViewMessage/>
                <AnswerMessage/>
                <Button>Löschen</Button>
            </ButtonGroup>
        </div>
    );
}
