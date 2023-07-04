import { useState } from 'react'
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';
import Content from './Content';
import Box from '@mui/material/Box';
import { ESTADOS } from '../../Utils/enums';

function TabPanel({children, value, index}){
    return <div hidden={value !== index} id={value}>
        {value === index && (
            children
        )}
    </div>
}

const TabsBitacora = () => {
    const [ tab ,setTab] = useState(0);

    const handleTabChange = (evento, nuevoValor) => {
        setTab(nuevoValor);
    }

    return (
    <div>
        <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
        <Tabs value={tab} textColor="inherit" onChange={handleTabChange}>
          <Tab label="Diario" value={0}/>
          <Tab label="Termiando" value={1}/>
          <Tab label="Mañana" value={2}/>
        </Tabs>

        <TabPanel value={tab} index={0}>
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                <Content
                filtro={ESTADOS.EN_PROCESO}
                fecha={Date.now.toString()}
                />
            </Box>
        </TabPanel>
        <TabPanel value={tab} index={1}>
            <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
                <Content
                filtro={ESTADOS.FINALIZADO}
                fecha={Date.now.toString()}
                />
            </Box>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          Item Three
        </TabPanel>
      </AppBar>
    </div>
  )
}

export default TabsBitacora

TabPanel.propTypes = {
    children: PropTypes.element, 
    value: PropTypes.number, 
    index: PropTypes.number
};