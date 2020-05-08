import React, {useEffect, useState} from "react";
import ChoropethMapV3 from './ChoropethMapV3';


const position = {
  latitude: 20.678416,
  longitude: -101.354231
};



function App() {

  const [municipios, setMunicipios] = useState({});
  const [rangos, setRangos] = useState([]);

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

  };

  getMunicipios();
  getRangos();
}, [])

  return (
    <>
      <ChoropethMapV3
        key={"ChoropethMapV3"}
        center={[position.latitude, position.longitude]}
        zoom={8} 
        data={municipios}
        rangos={rangos}
        fillColor={'#F44F3B'} 
        borderColor={'white'}>
      </ChoropethMapV3>
    </> 
  );
}

export default App;
