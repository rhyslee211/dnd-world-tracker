import { React , useState , useEffect } from 'react';
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
        <div className="h-full w-1/5 bg-white flex items-center justify-center bg-white border-r border-gray-200 rounded-lg w-1/5 pointer-events-auto">
            The tree view
            {treeData !== null && <pre>{JSON.stringify(treeData, null, 2)}</pre>}
        </div>
    );
}


export default ItemTreeView;
