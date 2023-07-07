import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Popper, Link, ClickAwayListener, Typography } from "@mui/material";
import { useState } from "react";
import { ESTADOS } from '../../Utils/Enums';
import { editarRemitoDeLista } from '../../Utils/API';
import CollapseRow from './CollapseRow';


const TableOnProcess = ({remitos, setListaRemitos, isDone}) => {


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        // backgroundColor: "gainsboro",
        backgroundColor: "whitesmoke",
        // color: theme.palette.common.white,
    }));
    
    const cabeceraDeTabla = [
            "Agencia",
            "Numero",
            "E4",
            "E4T",
            "GPS",
            "TX860",
            "TX700",
            "TX840",
            "MRD",
            "Accesorios",
            "Retira",
        ]

    return(
        <Card>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                    <StyledTableCell padding="checkbox">
                        {/* TODO: Select all */}
                        <Checkbox/>
                    </StyledTableCell>
                    {cabeceraDeTabla.map( (cabecera, index) => (
                        <StyledTableCell key={index}>
                            {cabecera}
                        </StyledTableCell>
                    ))}
                    <StyledTableCell align="right" width={180}>
                        <Tooltip title="Reload">
                            <IconButton>
                                <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                            </IconButton>
                        </Tooltip>
                    </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remitos.map((remito) =>{
                    return <CollapseRow
                        key={remito.id}
                        remito={remito}
                        setListaRemitos={setListaRemitos}
                        isDone={isDone}
                    />
                })}
              </TableBody>
              <TableRow>
                <StyledTableCell colSpan={3}><Typography variant='h6'>Total</Typography></StyledTableCell>
                <StyledTableCell>   
                    {remitos.reduce((accum, item) => accum + item.e4, 0)}
                </StyledTableCell>
                <StyledTableCell>
                    {remitos.reduce((accum, item) => accum + item.e4T, 0)}
                </StyledTableCell>
                <StyledTableCell>
                    {remitos.reduce((accum, item) => accum + item.gps, 0)}
                </StyledTableCell>
                <StyledTableCell>
                    {remitos.reduce((accum, item) => accum + item.tx860, 0)}
                </StyledTableCell>
                <StyledTableCell>
                    {remitos.reduce((accum, item) => accum + item.tx700, 0)}
                </StyledTableCell>
                <StyledTableCell>
                    {remitos.reduce((accum, item) => accum + item.tx840, 0)}
                </StyledTableCell>
                <StyledTableCell>
                    {remitos.reduce((accum, item) => accum + item.mrd, 0)}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                
              </TableRow>
            </Table>
          </Box>
        </Card>
    )
}

export default TableOnProcess

TableOnProcess.prototype = {
    remitos: PropTypes.node, 
    setListaRemitos: PropTypes.func
}