import { React , useState , useEffect , useContext } from 'react';
import { MyContext } from '../App';

function TreeViewItem({ item , level , isShown=true }) {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [isPeopleOpen, setIsPeopleOpen] = useState(false);
    const [isMonstersOpen, setIsMonstersOpen] = useState(false);
    const [isEventsOpen, setIsEventsOpen] = useState(false);
    const [isItemsOpen, setIsItemsOpen] = useState(false);
    

    const hasLocations = Array.isArray(item.children) && item.children.length > 0;
    const hasPeople = Array.isArray(item.people) && item.people.length > 0;
    const hasMonsters = Array.isArray(item.monsters) && item.monsters.length > 0;
    const hasEvents = Array.isArray(item.events) && item.events.length > 0;
    const hasItems = Array.isArray(item.items) && item.items.length > 0;

    const hasChildren = hasLocations || hasPeople || hasMonsters || hasEvents || hasItems;

    const { setSelectedItem } = useContext(MyContext);

    if(!isShown) return null;

    return (
        <div className="flex flex-col w-full items-start">
            <button onClick={() => {setSelectedItem(item)}} className={`flex w-full items-center justify-between bg-gradient-to-b from-gray-100 to-gray-300 p-1 rounded-sm border border-gray-600 w-full hover:from-gray-300 hover:to-gray-400`}>
                <div className="w-full items-start flex" style={{ marginLeft: `${level * 8}px` }}>{item.name}</div>
                {hasChildren && <button className="px-1" onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen);}}>{isOpen ? '-' : '+'}</button>}
            </button>

            {/* Display Locations as a folder */}
            {hasLocations && isOpen && (
                <>
                    <button onClick={() => {setIsLocationOpen(!isLocationOpen)}} className={`flex w-full items-center justify-between bg-gradient-to-b from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 p-1 rounded-sm border border-gray-600 w-full`}>
                        <div className="w-full items-start flex" style={{ marginLeft: `${(level + 1) * 8}px` }}>Locations</div>
                        {hasChildren && <div className="px-1">{isLocationOpen ? '-' : '+'}</div>}
                    </button>
                    {isLocationOpen && item.children.map(child => (
                        <TreeViewItem key={child.id} item={child} level={level + 2} isShown={isOpen} />
                    ))}
                </>
            )}

            {/* Display People as a folder */}
            {hasPeople && isOpen && (
                <>
                    <button onClick={() => {setIsPeopleOpen(!isPeopleOpen)}} className={`flex w-full items-center justify-between bg-gradient-to-b from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 p-1 rounded-sm border border-gray-600 w-full`}>
                        <div className="w-full items-start flex" style={{ marginLeft: `${(level + 1) * 8}px` }}>People</div>
                        {hasChildren && <div className="px-1">{isPeopleOpen ? '-' : '+'}</div>}
                    </button>
                    {isPeopleOpen && item.people.map(child => (
                        <TreeViewItem key={child.id} item={child} level={level + 2} isShown={isOpen} />
                    ))}
                </>
            )}

            {/* Display Monsters as a folder */}
            {hasMonsters && isOpen && (
                <>
                    <button onClick={() => {setIsMonstersOpen(!isMonstersOpen)}} className={`flex w-full items-center justify-between bg-gradient-to-b from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 p-1 rounded-sm border border-gray-600 w-full`}>
                        <div className="w-full items-start flex" style={{ marginLeft: `${(level + 1) * 8}px` }}>Monsters</div>
                        {hasChildren && <div className="px-1">{isMonstersOpen ? '-' : '+'}</div>}
                    </button>
                    {isMonstersOpen && item.monsters.map(child => (
                        <TreeViewItem key={child.id} item={child} level={level + 2} isShown={isOpen} />
                    ))}
                </>
            )}

            {/* Display Events as a folder */}
            {hasEvents && isOpen && (
                <>
                    <button onClick={() => {setIsEventsOpen(!isEventsOpen)}} className={`flex w-full items-center justify-between bg-gradient-to-b from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 p-1 rounded-sm border border-gray-600 w-full`}>
                        <div className="w-full items-start flex" style={{ marginLeft: `${(level + 1) * 8}px` }}>Events</div>
                        {hasChildren && <div className="px-1">{isEventsOpen ? '-' : '+'}</div>}
                    </button>
                    {isEventsOpen && item.events.map(child => (
                        <TreeViewItem key={child.id} item={child} level={level + 2} isShown={isOpen} />
                    ))}
                </>
            )}

            {/* Display Items as a folder */}
            {hasItems && isOpen && (
                <>
                    <button onClick={() => {setIsItemsOpen(!isItemsOpen)}} className={`flex w-full items-center justify-between bg-gradient-to-b from-white to-gray-200 hover:from-gray-200 hover:to-gray-300 p-1 rounded-sm border border-gray-600 w-full`}>
                        <div className="w-full items-start flex" style={{ marginLeft: `${(level + 1) * 8}px` }}>Items</div>
                        {hasChildren && <div className="px-1">{isItemsOpen ? '-' : '+'}</div>}
                    </button>
                    {isItemsOpen && item.items.map(child => (
                        <TreeViewItem key={child.id} item={child} level={level + 2} isShown={isOpen} />
                    ))}
                </>
            )}

        </div>
    );
}

export default TreeViewItem;