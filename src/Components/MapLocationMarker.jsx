import { React , useContext } from 'react';
import { MyContext } from '../App';

function MapLocationMarker({ location, locationItem }) {

    const { setSelectedItem } = useContext(MyContext);

    return (
        <button className="absolute bg-red-500 w-4 h-4 rounded-full" onClick={()=>{setSelectedItem(locationItem)}} style={{ top: `${location.y}px`, left: `${location.x}px` }}></button>
    );
}


export default MapLocationMarker;