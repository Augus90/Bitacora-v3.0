import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Collapse, Typography, Link, Popper, ClickAwayListener, Grid } from "@mui/material";
import { useState } from "react";
import { ESTADOS } from '../../Utils/Enums';
import { editarRemitoDeLista } from '../../Utils/API';
import { format } from 'date-fns';
import { AccesoriosPopover } from '../TablePendientes/remit-table/AccesoriosPopover';

const CollapseRow = ({remito, setListaRemitos, isDone}) => {

    const [open, setOpen] = useState(false);

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(even)': {
        backgroundColor: "#F9F9F9",
        },
    }));   

    const fechaEsValida = (fecha) => {
        if(fecha !== format(Date.UTC(0,0,0), 'dd/MM/yyyy')) {
            return <Typography variant='body2'> {fecha}</Typography>
        }
    }


    const handleChageEvent = (remito) => {
        const remitoEditado = {...remito, estado: ESTADOS.FINALIZADO}
        // console.log("Estado Viejo", remitoEditado);
        editarRemitoDeLista(remitoEditado)
            .then(response => console.log(response))
            .catch(e => console.error(e));
        // Crea una lista con el estado actual, lo mapea en 'r', verifico si el id correpornde al id a modificar, lo edito, sino devuelvo el mismo remito del map
        setListaRemitos(lista => lista.map(r => r.id === remito.id ? {...r, estado: ESTADOS.FINALIZADO} : r));
    }

    return (<>
            <StyledTableRow 
                sx={{ '& > *': { borderBottom: 'unset' } }}
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
                    {remito.accesorios.length > 0 && <AccesoriosPopover accesorios={remito.accesorios}/>}
                </TableCell>
                <TableCell>
                    <Typography>{remito.retira}</Typography>
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
            <StyledTableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                <Box container justifyContent='center'>
                  <Grid item >
                    <Table size='small'>
                        <TableHead>
                            <TableCell>Creado</TableCell>
                            <TableCell>Recibido</TableCell>
                            <TableCell>Compromiso</TableCell>
                            <TableCell>Detalle</TableCell>
                            <TableCell>Retira</TableCell>
                            <TableCell colSpan={3}>Accesorios</TableCell>
                        </TableHead>
                        <TableBody>
                            <TableCell>{fechaEsValida(remito.createdAt)}</TableCell>
                            <TableCell>{fechaEsValida(remito.recivedAt)}</TableCell>
                            <TableCell>{fechaEsValida(remito.compromisedAt)}</TableCell>
                            <TableCell>{remito.detalle}</TableCell>
                            <TableCell>{remito.retira}</TableCell>
                            <TableCell>{remito.accesorios}</TableCell>
                        </TableBody>
                        </Table>
                  </Grid>
                </Box>
                </Collapse>
              </TableCell>
            </StyledTableRow>
        </>
    )
}

export default CollapseRow