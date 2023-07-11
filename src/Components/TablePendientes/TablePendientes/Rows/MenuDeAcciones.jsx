import React, { useState } from 'react'
import { Paper, Menu, MenuItem, MenuList, Typography, Tooltip, Button, ListItemText, IconButton } from '@mui/material'
import { Edit, ContentCut, Delete, MoreHoriz } from '@mui/icons-material'
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SaveIcon from '@mui/icons-material/Save';
import ListItemIcon from '@mui/material/ListItemIcon';


const MenuDeAcciones = ({action}) => {
    
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                {/* <Tooltip title="Editar"> */}
                    <ListItemIcon>
                        <Edit/>
                    </ListItemIcon>
                    <ListItemText>
                    EDITAR
                    </ListItemText>
                {/* </Tooltip> */}
            </MenuItem>
            <MenuItem onClick={()=>deleteRemit(remito.id)}>
                {/* <Tooltip title="Borrar"> */}
                <ListItemIcon>
                    <Delete/>
                </ListItemIcon>
                <ListItemText>
                BORRAR
                </ListItemText>
                {/* </Tooltip> */}
            </MenuItem>
            <MenuItem onClick={()=>saveRemit(remito.id)} disabled>
                {/* <Tooltip title="Borrar"> */}
                <ListItemIcon>
                    <SaveIcon/>
                </ListItemIcon>
                <ListItemText>
                Guardar
                </ListItemText>
                {/* </Tooltip> */}
            </MenuItem>
        </MenuList>
    </Menu>
    </>
  )
}

export default MenuDeAcciones