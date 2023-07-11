import { Typography,Table,TableBody,TableCell,TableHead,TableContainer,TableRow,IconButton } from '@mui/material'
import Paper from '@mui/material/Paper';
import { StyledTableCell } from '../../Utils/Styles';
import RestoreIcon from '@mui/icons-material/Restore';

const TableHistorico = ({listaRegistros}) => {


    const cabeceraDeTabla = [
        {cabecera: "Agencia", cuerpo: "agencia" },
        {cabecera: "Numero", cuerpo: "numero" },
        {cabecera: "E4", cuerpo: "e4" },
        {cabecera: "E4T", cuerpo: "e4T" },
        {cabecera: "GPS", cuerpo: "gps" },
        {cabecera: "TX860", cuerpo: "tx860" },
        {cabecera: "TX700", cuerpo: "tx700" },
        {cabecera: "TX840", cuerpo: "tx840" },
        {cabecera: "MRD", cuerpo: "mrd" },
        {cabecera: "Creado", cuerpo: "createdAt" },
        {cabecera: "Recepcion", cuerpo: "recivedAt" },
        {cabecera: "Compromiso", cuerpo: "compromisedAt" },
        {cabecera: "Completado", cuerpo: "completedAt" },
        {cabecera: "Detalle", cuerpo: "detalle" },
    ]

    return (<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {cabeceraDeTabla.map((cabecera, index)=> (
              <StyledTableCell key={index}>
                    <Typography marginY={2} variant='body1'>{cabecera.cabecera}</Typography>
                </StyledTableCell>
            ))}
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {listaRegistros.map((registo)=>{
              return <TableRow
              key={registo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                    {cabeceraDeTabla.map((item, index) => (
                        <TableCell key={index} height={"20px"} component="th" scope="row">
                            <Typography>{registo[item.cuerpo]}</Typography>
                        </TableCell>
                    ))}
                    <TableCell>
                      <IconButton aria-label="delete" color="default">
                        <RestoreIcon />
                      </IconButton>
                    </TableCell>
            </TableRow>
            })}

        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default TableHistorico