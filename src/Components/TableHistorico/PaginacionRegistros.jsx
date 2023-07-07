import { useEffect, useState } from 'react'
import { Stack, Pagination, Typography, Paper, Box } from '@mui/material'
import {getRegistrosPaginados} from '../../Utils/API/'
import TableHistorico from './TableHistorico';

const PaginacionRegistros = () => {

  const [page, setPage] = useState(1);
  const [listaRegistros, setListaRegistros] = useState([]);
  const [maxPage, setMaxPage] = useState(10);

  const llenarHistorico = (respuesta) => {
    setPage(respuesta.page)
    setPage(respuesta.pageNumber);
    setListaRegistros(respuesta.registros);
    setMaxPage(respuesta.pageMax);
  }

  useEffect(() => {
    getRegistrosPaginados(page)
      .then(respuesta => llenarHistorico(respuesta))
      .catch(e => console.log(e))
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  }

  return (
    <div>
      <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
        <Box alignContent={'center'} marginBottom={2} sx={{flex: 1, justifyContent:'flex-end'}}>
          <Stack justifyContent={'center'} spacing={2}>
            <Pagination count={maxPage} page={page} color="primary" onChange={handleChange}/>
          </Stack>
        </Box>
        <Paper sx={{ margin: 'auto', overflow: 'hidden' }}>
          <TableHistorico
            listaRegistros={listaRegistros}
          />
        </Paper>
      </Box>
    </div>
  )
}

export default PaginacionRegistros