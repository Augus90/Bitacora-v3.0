import axios from 'axios'

// const baseURL = "http://10.173.5.33:5265/api/"
const baseURL = "http://localhost:5265/api/"

export const getAgencias = async () => {
    let respuesta = null;

    await axios.get(`${baseURL}Agencias`)
      .then(response => respuesta = response.data)
      .catch(error => console.log(error))
    
      return respuesta;
  }

export const getListaRemitos = async () => {
    const respuesta = await axios.get(`${baseURL}ListadoRemitos`)
      // .then(response =>   response.data)
      .catch(error => console.log(error))

    return respuesta.data;
  }

export const agregarRemitoALista = (nuevoRemito) =>{
    console.log("nuevo remito",nuevoRemito);
    axios.post(`${baseURL}ListadoRemitos`, nuevoRemito)
        .then((response) => console.log("Respuesta de post ",response.data))
        .catch(error => console.log(error))
}

export const borrarRemitoDeLista = async (idRemito) => {
    await axios.delete(`${baseURL}ListadoRemitos/${idRemito}`)
        .then((response) => console.log("Respuesta de delete ",response.data))
        .catch(error => console.log("error", error))
    }
  
export const editarRemitoDeLista = async (nuevoEditado) =>{
  console.log("remito editado",nuevoEditado);
  const respuesta = await axios.put(`${baseURL}ListadoRemitos`, nuevoEditado)
      // .then((response) => respuesta = response.data)
      .catch(error => console.log(error))
  return respuesta.data;
}

export const getRegistrosPaginados = async (pagina) => {
  const respuesta = await axios.get(`${baseURL}Registro/${pagina}`)
    // .then(response => respuesta = response.data)
    .catch(error => console.log(error))
  
    return respuesta.data;
}