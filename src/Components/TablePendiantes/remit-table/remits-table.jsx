import styled from "@emotion/styled";
import { Delete, Edit } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Button, Popper, Popover, Link, ClickAwayListener } from "@mui/material";
import { useEffect, useState } from "react";
import { borrarRemitoDeLista, getListaRemitos} from '../../../Utils/API'
import StateChangeButton from "./StateChangeButton";



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

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
          backgroundColor: "aliceblue",
        },
      }));

    const deleteRemit = async (idRemito) => {
        await borrarRemitoDeLista(idRemito)
        setListaRemitos(remitosActual => (
            remitosActual.filter( remitoAFiltrar => remitoAFiltrar.id !== id)
        ))
        getListaRemitos()
            .then(lista => setListaRemitos(lista))
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClickPopover = (event, accesorio) => {
      setAnchorEl(event.currentTarget);
        console.log(event);
        accesoriosPopover(accesorio, )
    };
  
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
                            key={remito.id}
                            hover
                            >
                            <TableCell>
                                <StateChangeButton setListaRemitos={setListaRemitos} remito={remito}/>
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
                                <Button
                                    aria-describedby={id}
                                    id={id}
                                    component="button"
                                    onClick={e => handleClickPopover(e, remito.accesorios)}>
                                    {tieneAccesorios}
                                </Button>
                                {/* <Popover 
                                    id={id} 
                                    open={open} 
                                    anchorEl={anchorEl} 
                                    onClose={() => setAnchorEl(false)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}>
                                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                    {remito.accesorios}
                                    </Box>
                                </Popover>  */}
                            </TableCell>
                            <TableCell>
                                {/* {createdAt} */}
                            </TableCell>
                            <TableCell>
                                {/* {recivedAt} */}
                            </TableCell>
                            <TableCell>
                                {/* {compromisedAt} */}
                            </TableCell>
                            <TableCell>
                                {remito.detalle}
                            </TableCell>
                            <TableCell>
                                {remito.retira}
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
                <StyledTableCell></StyledTableCell>
                
              </TableRow>
            </Table>
          </Box>
        </Card>
    )
}