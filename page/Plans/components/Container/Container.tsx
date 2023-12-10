import { Skeleton, Fieldset } from '@mantine/core';

type ContainerProps = {
  children: React.ReactNode;
  dnd: {
    onDragOver: () => void;
    onDrop: () => void;
  };
  index: number;
  showSkeleton: boolean;
  title: string;
};

const Container = ({ children, dnd, index, showSkeleton, title }: ContainerProps) => (
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
      style={{ width: '100%', height: '100%', flex: 1 }}
      variant="filled"
    >
      {children}
    </Fieldset>
  </Skeleton>
);

export default Container;
