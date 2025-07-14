
import React from 'react';
import styled from 'styled-components';
import useStore from '../store/useStore';

const ToolbarButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ToolbarComponent = () => {
  const addElement = useStore((state) => state.addElement);

  return (
    <div>
      <h4>Elements</h4>
      <ToolbarButton onClick={() => addElement('text')}>Add Text</ToolbarButton>
      <ToolbarButton onClick={() => addElement('header')}>Add Header</ToolbarButton>
    </div>
  );
};

export default ToolbarComponent;
