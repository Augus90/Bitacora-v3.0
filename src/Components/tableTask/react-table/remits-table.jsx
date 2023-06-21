import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from "@mui/material";
import { format } from "date-fns";


export default function RemitTable({remitos, setListaRemitos}) {

    const deleteRemit = (remito) => {
        setListaRemitos(remitos.filter( remitoAFiltrar => remitoAFiltrar.id !== remito.id))
    }

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
                    
                    <TableCell>
                        Agencia
                    </TableCell>
                    <TableCell>
                        E4
                    </TableCell>
                    <TableCell>
                        GPS
                    </TableCell>
                    <TableCell>
                        Tx
                    </TableCell>
                    <TableCell>
                        Creado
                    </TableCell>
                    <TableCell>
                        Recibido
                    </TableCell>
                    <TableCell align="right" width={180}>
                        
                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {remitos.map((remito) =>{
                    const createdAt = remito.createdAt === Date.UTC(0,0,0) ? "" : format(remito.createdAt, 'dd/MM/yyyy') ;
                    const recivedAt = remito.recivedAt === Date.UTC(0,0,0) ? "" : format(remito.recivedAt, 'dd/MM/yyyy') ;

                    return(
                        <TableRow 
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
                                {remito.equipos.E4}
                            </TableCell>
                            <TableCell>
                                {remito.equipos.GPS}
                            </TableCell>
                            <TableCell>
                                {remito.equipos.Tx}
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
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.equipos.E4, 0)}
                </TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.equipos.GPS, 0)}
                </TableCell>
                <TableCell>
                    {remitos.reduce((accum, item) => accum + item.equipos.Tx, 0)}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                
              </TableRow>
            </Table>
          </Box>
        </Card>
    )
}