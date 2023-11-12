import { Skeleton, Fieldset } from '@mantine/core';

const Container = ({ children, dnd, index, showSkeleton, title }) => (
  <Skeleton visible={showSkeleton} style={{ height: '100%', width: '100%', flex: 1 }}>
    <Fieldset
      className="dropzone"
      data-index={index}
      legend={title}
      onDragOver={dnd.onDragOver}
      onDrop={dnd.onDrop}
      p="0"
      pl="md"
      pr="sm"
      shadow="xs"
      style={{ width: '100%', height: '100%', flex: 1 }}
      variant="filled"
    >
      {children}
    </Fieldset>
  </Skeleton>
);

export default Container;
