import logo from './logo.svg';
import './App.css';
import { useEffect, useState, React , createContext } from 'react';
import ItemInfoPanel from './Components/ItemInfoPanel';
import ItemTreeView from './Components/ItemTreeView';
import WorldMap from './Components/WorldMap';

/*

item object structure:

{
  itemId: 1,
  itemType: "continent"
  itemInfo: {
    name: "Septgloria",
    population: 2500000,
    ruler: "King Reginald",
    capital: "Aurora",
    currency: "Sept",
    description: "A continent of magic and mystery, Septgloria is home to many different peoples and cultures."
  },
  
}


*/

// Create a context
export const MyContext = createContext();


function App() {

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <MyContext.Provider value={{ setSelectedItem }}>
      <div className="font-sans">
        <div className="h-fit w-fit overflow-hidden bg-gray-300 flex items-center justify-center absolute top-0 left-0 bg-gradient-to-b from-gray-200 to-gray-400">
          <WorldMap />
        </div>  
        <div className="relative p-4 z-10 h-screen w-screen overflow-hidden flex flex-row items-center justify-between pointer-events-none">
          <ItemTreeView />
          {selectedItem ? <ItemInfoPanel item={selectedItem} /> : null}
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
