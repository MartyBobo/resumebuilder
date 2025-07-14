import React from 'react';
import styled from 'styled-components';
import useStore from '../store/useStore';

const PropertiesPanelContainer = styled.div`
  padding: 1rem;
`;

const PropertyInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const PropertiesPanel = () => {
  const { selectedElement, updateElementContent } = useStore();

  const handleContentChange = (e) => {
    if (selectedElement) {
      updateElementContent(selectedElement.id, e.target.value);
    }
  };

  return (
    <PropertiesPanelContainer>
      <h4>Properties</h4>
      {selectedElement ? (
        <div>
          <label>Content</label>
          <PropertyInput
            type="text"
            value={selectedElement.content}
            onChange={handleContentChange}
          />
        </div>
      ) : (
        <p>Select an element to edit its properties.</p>
      )}
    </PropertiesPanelContainer>
  );
};

export default PropertiesPanel;
