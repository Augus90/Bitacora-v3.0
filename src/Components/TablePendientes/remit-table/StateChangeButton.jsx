import React from 'react'
import { Chip, Menu, MenuItem } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { ESTADOS } from '../../../Utils/Enums';
import { editarRemitoDeLista } from '../../../Utils/API';

const StateChangeButton = ({remito, setListaRemitos}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const cambiarEstado = (remito, estadoNuevo) =>{
        const remitoEditado = {...remito, estado: estadoNuevo}
        console.log("Estado Viejo", remitoEditado);
        editarRemitoDeLista(remitoEditado)
            .then(response => console.log(response))
            .catch(e => console.error(e));
        // Crea una lista con el estado actual, lo mapea en 'r', verifico si el id correpornde al id a modificar, lo edito, sino devuelvo el mismo remito del map
        setListaRemitos(lista => lista.map(r => r.id === remito.id ? {...r, estado: estadoNuevo} : r));
    }
    const handleChangeState = (id, estadoNuevo) => {
        cambiarEstado(id, estadoNuevo);
        setAnchorEl(null);
    };

  return (
    <div>
        <Chip 
            label={remito.estado}
            variant="outlined" 
            color="primary" 
            size='medium'
            icon={<ArrowDropDownIcon/>}
            onClick={handleClick} />
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        >
        <MenuItem onClick={() => handleChangeState(remito,ESTADOS.CREADO)}>{ESTADOS.CREADO}</MenuItem>
        <MenuItem onClick={() => handleChangeState(remito,ESTADOS.EN_PROCESO)}>{ESTADOS.EN_PROCESO}</MenuItem>
        <MenuItem onClick={() => handleChangeState(remito,ESTADOS.A_DETERMINAR)}>{ESTADOS.A_DETERMINAR}</MenuItem>
        <MenuItem onClick={() => handleChangeState(remito,ESTADOS.FINALIZADO)}>{ESTADOS.FINALIZADO}</MenuItem>
      </Menu>
    </div>
  )
}

export default StateChangeButton