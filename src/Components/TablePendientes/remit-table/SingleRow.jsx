import styled from "@emotion/styled";
import { Delete, Edit } from "@mui/icons-material";
import {  TableCell, TableHead, TableRow, Button, Box, Popper, Popover, Typography, ClickAwayListener, Card, CardContent, Tooltip } from "@mui/material";
import { useState } from "react";
import { borrarRemitoDeLista, editarRemitoDeLista, getListaRemitos} from '../../../Utils/API'
import StateChangeButton from "./StateChangeButton";
import format from "date-fns/format";
import InputModal from "../InputModal";
import { remitoVacio } from "../RemitoVacio";
import { AccesoriosPopover } from "./AccesoriosPopover";

const SingleRow = ({remito, deleteRemit, setListaRemitos, listaDeAgencias}) => {

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: "aliceblue",
        },
        }));

    const [openModal, setOpenModal] = useState(0);
    
    // const createdAt = remito.createdAt === Date.UTC(0,0,0) ? "" : format(remito.createdAt, 'dd/MM/yyyy') ;
    const fechaEsValida = (fecha) => {
            if(fecha !== format(Date.UTC(0,0,0), 'dd/MM/yyyy')) {
                return <Typography variant="body2"> {fecha}</Typography>
            }
    }


    const modificarRemitoGlobal = (nuevoRemito, setNuevoRemito) => {
        setListaRemitos(listaActual => listaActual.map(item => (
            item.id === nuevoRemito.id ? {...item, ...nuevoRemito} : item
        )))
        editarRemitoDeLista(nuevoRemito)
        console.log("Remito Editado", nuevoRemito);
        setNuevoRemito(remitoVacio)
        setOpenModal(false)
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
                {remito.accesorios.length > 0 ? <AccesoriosPopover accesorios={remito.accesorios}/> : ''}
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
                <Tooltip title="Editar">
                    <Button endIcon={<Edit color="action"/>} onClick={() => setOpenModal(true)} ></Button>
                </Tooltip>
                <Tooltip title="Borrar">
                    <Button endIcon={<Delete color="action"/>} onClick={()=>deleteRemit(remito.id)}></Button>
                </Tooltip>
            </TableCell>
            <InputModal
                setListaRemitos={setListaRemitos}
                open={openModal}
                setOpen={setOpenModal}
                ramitoActual={remito}
                listaDeAgencias={listaDeAgencias}
                modificarRemitoGlobal={modificarRemitoGlobal}
            />
        </StyledTableRow>
    )

}

export default SingleRow