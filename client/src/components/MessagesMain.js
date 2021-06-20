/* eslint-disable no-multi-str */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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


const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// TODO: GET DATA
function getMessages(message, sender, course, isRead) {
    return { message, sender, course, isRead };
}

// TODO: REMOVE
const tempTestMessage = [
    getMessages('Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper\
        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat\
        ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.', 'Test Peron', 'Test Kurs', true),
    getMessages('Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla\
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac\
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla\
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac\
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.', 'Test Peron', 'Test Kurs', false),
    getMessages('Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla\
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac\
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.', 'Test Peron', 'Test Kurs', true),
    getMessages('Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla\
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac\
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.', 'Test Peron', 'Test Kurs', false),
    getMessages('Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla\
        facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac\
        tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.', 'Test Peron', 'Test Kurs', false),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">Nachricht</TableCell>
                        <TableCell align="left">Absender</TableCell>
                        <TableCell align="left">Kurs</TableCell>
                        <TableCell align="left">gelesen</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tempTestMessage.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="left"> <MessageAcionButtonGroup /> </TableCell>
                            <TableCell align="left">{row.message}</TableCell>
                            <TableCell align="left">{row.sender}</TableCell>
                            <TableCell align="left">{row.course}</TableCell>
                            <TableCell align="left">{(() => {
                                if (row.isRead) {
                                    return <CheckBoxIcon/>
                                }
                                else {
                                    return <CheckBoxOutlineBlankIcon/>
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
