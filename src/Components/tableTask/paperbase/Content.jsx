// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import RemitTable from '../react-table/remits-table';
import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import InputModal from '../react-table/inputModal';
import axios from 'axios'
import Header from './Header';


let listaDeAgencias = [];

const ESTADOS = {
  CREADO: "Creado",
  EN_PROCESO: "En Proceso",
  FINALIZADO: "Finalizado",
  A_DETERMINAR: "A Determinar",
}

export default function Content() {

  const [listaRemitos, setListaRemitos] = useState([])
  const [open, setOpen] = useState(false);


  useEffect( () => {
    getAgencias();
    getListaRemitos();
  },[])


  function llenarAgencias(jsonDeAgencias){
    listaDeAgencias = jsonDeAgencias.map( agencia => ({
      value: agencia.nombre,
      label: agencia.nombre,
    }))
  }

  function llenarListaRemitosEnProceso(listaDeRemitos){
    // setListaRemitos(listaDeAgencias)
      console.log("Lista de Remitos",listaDeRemitos);
      setListaRemitos(listaDeRemitos);
      // console.log("Lsita de remitos", listaRemitos);
  }

  const getAgencias = () => {
    axios.get('http://localhost:5265/api/Agencias')
      .then(response => llenarAgencias(response.data))
      .catch(error => console.log(error))
    
  }

  const getListaRemitos = () => {
    axios.get('http://localhost:5265/api/ListadoRemitos')
      .then(response => llenarListaRemitosEnProceso(response.data))
      .catch(error => console.log(error))
  }

  return (
    <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>

      <Typography color="text.secondary" align="center">
        <RemitTable
          remitos={listaRemitos}
          getListaRemitos={getListaRemitos}
          setListaRemitos={setListaRemitos}
        >

        </RemitTable>
      </Typography>
    </Paper>
  );
}
