
import React from 'react';
import GridLayout from 'react-grid-layout';
import styled, { css } from 'styled-components';
import useStore from '../store/useStore';
import Element from './Element'; // Import the Element component

const GridItem = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  ${({ isSelected }) =>
    isSelected &&
    css`
      border-color: #3498db;
      border-width: 2px;
    `}
`;

const CanvasComponent = () => {
  const { layout, elements, setLayout, selectedElementId, setSelectedElementId } = useStore();

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={50}
      width={1200}
      onLayoutChange={onLayoutChange}
    >
      {elements.map((element) => (
        <GridItem 
          key={element.id} 
          onClick={() => setSelectedElementId(element.id)}
          isSelected={element.id === selectedElementId}
        >
          <Element element={element} />
        </GridItem>
      ))}
    </GridLayout>
  );
};

export default CanvasComponent;
