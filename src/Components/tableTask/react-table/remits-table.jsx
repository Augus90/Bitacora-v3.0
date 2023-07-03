import styled from "@emotion/styled";
import { Delete, Edit } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button, Popper, Link, ClickAwayListener, Chip } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { borrarRemitoDeLista, getListaRemitos } from "../../../Utils/API";



export default function RemitTable({remitos, setListaRemitos}) {

    const deleteRemit = async (idRemito) => {

        await borrarRemitoDeLista(idRemito)

        setListaRemitos(remitosActual => (
            remitosActual.filter( remitoAFiltrar => remitoAFiltrar.id !== id)
        ))
            
        getListaRemitos()
            .then(lista => setListaRemitos(lista))
    }

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
        "Estado",
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
        "Creado",
        "Recepcion",
    ]

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickPopover = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
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

    return(
        <Card>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                    {/* <StyledTableCell padding="checkbox"> */}
                        {/* TODO: Select all */}
                        {/* <Checkbox/> */}
                    {/* </StyledTableCell> */}
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
                            {/* <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell> */}
                            <TableCell>
                                <Chip label={remito.estado} variant="outlined" color="primary" onClick={() => console.log("Click")} />
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
                                {/* {createdAt} */}
                            </TableCell>
                            <TableCell>
                                {/* {recivedAt} */}
                            </TableCell>
                            <TableCell>
                                <Button endIcon={<Edit color="action"/>} ></Button>
                                <Button endIcon={<Delete color="action"/>} onClick={()=>deleteRemit(remito.id)}></Button>
                            </TableCell>
                            
                        </StyledTableRow>
                    )
                })}
              </TableBody>
              <TableRow>
                {/* <StyledTableCell></StyledTableCell> */}
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>Total</StyledTableCell>
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
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
                
              </TableRow>
            </Table>
          </Box>
        </Card>
    )
}