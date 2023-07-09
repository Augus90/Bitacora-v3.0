// import * as React from 'react';
import Paper from '@mui/material/Paper';
import TableOnProcess from './TableOnProcess';
import { useEffect, useState } from 'react';
import { getListaRemitos } from '../../Utils/API';
import { ESTADOS } from '../../Utils/Enums';

// let listaDeAgencias = [];



export default function Content({filtro, fecha}) {

  const [listaRemitos, setListaRemitos] = useState([])
  const [refresh, setRefresh] = useState(false)

  console.log(fecha);

  useEffect( () => {
    getListaRemitos()
      .then(lista => llenarListaRemitosEnProceso(lista))
      .catch(e => console.error(e))
    setRefresh(false)
  },[refresh])

  function llenarListaRemitosEnProceso(listaDeRemitos){
      console.log("Lista de Remitos",listaDeRemitos);
      setListaRemitos(listaDeRemitos);
  }

  return (
    <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>

        <TableOnProcess
          remitos={listaRemitos.filter(remitos => remitos.estado === filtro && remitos.compromisedAt === fecha)}
          getListaRemitos={getListaRemitos}
          setListaRemitos={setListaRemitos}
          isDone={filtro !== ESTADOS.EN_PROCESO}
          setRefresh={setRefresh}
        >
        </TableOnProcess>
    </Paper>
  );
}
