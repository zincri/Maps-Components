import React from "react";
import Municipios from '../source/Municipios.json';
import ChoropethMap from './ChoropethMap';

const position = {
  latitude: 20.678416,
  longitude: -101.354231
};

function App() {

  return (
    <>
      <ChoropethMap 
        center={[position.latitude, position.longitude]} 
        data={Municipios} 
        fillColor={'#F44F3B'} 
        borderColor={'white'}>
      </ChoropethMap>
    </> 
  );
}

export default App;
