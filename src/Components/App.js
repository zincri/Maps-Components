import React, {useEffect, useState} from "react";
import Municipios from '../source/MunConCol.json';
import Consulta from '../source/Consulta.json';
import ChoropethMapV1 from './ChoropethMapV1';
import ChoropethMapV2 from './ChoropethMapV2';
import ChoropethMapV3 from './ChoropethMapV3';


const position = {
  latitude: 20.678416,
  longitude: -101.354231
};



function App() {

  const [mun, setMun] = useState({});
  const [flag, setFlag] = useState(false);

useEffect(() => {
  async function getMunicipios() {
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
      setMun(
        json_parser
      );
      setFlag(true);

    } catch (error) {
      console.log("Se fue al catch");
      
    }
  }
  getMunicipios();
}, [])

  return (
    <>
      <ChoropethMapV3
        center={[position.latitude, position.longitude]}
        zoom={8} 
        data={mun} 
        fillColor={'#F44F3B'} 
        borderColor={'white'}>
      </ChoropethMapV3>
    </> 
  );
}

export default App;
