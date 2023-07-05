import styled from "@emotion/styled";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Button, Popper, Popover, Typography, ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { borrarRemitoDeLista, getListaRemitos} from '../../../Utils/API';
import SingleRow from "./SingleRow";



export default function RemitTable({remitos, setListaRemitos}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const [openId, setOpenId] = useState(0);

    // useEffect(() => {
        // if(openId){
        //     <Popover 
        //     id={id} 
        //     open={open} 
        //     anchorEl={anchorEl} 
        //     onClose={() => setAnchorEl(false)}
        //     anchorOrigin={{
        //         vertical: 'bottom',
        //         horizontal: 'left',
        //     }}>
        //         <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
        //             {remito.accesorios}
        //         </Box>
        // </Popover> 
        // }      
    // }, [openId])

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
        "Comprometido",
        "Detalle",
        "Retira"
    ]


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        // backgroundColor: "gainsboro",
        backgroundColor: "whitesmoke",
        // color: theme.palette.common.white,
        }));

    const deleteRemit = async (idRemito) => {
        await borrarRemitoDeLista(idRemito)
        setListaRemitos(remitosActual => (
            remitosActual.filter( remitoAFiltrar => remitoAFiltrar.id !== id)
        ))
        getListaRemitos()
            .then(lista => setListaRemitos(lista))
    }


  
    const accesoriosPopover = (accesorio) => {
        // openPopover = openId === id;
        <Popover id='simple-popper' open={true} anchorEl={anchorEl}>
            <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                    {accesorio}
                </Box>
            </ClickAwayListener>
        </Popover> 
    }

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
                           <Typography variant="caption">{cabecera}</Typography> 
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
                {remitos.map((remito) =>(
                    <SingleRow
                        key={remito.id}
                        remito={remito}
                        deleteRemit={deleteRemit}
                        setListaRemitos={setListaRemitos}
                    />
                ))}
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
                <StyledTableCell></StyledTableCell>
                
              </TableRow>
            </Table>
          </Box>
        </Card>
    )
}