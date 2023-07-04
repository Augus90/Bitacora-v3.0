import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Popper, Link, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { ESTADOS } from '../../Utils/enums';
import { editarRemitoDeLista } from '../../Utils/API';


const TableOnProcess = ({remitos, setListaRemitos, isDone}) => {

  const [open, setOpen] = useState(false);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        // backgroundColor: "gainsboro",
        backgroundColor: "whitesmoke",
        // color: theme.palette.common.white,
    }));
    
    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
        backgroundColor: "aliceblue",
        },
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
        ]

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickPopover = (event) => {
    //   setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popper' : undefined;
  
    const accesoriosPopover = (accesorios) => (
        <Popper id={id} open={openPopover} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                {accesorios}
                </Box>
            </ClickAwayListener>
        </Popper>
    )

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleChageEvent = (remito) => {
        const remitoEditado = {...remito, estado: ESTADOS.FINALIZADO}
        // console.log("Estado Viejo", remitoEditado);
        editarRemitoDeLista(remitoEditado)
            .then(response => console.log(response))
            .catch(e => console.error(e));
        // Crea una lista con el estado actual, lo mapea en 'r', verifico si el id correpornde al id a modificar, lo edito, sino devuelvo el mismo remito del map
        setListaRemitos(lista => lista.map(r => r.id === remito.id ? {...r, estado: ESTADOS.FINALIZADO} : r));
    }

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
                    // const createdAt = remito.createdAt === Date.UTC(0,0,0) ? "" : format(remito.createdAt, 'dd/MM/yyyy') ;
                    // const recivedAt = remito.recivedAt === Date.UTC(0,0,0) ? "" : format(remito.recivedAt, 'dd/MM/yyyy') ;
                    const tieneAccesorios = remito.accesorios.length > 0 ? "ACC" : "";

                    return(
                        <StyledTableRow 
                            justifyContent="center"
                            key={remito.id}
                            hover
                            >
                            <TableCell padding="checkbox">
                                <Checkbox checked={isDone} onClick={() => handleChageEvent(remito)}/>
                            </TableCell>
                            <TableCell>
                                {remito.agencia}
                            </TableCell>
                            <TableCell>
                                {remito.numero}
                            </TableCell>
                            <TableCell>
                                {remito.e4}
                            </TableCell>
                            <TableCell>
                                {remito.e4T}
                            </TableCell>
                            <TableCell>
                                {remito.gps}
                            </TableCell>
                            <TableCell>
                                {remito.tx860}
                            </TableCell>
                            <TableCell>
                                {remito.tx700}
                            </TableCell>
                            <TableCell>
                                {remito.tx840}
                            </TableCell>
                            <TableCell>
                                {remito.mrd}
                            </TableCell>
                            <TableCell>
                                <Link
                                component="button"
                                onClick={e => handleClickPopover(e)}>
                                    {tieneAccesorios}
                                </Link>
                                {accesoriosPopover(remito.accesorios)}
                            </TableCell>
                            <TableCell>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                            </TableCell>          
                        </StyledTableRow>
                    )
                })}
              </TableBody>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
                <StyledTableCell></StyledTableCell>
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