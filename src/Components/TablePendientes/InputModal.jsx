import { useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Container, TextField, Divider, Button, Select, MenuItem, InputLabel, Stack, Paper, FormHelperText, Typography, Box } from '@mui/material';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { agregarRemitoALista, getAgencias } from '../../Utils/API';
import { remitoVacio } from './RemitoVacio';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { DETALLES } from '../../Utils/Enums';
import dayjs from 'dayjs';


const InputModal = ({ ramitoActual = remitoVacio, listaDeAgencias, open, setOpen, modificarRemitoGlobal}) => {
    

    const [nuevoRemito, setNuevoRemito] = useState(ramitoActual);



    const AgregarEquipoAlRemito = (evento) => {
        setNuevoRemito(()=>({
            ...nuevoRemito,
            [evento.target.name]: Number(evento.target.value)
        }))
    }

    const formValidate = () => {
        return true;
    }

    function onSubmitRemit(e){
        e.preventDefault()
        if(formValidate()){
            modificarRemitoGlobal(nuevoRemito, setNuevoRemito)
        }
    }

    const detalles = Object.keys(DETALLES).map(detalle => DETALLES[detalle])

  return (
    <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
    >
    <form onSubmit={onSubmitRemit}>
        <Box sx={{backgroundColor: "#009be5", color: "#FFF"}}>
            <DialogTitle id="alert-dialog-title" >
                <Stack spacing={2} direction={'row'} alignItems={'center'}>
                    <ChecklistIcon fontSize='large'/>
                    <Typography variant='h4' >{nuevoRemito.id ?  "Editar Remito" : "Nuevo Remito"}</Typography>
                </Stack>
            </DialogTitle>
        </Box>
        <DialogContent>
            <Typography paddingLeft={2}>Información del remito</Typography>
            <Grid container spacing={2} paddingTop={2} paddingLeft={2}>
                <Grid container spacing={2} padding={2}>
                    <Grid item xs>
                        <Autocomplete
                            id="outlined-select-currency"
                            options={listaDeAgencias}
                            value={nuevoRemito.agencia}
                            required
                            inputValue={nuevoRemito.agencia}
                            onInputChange={(event, newValue) => setNuevoRemito({...nuevoRemito, agencia: newValue})}
                            renderInput={(params) => <TextField {...params} label="Agencia" />}
                            />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="outlined-number" label="Numero" type="number" InputLabelProps={{
                            shrink: true,
                        }}
                        name='numero'
                        defaultValue={0}
                        value={nuevoRemito.numero}
                        onChange={e => AgregarEquipoAlRemito(e)} />
                        </Grid>
                    </Grid>
                <Grid spacing={2} container sx={{padding: 2}}>
                    <Grid item xs={5}>
                        <DatePicker 
                        label="Creado" 
                        name="createdAt" 
                        disableFuture
                        onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, createdAt: format(valor.$d, 'dd/MM/yyyy')}))}/>
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker 
                        label="Recibido" 
                        name="recivedAt" 
                        disableFuture
                        onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, recivedAt: format(valor.$d, 'dd/MM/yyyy')}))}/>
                    </Grid>
                </Grid>
            <Divider variant='middle' sx={{width: "100%", margin: 2}} />
            <Typography paddingLeft={2}>Equipos</Typography>
            <Grid container spacing={4} alignItems={'center'} justifyContent={'center'} sx={{padding: 2}}>
                <Grid item xs>
                    <TextField id="outlined-number" label="E4" type="number" InputLabelProps={{
                        shrink: true,
                    }}
                    name='e4'
                    defaultValue={0}
                    value={nuevoRemito.e4}
                    onChange={e => AgregarEquipoAlRemito(e)}
                    />
                </Grid>
                <Grid item xs>
                    <TextField id="outlined-number" label="E4T" type="number" InputLabelProps={{
                        shrink: true,
                    }}
                    name='e4T'
                    defaultValue={0}
                    value={nuevoRemito.e4T}
                    onChange={e => AgregarEquipoAlRemito(e)}
                    />
                </Grid>
                <Grid item xs>
                    <TextField id="outlined-number" name='gps' label="GPS" type="number" InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={0}
                    value={nuevoRemito.gps}
                    onChange={e => AgregarEquipoAlRemito(e)}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent={'center'} padding={2}>
                <Grid item xs>
                    <TextField id="outlined-number" label="TX860" type="number" InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={0}
                    value={nuevoRemito.tx860}
                    name='tx860'
                    onChange={e => AgregarEquipoAlRemito(e)}
                    />
                </Grid>
                <Grid item xs>
                    <TextField id="outlined-number" label="TX700" type="number" InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={0}
                    value={nuevoRemito.tx700}
                    name='tx700'
                    onChange={e => AgregarEquipoAlRemito(e)}
                    />
                </Grid>
                <Grid item xs>
                    <TextField id="outlined-number" label="TX840" type="number" InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={0}
                    value={nuevoRemito.tx840}
                    name='tx840'
                    onChange={e => AgregarEquipoAlRemito(e)}
                    />
                </Grid>
                <Grid item xs>
                    <TextField id="outlined-number" label="MRD" type="number" InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={0}
                    value={nuevoRemito.mrd}
                    name='mrd'
                    onChange={e => AgregarEquipoAlRemito(e)}
                    />
                </Grid>
                </Grid>
            <Divider variant='middle' sx={{width: "100%", margin: 2}} />
            <Typography paddingLeft={2}>Respuesta al remito</Typography>
                <Grid container spacing={2} justifyContent={'center'} padding={2}>
                    <Grid item xs={5}>
                        <DatePicker 
                        label="Compromiso" 
                        name="compromisedAt" 
                        disablePast
                        onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, compromisedAt: format(valor.$d, 'dd/MM/yyyy')}))}/>
                    </Grid>
                    <Grid item xs>
                        <TextField 
                        id="outlined-text" 
                        label="Retira" 
                        type="text" 
                        fullWidth
                        defaultValue=""
                        value={nuevoRemito.retira}
                        name='retira'
                        onChange={e => setNuevoRemito({...nuevoRemito, retira: e.target.value})}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent={'center'} padding={2}>
                    <Grid item xs={5}>
                        <TextField
                            label="Detalle"
                            select
                            id="select"
                            value={nuevoRemito.detalle}
                            fullWidth
                            inputProps={{ 'aria-label': 'Without label' }}
                            onChange={e => setNuevoRemito({...nuevoRemito, detalle: e.target.value})}
                            >
                            {detalles.map((detalle, index) => (
                                <MenuItem value={detalle} key={index}>{detalle}</MenuItem>
                                ))}

                        </TextField>
                    </Grid>
                    <Grid item xs >
                        <TextField
                            id="outlined-multiline-static"
                            label="Accesorios"
                            multiline
                            rows={3}
                            fullWidth 
                            value={nuevoRemito.accesorios}
                            placeholder='Accesorios...'
                            defaultValue=""
                            onChange={e => setNuevoRemito({...nuevoRemito, accesorios: e.target.value})}
                            />
                    </Grid> 
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Grid container justifyContent={'space-between'} padding={2}>
                <Button onClick={() => setOpen(false)} variant='outlined' size='large'>Cerrar</Button>
                <Button type='submit' variant='contained' size='large'>{nuevoRemito.id ? "Editar" : "Crear"}</Button>
            </Grid>
        </DialogActions>
    </form>
    </Dialog>
  )
}

export default InputModal