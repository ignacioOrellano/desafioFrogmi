import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton, Typography } from '@mui/material';


export default function BasicTable({ data, handleSelectData }) {

    const rows = data ? data : [];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Tabla">
                <TableHead>
                    <TableRow>
                        <TableCell>Place</TableCell>
                        <TableCell align="right">Magnitude</TableCell>
                        <TableCell align="right">Magnitud Type</TableCell>
                        <TableCell align="right">Time</TableCell>
                        <TableCell align="right">See more</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.attributes.place}
                            </TableCell>
                            <TableCell align="right">{row.attributes.magnitude}</TableCell>
                            <TableCell align="right">{row.attributes.mag_type}</TableCell>
                            <TableCell align="right">{row.attributes.time}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={() => handleSelectData(row.id)}>
                                    <VisibilityIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    {rows.length == 0 &&
                        <TableRow>
                            <TableCell align="center" colSpan={5} sx={{ py: 3 }}>
                                <Typography variant='body1' textAlign='center'>No results found.</Typography>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}