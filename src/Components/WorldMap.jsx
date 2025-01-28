import { React , useState } from 'react';
import Exandria from '../Assets/exandria.jpg';

function WorldMap() {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
  
    const handleMouseDown = (e) => {
        e.preventDefault();
      setIsDragging(true);
      setStartPoint({ x: e.clientX - position.x, y: e.clientY - position.y });
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newX = e.clientX - startPoint.x;
      const newY = e.clientY - startPoint.y;
      setPosition({ x: newX, y: newY });
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const zoomFactor = 0.1;
        if (e.deltaY < 0) {
          setZoom(Math.min(zoom + zoomFactor, 2));
        } else {
          setZoom(Math.max(zoom - zoomFactor, 0.5));
        }
      };



    return (
        <div className="overflow-hidden h-screen w-screen" 
        onMouseMove={handleMouseMove} 
        onMouseUp={handleMouseUp} 
        onMouseLeave={handleMouseUp} 
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
        style={{
            width: "100vw",
            height: "100vh",
            overflow: "hidden", // Prevent scrollbars
            backgroundColor: "#f0f0f0",
            cursor: isDragging ? "grabbing" : "grab",
          }}>
            <div className="absolute w-full h-full" style={{ transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)` }}>
                <img src={Exandria} alt="World map" />
            </div>
        </div>
    );
}


export default WorldMap;