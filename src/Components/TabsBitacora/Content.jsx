// import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TableOnProcess from './TableOnProcess';
import { useEffect, useState } from 'react';
import { getListaRemitos } from '../../Utils/API';
import { ESTADOS } from '../../Utils/Enums';


// let listaDeAgencias = [];



export default function Content({filtro}) {

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

        <TableOnProcess
          remitos={listaRemitos.filter(remitos => remitos.estado === filtro)}
          getListaRemitos={getListaRemitos}
          setListaRemitos={setListaRemitos}
          isDone={filtro !== ESTADOS.EN_PROCESO}
        >
        </TableOnProcess>
    </Paper>
  );
}
