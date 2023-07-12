import React, { useState } from 'react'
import { Paper, Menu, MenuItem, MenuList, Typography, Tooltip, Button, ListItemText, IconButton } from '@mui/material'
import { Edit, ContentCut, Delete, MoreHoriz } from '@mui/icons-material'
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SaveIcon from '@mui/icons-material/Save';
import ListItemIcon from '@mui/material/ListItemIcon';
import { ESTADOS } from '../../../../Utils/Enums';
import { agregarRemitoAlRegistro } from '../../../../Utils/API';


const MenuDeAcciones = ({remito, setOpenModal, deleteRemit}) => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const elminarDeLaLista = registo => {
        deleteRemit(registo.id)
    }
    
    const agregarAlRegistro = async registo => {
        await agregarRemitoAlRegistro(registo);
    }

    const saveRemit = registo => {
        elminarDeLaLista(registo);
        agregarAlRegistro(registo);
    }

    return (
    <>
        <IconButton
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            variant='outlined'
        >
            <MoreHoriz/>
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
        <MenuList>
            <MenuItem onClick={() => setOpenModal(true)} >
                    <ListItemIcon>
                        <Edit/>
                    </ListItemIcon>
                    <ListItemText>
                    EDITAR
                    </ListItemText>
            </MenuItem>
            <MenuItem onClick={()=>deleteRemit(remito.id)}>
                <ListItemIcon>
                    <Delete/>
                </ListItemIcon>
                <ListItemText>
                BORRAR
                </ListItemText>
            </MenuItem>
            <MenuItem 
            onClick={()=>saveRemit(remito)} 
            disabled={remito.estado === ESTADOS.FINALIZADO ? false : true}>
                <ListItemIcon>
                    <SaveIcon/>
                </ListItemIcon>
                <ListItemText>
                Guardar
                </ListItemText>
            </MenuItem>
        </MenuList>
    </Menu>
    </>
  )
}

export default MenuDeAcciones