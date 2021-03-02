import React, {useEffect, useState} from "react";


function App() {

  //const [municipios, setMunicipios] = useState({});
  //const [rangos, setRangos] = useState([]);

useEffect(() => {
  fetch("https://seguimiento.guanajuato.gob.mx/apiinformacionsocial/api/renapo/porcurp/pL@t_1n%7CRun$28/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("RESULT",result);
          if(result.Mensaje === "OK")
          {
            console.log("Curp valida");
          }
          else if(result.Mensaje === "La CURP no se encuentra en la base de datos")
          {
            console.log("La CURP no se encuentra en la base de datos");
          }
          else if(result.Mensaje === "El campo CURP: No cumple con el formato especificado.")
          {
            console.log("El campo CURP: No cumple con el formato especificado.");
          }
          else{
            console.log("El servicio no esta disponible.");
          }

        }

        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        /* (error) => {
          this.setState({
            isLoaded: true,
            error
          }
          )
        }*/
      ).catch((e)=>{
        console.log("e",e);
      });
  
  /* async function getMunicipios() {
    try {

      let config = {
        method: 'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'

        },
      }
      let res = await fetch('http://127.0.0.1:8000/api/getMunicipios',config);
      let data = await res.json();
      var json_parser = JSON.parse(data);
      setMunicipios(
        json_parser
      );

    } catch (error) {
      console.log("Se fue al catch");
      
    }
  }
  async function getRangos(){
    let config = {
      method: 'POST',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
      },
      body: JSON.stringify({'id':1})
    }
    try {
      let res = await fetch('http://127.0.0.1:8000/api/getRangos',config);
      let data = await res.json();
      setRangos(data);
    } catch (error) {
      console.log("Se fue al catch");
    }

  }; */

  //getMunicipios();
  //getRangos();
}, [])

  return (
    <>
      zincri
    </> 
  );
}

export default App;
