import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Collapse, Typography, Link, Popper, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { ESTADOS } from '../../Utils/Enums';
import { editarRemitoDeLista } from '../../Utils/API';
import { format } from 'date-fns';

const CollapseRow = ({remito, setListaRemitos, isDone}) => {

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
        backgroundColor: "aliceblue",
        },
    }));   

    const createdAt = remito.createdAt === format(Date.UTC(0,0,0), 'dd/MM/yyyy') ? "" : remito.createdAt ;

    const fechaEsValida = (fecha) => {
        if(fecha !== format(Date.UTC(0,0,0), 'dd/MM/yyyy')) {
            return <Typography fontSize={15}> {fecha}</Typography>
        }
    }
    // const recivedAt = remito.recivedAt === Date.UTC(0,0,0) ? "" : format(remito.recivedAt, 'dd/MM/yyyy') ;
    const tieneAccesorios = remito.accesorios.length > 0 ? "ACC" : "";


    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popper' : undefined;
    
    const handleClickPopover = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    // const accesoriosPopover = (accesorios) => (
    // <Popper id={id} open={openPopover} anchorEl={anchorEl}>
    //     <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
    //         <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
    //         {accesorios}
    //         </Box>
    //     </ClickAwayListener>
    // </Popper>
    // )

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
                    <Link
                    component="button"
                    onClick={e => handleClickPopover(e)}>
                        {tieneAccesorios}
                    </Link>
                    <Popper id={id} open={openPopover} anchorEl={anchorEl}>
                        <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
                            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                            {remito.accesorios}
                            </Box>
                        </ClickAwayListener>
                    </Popper>
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
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box >
                    <Table size='small'>
                    <TableHead>
                        <TableCell>Creado</TableCell>
                        <TableCell>Recibido</TableCell>
                        <TableCell>Comprometido</TableCell>
                        <TableCell>Detalle</TableCell>
                        <TableCell>Retira</TableCell>
                        <TableCell>Accesorios</TableCell>
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
                  </Box>
                </Collapse>
              </TableCell>
            </StyledTableRow>
        </>
    )
}

export default CollapseRow