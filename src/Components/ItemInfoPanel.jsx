import { React } from 'react';
import { useContext } from 'react';
import { ImCancelCircle } from "react-icons/im";
import { MyContext } from '../App';

function ItemInfoPanel({ item }) {

    const { setSelectedItem } = useContext(MyContext);

    console.log(item);

    return (
        <div className="h-full w-3/5 bg-white shadow-md border-r border-gray-200 rounded-lg pointer-events-auto relative">
            <button onClick={() => setSelectedItem(null)} className="absolute top-0 right-0 m-4"><ImCancelCircle /></button>
            {item !== null && (
                <div className="flex flex-col w-full h-full p-4">
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                </div>
            )}
        </div>
    );
}  


export default ItemInfoPanel;