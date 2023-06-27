import {useState} from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, Container, TextField, Divider, Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InputModal = ({ setListaRemitos, listaDeAgencias, open, setOpen}) => {
    
    const remitoVacio =
    {
      id: Date.now().toString(36) + Math.random().toString(36).substring(2),
      agencia: "",
      numero: 0,
      E4: 0,
      GPS: 0,
      Tx860: 0,
      Tx700: 0,
      Tx840: 0,
      MRD: 0,
      accesorios: "",
      createdAt: Date.UTC(0,0,0),
      recivedAt: Date.UTC(0,0,0),
      estado: "creado",
    }
    
    const [nuevoRemito, setNuevoRemito] = useState(remitoVacio)

    const addEquipo = (evento) => {
        setNuevoRemito(()=>({
            ...nuevoRemito,
            [evento.target.name]: Number(evento.target.value)
        }))
    }
    const addRemito = () => {
        setListaRemitos((listaActual) => ([...listaActual, nuevoRemito]))
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
            <Grid container>
            <Grid item xs={5}>
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
            <Grid item xs={4}>
                <TextField id="outlined-number" label="Numero" type="number" InputLabelProps={{
                    shrink: true,
                }}
                name='numero'
                defaultValue={0}
                value={nuevoRemito.numero}
                onChange={e => addEquipo(e)} />
                </Grid>
            </Grid>
            </Container>
        <Divider />
        <Grid item xs={2}>
            <TextField id="outlined-number" label="E4" type="number" InputLabelProps={{
            shrink: true,
            }}
            name='E4'
            defaultValue={0}
            value={nuevoRemito.E4}
            onChange={e => addEquipo(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" name='GPS' label="GPS" type="number" InputLabelProps={{
            shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.GPS}
            onChange={e => addEquipo(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="TX860" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.Tx860}
            name='Tx860'
            onChange={e => addEquipo(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="TX700" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.Tx700}
            name='Tx700'
            onChange={e => addEquipo(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="TX840" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.Tx840}
            name='Tx840'
            onChange={e => addEquipo(e)}
            />
        </Grid>
        <Grid item>
            <TextField id="outlined-number" label="MRD" type="number" InputLabelProps={{
                shrink: true,
            }}
            defaultValue={0}
            sx={{width: 75}}
            value={nuevoRemito.MRD}
            name='MRD'
            onChange={e => addEquipo(e)}
            />
        </Grid>
            <Grid item sx={{width: 200}}>
                <DatePicker label="Creado" name="Creado" onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, createdAt: valor.$d}))}/>
            </Grid>
            <Grid item sx={{width: 200}}>
                <DatePicker label="Recibido" name="Recibido" onChange={(valor) => setNuevoRemito(() => ({...nuevoRemito, recivedAt: valor.$d}))}/>
            </Grid>
            <Grid item >
                <TextField
                id="outlined-multiline-static"
                label="Accesorios"
                multiline
                rows={3}
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
        <Button type='submit' variant='contained'>Crear</Button>
    </DialogActions>
    </form>
    </Dialog>
  )
}

export default InputModal