import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button, Popper, Link, ClickAwayListener } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";


export default function RemitTable({remitos, setListaRemitos}) {

    const deleteRemit = (remito) => {
        setListaRemitos(remitos.filter( remitoAFiltrar => remitoAFiltrar.id !== remito.id))
    }

    const cabeceraDeTabla = [
        "Agencia",
        "Numero",
        "E4",
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
                    <TableCell padding="checkbox">
                        {/* TODO: Select all */}
                        <Checkbox/>
                    </TableCell>
                    {cabeceraDeTabla.map( (cabecera, index) => (
                        <TableCell key={index}>
                            {cabecera}
                        </TableCell>
                    ))}
                    <TableCell align="right" width={180}>
                        
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remitos.map((remito) =>{
                    const createdAt = remito.createdAt === Date.UTC(0,0,0) ? "" : format(remito.createdAt, 'dd/MM/yyyy') ;
                    const recivedAt = remito.recivedAt === Date.UTC(0,0,0) ? "" : format(remito.recivedAt, 'dd/MM/yyyy') ;
                    const tieneAccesorios = remito.accesorios.length > 0 ? "ACC" : "";

                    return(
                        <TableRow 
                            justifyContent="center"
                            key={remito.id}
                            hover
                            >
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell>
                                {remito.agencia}
                            </TableCell>
                            <TableCell>
                                {remito.numero}
                            </TableCell>
                            <TableCell>
                                {remito.E4}
                            </TableCell>
                            <TableCell>
                                {remito.GPS}
                            </TableCell>
                            <TableCell>
                                {remito.Tx860}
                            </TableCell>
                            <TableCell>
                                {remito.Tx700}
                            </TableCell>
                            <TableCell>
                                {remito.Tx840}
                            </TableCell>
                            <TableCell>
                                {remito.MRD}
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
                                {createdAt}
                            </TableCell>
                            <TableCell>
                                {recivedAt}
                            </TableCell>
                            <TableCell>
                                <Button endIcon={<Edit color="action"/>} ></Button>
                                <Button endIcon={<Delete color="action"/>} onClick={()=>deleteRemit(remito)}></Button>
                            </TableCell>
                            
                        </TableRow>
                    )
                })}
              </TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.E4, 0)}
                </TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.GPS, 0)}
                </TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.Tx860, 0)}
                </TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.Tx700, 0)}
                </TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.Tx840, 0)}
                </TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.MRD, 0)}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                
              </TableRow>
            </Table>
          </Box>
        </Card>
    )
}