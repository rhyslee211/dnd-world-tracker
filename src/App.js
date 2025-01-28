import logo from './logo.svg';
import './App.css';
import { useEffect, useState, React } from 'react';
import ItemInfoPanel from './Components/ItemInfoPanel';
import ItemTreeView from './Components/ItemTreeView';
import WorldMap from './Components/WorldMap';

function App() {

  const [selectedItem, setSelectedItem] = useState(null);
  

  return (
    <div>
      <WorldMap />
      <div className="ml-4 my-4 z-10 h-screen w-screen overflow-hidden bg-white flex flex-row items-center justify-center">
        <ItemTreeView />
        {selectedItem ? <ItemInfoPanel item={selectedItem} /> : null}
      </div>
    </div>
  );
}

export default App;
