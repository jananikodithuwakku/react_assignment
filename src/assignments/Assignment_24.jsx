import { useState, useRef } from "react";
import "./Assignment_24.css";

export default function Assignment_24() {
  // store index of dragged and target item  
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  //initial image list
  const [items, setItems] = useState([
    "https://i.pinimg.com/736x/2d/a9/c4/2da9c4f0d49127e870ba28f8db2c848c.jpg",
    "https://i.pinimg.com/736x/d5/ca/3a/d5ca3ade655af2547a3c7d3660702cf7.jpg",
    "https://i.pinimg.com/736x/a8/da/44/a8da447c5cea0c0e9c30c6308795a2cf.jpg",
    "https://i.pinimg.com/736x/7a/68/e3/7a68e3afb07d72b4086136f3af9a7d1a.jpg",
  ]);

  // when drag starts - remember the item index
  const handleDragStart = (index) => {
    dragItem.current = index;
  };

  // when dragged over another - remember target index
  const handleDragEnter = (index) => {
    dragOverItem.current = index;
  };

  //on drop = reorder list
  const handleDrop = () => {
    const copyListItem = [...items];
    const dragItemContent = copyListItem[dragItem.current];

    copyListItem.splice(dragItem.current, 1);  // remove dragged item
    copyListItem.splice(dragOverItem.current, 0, dragItemContent); // insert at new position

    // reset refs
    dragItem.current = null;
    dragOverItem.current = null;

    setItems(copyListItem);
  };

  return (
    <div className="container">
      <h2>Drag and Drop Pictures</h2>
      {items.map((item, index) => (
        <div
          key={index}
          className="box"
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDrop}
        >
          <img src={item} alt={`pic-${index}`} className="image" />
        </div>
      ))}
    </div>
  );
}
