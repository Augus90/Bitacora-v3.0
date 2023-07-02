// import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableOnProcess from '../react-table/TableOnProcess';
import { useEffect, useState } from 'react';
import { getListaRemitos } from '../../../Utils/API';


// let listaDeAgencias = [];

const ESTADOS = {
  CREADO: "Creado",
  EN_PROCESO: "En Proceso",
  FINALIZADO: "Finalizado",
  A_DETERMINAR: "A Determinar",
}

export default function Content() {

  const [listaRemitos, setListaRemitos] = useState([])


  useEffect( () => {
    getListaRemitos()
      .then(lista => llenarListaRemitosEnProceso(lista))
      .catch(e => console.error(e))
  },[])

  function llenarListaRemitosEnProceso(listaDeRemitos){
      console.log("Lista de Remitos",listaDeRemitos);
      setListaRemitos(listaDeRemitos);
  }

  return (
    <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>

      <Typography color="text.secondary" align="center">
        <TableOnProcess
          remitos={listaRemitos}
          getListaRemitos={getListaRemitos}
          setListaRemitos={setListaRemitos}
        >

        </TableOnProcess>
      </Typography>
    </Paper>
  );
}
