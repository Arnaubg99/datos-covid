import axios from 'axios';

export const ApiService = {
   async obtenerDatos(ruta: String) 
   {
      try{
        const respuesta = await axios.get(import.meta.env.VITE_API_URL + ruta);
        return respuesta.data;
      }catch(error){
        console.log(error);
        return [];
      }
    },

    async obtenerDatosDeUnaFecha(id:number) 
    {
      try{
        const respuesta = await axios.get(import.meta.env.VITE_API_URL + `/v1/us/${id}.json`);
        return respuesta.data;
      }catch(error){
        console.log(error);
        return null;
      }
    },

    async obtenerDatosDeUnEstado(id:number, ruta:String) 
    {
      try{
        const respuesta = await axios.get(import.meta.env.VITE_API_URL + `/v1/states/${id}/${ruta}`);
        return respuesta.data;
      }catch(error){
        console.log(error);
        return null;
      }
    },

    async obtenerDatosDeUnaFechaYEstado(fechaId:number, estadoId:String) 
    {
      try{
        const respuesta = await axios.get(import.meta.env.VITE_API_URL + `/v1/states/${estadoId}/${fechaId}.json`);
        return respuesta.data;
      }catch(error){
        console.log(error);
        return null;
      }
    },
  };