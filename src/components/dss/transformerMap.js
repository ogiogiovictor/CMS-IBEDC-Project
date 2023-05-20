import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Map, {Marker, Popup} from 'react-map-gl';

const TransformerMap = () => {
    const { dss, dssData } = useSelector((state) => state.dss) || [];

    const [ viewport, setViewport ] = useState({
        latitude: 7.417503, 
        longitude: 3.856384,
        width: '100vw',
        height: '100vh',
        zoom: 11
    });

    const [selectedAsset, setSelectedAsset] = useState(null);

    useEffect(() => {
        const listener = (e) => {
           if(e.key === "Escape"){
            selectedAsset(null)
           }
        };
        window.addEventListener("keydown", listener);
        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, []);

    console.log(dss?.data?.allDt?.data);


    return (
        <div className="mapScale">
            <Map {...viewport} 
             mapStyle="mapbox://styles/ogiogio/clhuws11b007s01pn9h8h89za"
             onMove={evt => setViewport(evt.viewport)}
             dragPan={true} // Enable map dragging
             mapboxAccessToken="pk.eyJ1Ijoib2dpb2dpbyIsImEiOiJjbGh1dWp2aW8wM2kwM3BsczB5c28zanVyIn0.fIQXFtSqKCsLrKkAAqoAgA" > 
            
            {dss?.data?.allDt?.data.map((asset) => {

                const latitude = parseFloat(asset.latitude);
                const longitude = parseFloat(asset.longitude);

                <Marker key={asset.Assetid} 
                latitude={latitude}
                 longitude={longitude}>
                    <button className="marker-btn" onClick={(e) => {
                        e.preventDefault();
                        setSelectedAsset(asset);
                    } }>
                        <img src="/map-marker-svgrepo-com.svg" alt="Marker" />
                       
                    </button>
                </Marker>
            })}
           
           {selectedAsset ? (
            <Popup latitude={parseFloat(selectedAsset.latitude)} 
            longitude={parseFloat(selectedAsset.longitude)}
            onClose={() => {
                setSelectedAsset(null)
            }}
            >
            <div>
                <h2>{selectedAsset.Assetid}</h2><hr/>
                <div>{selectedAsset.DSS_11KV_415V_Name }</div>
                <div>{selectedAsset.DSS_11KV_415V_Address }</div>
                <div>{selectedAsset.DSS_11KV_415V_Owner }</div>
            </div>
            </Popup>
           ) : null}
            </Map>
           
        </div>
    )

}

export default TransformerMap;