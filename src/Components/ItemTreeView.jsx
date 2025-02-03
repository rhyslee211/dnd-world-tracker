import { React , useState , useEffect } from 'react';
import TreeViewItem from './TreeViewItem';
import axios from 'axios';

function ItemTreeView() {

    const [treeData, setTreeData] = useState(null);
  
    // Fetch tree view data on component mount
    useEffect(() => {
      const fetchTreeData = async () => {
        try {
          const response = await axios.get('/world-tree-view'); // Make a GET request using axios
          setTreeData(response.data); // Store data in the state
        } catch (err) {
          console.error(err); // Log any errors to the console
        }
      };
  
      fetchTreeData();
    }, []); // Empty dependency array means this will only run once when the component mounts

    return (
        <div className="overflow-hidden h-full w-1/5 text-sm bg-gradient-to-b from-gray-100 to-gray-200 shadow-md flex flex-col justify-between items-start border-gray-600 overflow-hidden rounded-sm pointer-events-auto">
            <div className="w-full flex flex-col ">
              {treeData !== null && treeData.map(item => <TreeViewItem key={item.id} item={item} level={0} />)}
            </div>
            <div className="w-full flex justify-center py-3">
              <button className="w-2/3 p-2 bg-gray-300 rounded-sm hover:bg-gray-400">
                  Add Item
              </button>
            </div>
        </div>
    );
}


export default ItemTreeView;
