import React, {useState} from "react";
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { MagicSpinner } from "react-spinners-kit";

let style_square_superior = {
    'padding': '6px 8px',
    'font': '14px/16px Arial, Helvetica, sans-serif',
    'background': 'rgba(255,255,255,0.8)',
    'boxShadow': '0 0 15px rgba(0,0,0,0.2)',
    'borderRadius': '5px',
}
let style_spinner = {
    'height': '500pt',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center'
}
let style_square_inferior_rangos = {
    'padding': '6px 8px',
    'font': '14px/16px Arial, Helvetica, sans-serif',
    /* 'background': 'white', */
    'background': 'rgba(255,255,255,0.8)',
    'boxShadow': '0 0 15px rgba(0,0,0,0.2)',
    'borderRadius': '5px',
    'textAlign': 'left',
    'lineHeight': '18px',
    'color': '#555'
}

function ChoropethMap({center, zoom, data, rangos}) {
    //let _message = 'El tipo del parametro data es requerido y debe ser de tipo .json, con estructura geometrica (geojson).';
    const _center = center? center : [20.678416, -101.354231];
    const _zoom = zoom? zoom : 12;
    const _data = data ? data : null;
    const _rangos = rangos ? rangos : [];
    const flag = Object.keys(_data).length === 0 ? false : true; 

    const [prop, setProp] = useState({'nom_mun':'','cve_mun':''});
  

    function style(feature,flag) {
        let style;
        if(flag===undefined || flag !== true){
            style = {
                fillColor: feature.properties.color,
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.5
            };
        }
        else{
            style ={
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            };

        }
        return style;
    }

    function style_rangos(color,flag) {
        let style;
        if(flag && color!==null && color!==undefined){
            style = {
                'width': '18px',
                'height': '18px',
                'float': 'left',
                'marginRight': '8px',
                'opacity': '0.7',
                'background':color
            };
        }
        else{
            style ={
                'width': '18px',
                'height': '18px',
                'float': 'left',
                'marginRight': '8px',
                'opacity': '0.7',
                'background':'#FFEDA0'
            };

        }
        return style;
    }

    const highlightFeature = (e) =>{
        //Aqui ponemos la configuracion para resaltar el Feture en donde esta el mouse.
        
        var layer = e.target;
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
        setProp({
            'nom_mun':e.target.feature.properties.nom_mun,
            'cve_mun':e.target.feature.properties.cve_mun,
            'avance_porcentual':e.target.feature.properties.avance_porcentual,
            'color':e.target.feature.properties.color,
            'avance':e.target.feature.properties.avance,
            'meta':e.target.feature.properties.meta
        });
        layer.setStyle(style(layer.feature,true));
    }

    const clickFeature = (e) =>  {
        //Aqui configuramos lo que queremos que haga un feature cuando le den click.
        alert(e.target.feature.properties.nom_mun);
    }


    const resetHighlight = (e) => {
        //Con esto reseteamos el color en donde paso el mouse, para que no siga marcado.
        var layer = e.target;
        layer.setStyle(style(e.target.feature));
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
        <GeoJSON onEachFeature={onEachFeature} style={style} key={"geojson"} data={_data}></GeoJSON>
    )

    return (
        <>
        {
            flag ?
            <Map zoom={_zoom} center={_center} style={{ width: '100%', height: '100vh'}}>
                
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <div className="leaflet-control-container">
                <div className="leaflet-top leaflet-right">
                    <div className="leaflet-control" style={style_square_superior}>
                            <h4>INFORMACION:</h4>
                            {(prop.nom_mun !== '') ?
                            <>
                            <b>Nombre: {prop.nom_mun }</b><br></br>
                            <b>Clave de Municipio: {prop.cve_mun}</b><br></br>
                            <b>Avance: {prop.avance}</b><br></br>
                            <b>Meta: {prop.meta}</b><br></br>
                            <b>Avance Porcentual de Meta:{prop.avance_porcentual} %</b><br></br>   
                            </>
                            : <b> Pase el mouse sobre un estado</b> }
                    </div>
                </div>
                </div>

                <div className="leaflet-control-container">
                <div className="leaflet-bottom leaflet-right">
                    <div className="legend leaflet-control" style={style_square_inferior_rangos}>
                            <h4>Informacion de Rangos:</h4>
                            {(_rangos !== null && _rangos.length !== 0) ?
                            <>
                            {
                            _rangos.map(rango => {
                                return <div key={(rango.id).toString()}><i  style={style_rangos(rango.Color,true)}></i><b>{rango.RangoA+" "+rango.RangoB }</b><br></br></div>
                            })
                            } 
                            </>
                            : <b> Pase el mouse sobre un estado</b> }
                    </div>
                </div>
                </div>
                {geojson}
            </Map>
            : 
            
            <div style={style_spinner}>
            <MagicSpinner size={70} color={"#008000"} loading={true}></MagicSpinner>
            </div>
        }
        </> 
    );
}

export default ChoropethMap;