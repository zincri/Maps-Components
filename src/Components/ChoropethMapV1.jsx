import React from "react";
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';

function ChoropethMap({center, data, fillColor, borderColor}) {
    let _message = 'El tipo del parametro data es requerido y debe ser de tipo .json, con estructura geometrica (geojson).';
    const _center = center? center : [20.678416, -101.354231];
    const _data = data ? data : null;
    const _fillColor = fillColor? fillColor : '#F28F3B';
    const _borderColor = borderColor? borderColor : 'White';

    const style = {
        fillColor: _fillColor,
        weight: 2,
        opacity: 1,
        color: _borderColor,
        dashArray: '3',
        fillOpacity: 0.5
    }

    const highlightFeature = (e) =>{
        //Aqui ponemos la configuracion para resaltar el Feture en donde esta el mouse.
        var layer = e.target;
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    const clickFeature = (e) =>  {
        //Aqui configuramos lo que queremos que haga un feature cuando le den click.
        alert(e.target.feature.properties.nom_mun);
    }

    const resetHighlight = (e) => {
        //Con esto reseteamos el color en donde paso el mouse, para que no siga marcado.
        var layer = e.target;
        layer.setStyle(style);
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    const onEachFeature = (feature, layer) => {
        //Organizamos los eventos del GeoJson.
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: clickFeature
        });
    }

    var geojson = (
        <GeoJSON onEachFeature={onEachFeature} style={style} key={"1"} data={_data}></GeoJSON>
    )

    return (
        <>
        {
            _data ?
            <Map zoom={12} center={_center} style={{ width: '100%', height: '100vh'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {geojson}
            </Map>
            : <h1>{_message}</h1>
        }
        </> 
    );
}

export default ChoropethMap;
