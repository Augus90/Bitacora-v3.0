import styled from "@emotion/styled";
import { Delete, Edit } from "@mui/icons-material";
import {  TableCell, TableHead, TableRow, Button, Popper, Popover, Typography, ClickAwayListener, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { borrarRemitoDeLista, getListaRemitos} from '../../../Utils/API'
import StateChangeButton from "./StateChangeButton";
import format from "date-fns/format";

const SingleRow = ({remito, deleteRemit, setListaRemitos}) => {

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


    const [openId, setOpenId] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);

    
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const handleClickPopover = (event, accesorio) => {
    //   setAnchorEl(event.currentTarget);
        console.log(event);
        // accesoriosPopover(accesorio, )
    };

    // const createdAt = remito.createdAt === Date.UTC(0,0,0) ? "" : format(remito.createdAt, 'dd/MM/yyyy') ;
    const fechaEsValida = (fecha) => {
            if(fecha !== format(Date.UTC(0,0,0), 'dd/MM/yyyy')) {
                return <Typography fontSize={15}> {fecha}</Typography>
            }
    }
    
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
                <Typography variant="body2" gutterBottom>{remito.agencia}</Typography>
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
                {fechaEsValida(remito.createdAt)}
            </TableCell>
            <TableCell>
                {fechaEsValida(remito.recivedAt)}
            </TableCell>
            <TableCell>
                {fechaEsValida(remito.compromisedAt)}
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

}

export default SingleRow