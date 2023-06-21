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
/// dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
///
import { subDays, subHours } from 'date-fns';
import { useState } from 'react';
import { Add } from '@mui/icons-material';


const listaDeAgencias = [
  {
    value: 'SPB',
    label: 'SPB',
  },
  {
    value: 'CABA',
    label: 'CABA',
  },
  {
    value: 'Cuidad Arresto',
    label: 'Cuidad Arresto',
  },
  {
    value: 'Ciudad Genero',
    label: 'Ciudad Genero',
  },
];

export default function Content() {

  const now = new Date();

  const remitos = [
    {
      id: 1,
      agencia: "SPB",
      equipos:{
        E4: 4,
        GPS: 10,
        Tx: 7,
      },
      createdAt: subDays(subHours(now, 2), 1).getTime(),
      recivedAt: subDays(subHours(now, 7), -2).getTime(),
      estado: "creado",
    },
    {
      id: 2,
      agencia: "Mendoza",
      equipos: {
        E4: 1,
        GPS: 14,
        Tx: 0,
      },
      createdAt: subDays(subHours(now, 3), 0).getTime(),
      recivedAt: subDays(subHours(now, 1), -7).getTime(),
      estado: "creado",
    },
  ]


  const [listaRemitos, setListaRemitos] = useState(
    []
  )
  const [nuevoRemito, setNuevoRemito] = useState(
    {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      agencia: "",
      equipos: {
        E4: 0,
        GPS: 0,
        Tx: 0,
      },
      createdAt: Date.UTC(0,0,0),
      recivedAt: Date.UTC(0,0,0),
      estado: "creado",
    }
  )
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addEquipo = (evento) => {
    setNuevoRemito(()=>({
      ...nuevoRemito,
      equipos: {
        ...nuevoRemito.equipos,
        [evento.target.name]: Number(evento.target.value)
      }
    }))
  }

  const addRemito = () => {
    setListaRemitos((listaActual) => ([...listaActual, nuevoRemito]))
    setNuevoRemito({
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      agencia: "",
      equipos: {
        E4: 0,
        GPS: 0,
        Tx: 0,
      },
      createdAt: Date.UTC(0,0,0),
      recivedAt: Date.UTC(0,0,0),
      estado: "creado",
      checked: false,
    })
    setOpen(false)
  }

  const fechaAuxiliar = null;

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
                placeholder="Search by email address, phone number, or user UID"
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
                onClick={() => handleOpen()}
                startIcon={<Add/>}>
                
                Nuevo Remito
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <form>
                <DialogTitle id="alert-dialog-title" >
                  {"Nuevo Remito"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description" sx={{padding: 3}}>
                  <Grid container spacing={2}>
                    <Grid item>
                        <TextField
                          id="outlined-select-currency"
                          select
                          label="Agencia"
                          defaultValue=""
                          helperText="Seleccione una Agencia"
                          name='Agencia'
                          required
                          onChange={e => setNuevoRemito({...nuevoRemito, agencia: e.target.value})}
                          >
                        {listaDeAgencias.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item>
                    <TextField id="outlined-number" label="E4" type="number" InputLabelProps={{
                      shrink: true,
                    }}
                    name='E4'
                    defaultValue={0}
                    sx={{width: 75}}
                    value={nuevoRemito.equipos.E4}
                    onChange={e => addEquipo(e)}
                    />
                  </Grid>
                    <Grid item>
                    <TextField id="outlined-number" name='GPS' label="GPS" type="number" InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={0}
                    sx={{width: 75}}
                    value={nuevoRemito.equipos.GPS}
                    onChange={e => addEquipo(e)}
                    />
                  </Grid>
                    <Grid item>
                    <TextField id="outlined-number" label="TX" type="number" InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={0}
                    sx={{width: 75}}
                    value={nuevoRemito.equipos.Tx}
                    name='Tx'
                    onChange={e => addEquipo(e)}
                    />
                  </Grid>
                  <Grid item sx={{width: 200}}>
                      <DatePicker label="Creado" name="Creado" onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, createdAt: valor.$d}))}/>
                  </Grid>
                  <Grid item sx={{width: 200}}>
                      <DatePicker label="Recibido" name="Recibido" onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, recivedAt: valor.$d}))}/>
                  </Grid>
                  </Grid>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Cerrar
                  </Button>
                  <Button onClick={addRemito} variant='contained'>Crear</Button>
                </DialogActions>
                </form>
              </Dialog>
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
