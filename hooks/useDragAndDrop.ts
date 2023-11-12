import { useState } from 'react';

const useDragAndDrop = ({ list, updater }) => {
  const [items, setItems] = useState(list);
  const [isDragging, setIsDragging] = useState(false);
  const [canDragState, setCanDragState] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleUpdateList = async ({ from, to }) => {
    const prevList = items;
    const newList = [...items];
    newList[to] = items[from];
    newList[from] = items[to];
    setItems(newList);

    const fromItem = items[from];
    const toItem = items[to];

    const success = await updater({ from: fromItem, to: toItem });

    if (!success) {
      setItems(prevList);
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
    items,
    onDragEnd,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    setItems,
  };
};

export default useDragAndDrop;
