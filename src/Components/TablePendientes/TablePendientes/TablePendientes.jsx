import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Button, Popper, Popover, Typography, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { StyledTableCell } from '../../../Utils/Styles';
import { borrarRemitoDeLista, getListaRemitos} from '../../../Utils/API';
import SingleRow from "./Rows/SingleRow";



export default function TablePendientes({remitos, setListaRemitos, listaDeAgencias}) {

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
        "Compromiso",
        "Detalle",
        "Retira"
    ]

    const deleteRemit = async (idRemito) => {
        await borrarRemitoDeLista(idRemito)
        setListaRemitos(remitosActual => (
            remitosActual.filter( remitoAFiltrar => remitoAFiltrar.id !== idRemito)
        ))
        getListaRemitos()
            .then(lista => setListaRemitos(lista))
    }

    return(
        <Card>
          <Box>
            <Table>
              <TableHead>
                <TableRow>

                    {cabeceraDeTabla.map( (cabecera, index) => (
                        <StyledTableCell key={index}>
                           <Typography variant="body1">{cabecera}</Typography> 
                        </StyledTableCell>
                    ))}
                    <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remitos.map((remito) =>(
                    <SingleRow
                        key={remito.id}
                        remito={remito}
                        deleteRemit={deleteRemit}
                        setListaRemitos={setListaRemitos}
                        listaDeAgencias={listaDeAgencias}
                    />
                ))}
              </TableBody>
              <TableRow>
                {/* <StyledTableCell></StyledTableCell> */}
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