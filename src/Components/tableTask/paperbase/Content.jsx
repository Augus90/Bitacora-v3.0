// import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import RemitTable from '../react-table/remits-table';
import { useEffect, useState } from 'react';
import { Add } from '@mui/icons-material';
import InputModal from '../react-table/inputModal';
import axios from 'axios'


let listaDeAgencias = [
  // {
  //   value: 'SPB',
  //   label: 'SPB',
  // },
  // {
  //   value: 'CABA',
  //   label: 'CABA',
  // },
  // {
  //   value: 'Cuidad Arresto',
  //   label: 'Cuidad Arresto',
  // },
  // {
  //   value: 'Ciudad Genero',
  //   label: 'Ciudad Genero',
  // },
];

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
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Buscar por agencia..."
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                sx={{ mr: 1 }}
                onClick={() => setOpen(true)}
                startIcon={<Add/>}>
                Nuevo Remito
              </Button>

              <InputModal
                setListaRemitos={setListaRemitos}
                listaRemitos={listaRemitos}
                listaDeAgencias={listaDeAgencias}
                open={open}
                setOpen={setOpen}/>
              
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography color="text.secondary" align="center">
        <RemitTable
          remitos={listaRemitos}
          setListaRemitos={setListaRemitos}
        >

        </RemitTable>
      </Typography>
    </Paper>
  );
}
