import { useState } from 'react';

const useDragAndDrop = ({ list, updater }) => {
  const [listItems, setListItems] = useState(list);
  const [isDragging, setIsDragging] = useState(false);
  const [canDragState, setCanDragState] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleUpdateList = async ({ from, to }) => {
    const prevList = listItems;
    const newList = [...listItems];
    newList[to] = listItems[from];
    newList[from] = listItems[to];
    setListItems(newList);

    const fromItem = listItems[from];
    const toItem = listItems[to];

    const success = await updater({ fromItem, toItem });

    if (!success) {
      setListItems(prevList);
    }
  };

  const canDrag = (boolean) => {
    if (typeof boolean === 'boolean') {
      setCanDragState(boolean);
      return boolean;
    }

    return canDragState;
  };

  const onDragEnd = () => {
    setIsDragging(false);
    setCanDragState(false);
  };

  const onDragStart = (e) => {
    e.stopPropagation();
    e.dataTransfer.setData('index', e.target.dataset.index);
    setIsDragging(true);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const from = e.dataTransfer.getData('index');
    const dropzone = e.target.closest('.dropzone');
    const to = dropzone.dataset.index;
    if (from !== to) {
      handleUpdateList({ from, to });
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    const { index } = e.target.dataset;
    if (index !== hoverIndex) {
      setHoverIndex(index);
    }
  };

  const onDragLeave = () => {
    if (hoverIndex !== null) {
      setHoverIndex(null);
    }
  };

  return {
    canDrag,
    handleUpdateList,
    isDragging,
    listItems,
    onDragEnd,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    setListItems,
  };
};

export default useDragAndDrop;
