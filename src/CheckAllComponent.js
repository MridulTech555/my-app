import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CheckboxGroup } from 'rsuite';
import './App.css';

const initialDnDState = {
  draggedFrom: null,
  draggedTo: null,
  isDragging: false,
  originalOrder: [],
  updatedOrder: []
 }

function CheckAllComponent({ title, options, childRef }) {

  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [value, setValue] = useState();
  const [item, setItem] = useState(options);

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState);

  const handleCheckAll = (value, checked) => {
    const nextValue = checked ? options : [];
    console.log(nextValue, 'handleCheckAll');
    setValue(nextValue);
    setCheckAll(checked);
    setIndeterminate(false);
  }

  const handleChange = (value) => {
    console.log(value, 'handleChange');
    setValue(value);
    setCheckAll(value.length === options.length);
    setIndeterminate(value.length > 0 && value.length < options.length);
  }

 // onDragStart fires when an element
 // starts being dragged
 const onDragStart = (event) => {
  const initialPosition = Number(event.currentTarget.dataset.position);
  
  setDragAndDrop({
   ...dragAndDrop,
   draggedFrom: initialPosition,
   isDragging: true,
   originalOrder: item
  });
  
  
  // Note: this is only for Firefox.
  // Without it, the DnD won't work.
  // But we are not using it.
  event.dataTransfer.setData("text/html", '');
 }

 // onDragOver fires when an element being dragged
 // enters a droppable area.
 // In this case, any of the items on the list
 const onDragOver = (event) => {
  
  // in order for the onDrop
  // event to fire, we have
  // to cancel out this one
  event.preventDefault();
  
  let newList = dragAndDrop.originalOrder;
 
  // index of the item being dragged
  const draggedFrom = dragAndDrop.draggedFrom; 

  // index of the droppable area being hovered
  const draggedTo = Number(event.currentTarget.dataset.position); 

  const itemDragged = newList[draggedFrom];
  const remainingItems = newList.filter((item, index) => index !== draggedFrom);

   newList = [
    ...remainingItems.slice(0, draggedTo),
    itemDragged,
    ...remainingItems.slice(draggedTo)
   ];
    
  if (draggedTo !== dragAndDrop.draggedTo){
   setDragAndDrop({
    ...dragAndDrop,
    updatedOrder: newList,
    draggedTo: draggedTo
   })
  }

 }

 
 const onDrop = (event) => {
  
  setItem(dragAndDrop.updatedOrder);
  
  setDragAndDrop({
   ...dragAndDrop,
   draggedFrom: null,
   draggedTo: null,
   isDragging: false
  });
 }


 const onDragLeave = () => {
  setDragAndDrop({
  ...dragAndDrop,
  draggedTo: null
 });
 
}

    return (
      <div>
        <Checkbox
          indeterminate={indeterminate}
          checked={checkAll}
          onChange={handleCheckAll}
        >
          <b>{title}</b>
        </Checkbox>
        <CheckboxGroup inline name="checkboxList" value={value} onChange={handleChange}>
        <ul>
          { item.map( (item, index) => (
            <li
            key={index} 
            data-position={index} 
            draggable='true' 
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            
            onDragLeave={onDragLeave}
            className={`dragableList ${dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "dropArea" : ""}`}
            >
              <div><Checkbox value={item}> {item} </Checkbox></div>
              <div className="drag">=</div>
            </li>
          ))}
        </ul>
        </CheckboxGroup>
      </div>
    );

}

CheckAllComponent.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  childRef: PropTypes.object.isRequired,
};

export default CheckAllComponent;