import { useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { Grid, Container, TextField, Divider, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { agregarRemitoALista } from '../../Utils/API';
import { ESTADOS } from '../../Utils/enums';
import { format } from 'date-fns';


const InputModal = ({ setListaRemitos, listaDeAgencias, open, setOpen}) => {
    
    const remitoVacio =
    {
    //   id: 0,
      agencia: "",
      numero: 0,
      e4: 0,
      e4T: 0,
      gps: 0,
      tx860: 0,
      tx700: 0,
      tx840: 0,
      mrd: 0,
      accesorios: "",
      createdAt: format(Date.UTC(0,0,0), 'dd/MM/yyyy'),
      recivedAt: format(Date.UTC(0,0,0), 'dd/MM/yyyy'),
      compromisedAt: format(Date.UTC(0,0,0), 'dd/MM/yyyy'),
      estado: ESTADOS.CREADO,
      detalle: "",
      retira: "",
    }
    
    const [nuevoRemito, setNuevoRemito] = useState(remitoVacio)


    const AgregarEquipoAlRemito = (evento) => {
        setNuevoRemito(()=>({
            ...nuevoRemito,
            [evento.target.name]: Number(evento.target.value)
        }))
    }

    const addRemito = () => {
        setListaRemitos((listaActual) => ([...listaActual, nuevoRemito]))
        agregarRemitoALista(nuevoRemito)
        console.log("Nuevo Remito", nuevoRemito);
        setNuevoRemito(remitoVacio)
        setOpen(false)
      }    

    function onSubmitRemit(e){
        e.preventDefault()
        addRemito()
    }

  return (
    <Dialog
    open={open}
    onClose={() => setOpen(false)}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <form onSubmit={onSubmitRemit}>
    <DialogTitle id="alert-dialog-title" >
        {"Nuevo Remito"}
    </DialogTitle>
    <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{padding: 3}}>
        <Grid container spacing={2}>
        <Container id="alert-dialog-container" >
            <Grid container >
            <Grid item xs={5}>
                <Autocomplete
                    disablePortal
                    id="outlined-select-currency"
                    options={listaDeAgencias}
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
            </Container>
        <Divider />
        <Grid item xs={2}>
            <TextField id="outlined-number" label="E4" type="number" InputLabelProps={{
            shrink: true,
            }}
            name='e4'
            defaultValue={0}
            value={nuevoRemito.e4}
            onChange={e => AgregarEquipoAlRemito(e)}
            />
        </Grid>
        <Grid item xs={2}>
            <TextField id="outlined-number" label="E4T" type="number" InputLabelProps={{
            shrink: true,
            }}
            name='e4T'
            defaultValue={0}
            value={nuevoRemito.e4T}
            onChange={e => AgregarEquipoAlRemito(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" name='gps' label="GPS" type="number" InputLabelProps={{
            shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.gps}
            onChange={e => AgregarEquipoAlRemito(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="TX860" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.tx860}
            name='tx860'
            onChange={e => AgregarEquipoAlRemito(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="TX700" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.tx700}
            name='tx700'
            onChange={e => AgregarEquipoAlRemito(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="TX840" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.tx840}
            name='tx840'
            onChange={e => AgregarEquipoAlRemito(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="MRD" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.mrd}
            name='mrd'
            onChange={e => AgregarEquipoAlRemito(e)}
            />
        </Grid>
            <Grid item sx={{width: 200}}>
                <DatePicker label="Creado" name="createdAt" onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, createdAt: format(valor.$d, 'dd/MM/yyyy')}))}/>
            </Grid>
            <Grid item sx={{width: 200}}>
                <DatePicker label="Recibido" name="recivedAt" onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, recivedAt: format(valor.$d, 'dd/MM/yyyy')}))}/>
            </Grid>
            <Grid item sx={{width: 200}}>
                <DatePicker label="Compromiso" name="compromisedAt" onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, compromisedAt: format(valor.$d, 'dd/MM/yyyy')}))}/>
            </Grid>
            <Grid item>
                <TextField 
                id="outlined-text" 
                label="Detalle" 
                type="text" 
                defaultValue=""
                sx={{width: 200}}
                value={nuevoRemito.detalle}
                name='detalle'
                onChange={e => setNuevoRemito({...nuevoRemito, detalle: e.target.value})}
                />
            </Grid>
            <Grid item>
                <TextField 
                id="outlined-text" 
                label="Retira" 
                type="text" 
                defaultValue=""
                sx={{width: 200}}
                value={nuevoRemito.retira}
                name='retira'
                onChange={e => setNuevoRemito({...nuevoRemito, retira: e.target.value})}
                />
            </Grid>
            <Grid item sx={{width: 300}} >
                <TextField
                id="outlined-multiline-static"
                label="Accesorios"
                multiline
                rows={3}
                fullWidth 
                placeholder='Accesorios...'
                defaultValue=""
                onChange={e => setNuevoRemito({...nuevoRemito, accesorios: e.target.value})}
                />
            </Grid> 
        </Grid>
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpen(false)} autoFocus>
        Cerrar
        </Button>
        <Button type='submit' variant='contained' >Crear</Button>
    </DialogActions>
    </form>
    </Dialog>
  )
}

export default InputModal