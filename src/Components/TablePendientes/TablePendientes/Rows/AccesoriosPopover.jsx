import { useState } from 'react'
import { Button, Popover, Box } from '@mui/material'

export const AccesoriosPopover = ({accesorios}) => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [openPopover, setOpenPopover] = useState(false);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    
    const tieneAccesorios = accesorios.length > 0 ? "ACC" : "";

    const handleClickPopover = (event) => {
      setAnchorEl( event.target );
      console.log(event.target);
      setOpenPopover(!openPopover);
    };


  return (
    <div>
        <Button
            aria-describedby={id}
            id={id}
            component="button"
            onClick={(e) => handleClickPopover(e)}>
            {tieneAccesorios}
        </Button>
        <Popover 
            id={id} 
            open={openPopover} 
            anchorEl={anchorEl} 
            onClose={() => setOpenPopover(!openPopover)}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
        >
            <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                {accesorios}
            </Box>
        </Popover> 
    </div>
  )
}
