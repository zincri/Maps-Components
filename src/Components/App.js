import React from "react";
import Municipios from '../source/Municipios.json';
import ChoropethMapV1 from './ChoropethMapV1';
import ChoropethMapV2 from './ChoropethMapV2';

const position = {
  latitude: 20.678416,
  longitude: -101.354231
};

function App() {

  return (
    <>
      <ChoropethMapV2 
        center={[position.latitude, position.longitude]} 
        data={Municipios} 
        fillColor={'#F44F3B'} 
        borderColor={'white'}>
      </ChoropethMapV2>
    </> 
  );
}

export default App;
