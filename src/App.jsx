
import React from 'react';
import styled from 'styled-components';
import CanvasComponent from './components/CanvasComponent';
import ToolbarComponent from './components/ToolbarComponent';
import PropertiesPanel from './components/PropertiesPanel'; // Import PropertiesPanel
import useStore from './store/useStore'; // Import useStore
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: sans-serif;
`;

const ToolbarContainer = styled.div`
  width: 200px;
  border-right: 1px solid #ccc;
  padding: 1rem;
`;

const CanvasContainer = styled.main`
  flex-grow: 1;
  background-color: #f0f0f0;
  padding: 1rem;
  overflow: auto;
`;

const PropertiesContainer = styled.div`
  width: 250px;
  border-left: 1px solid #ccc;
`;

function App() {
  const selectedElement = useStore(state => state.selectedElement());

  return (
    <AppContainer>
      <ToolbarContainer>
        <ToolbarComponent />
      </ToolbarContainer>
      <CanvasContainer>
        <CanvasComponent />
      </CanvasContainer>
      <PropertiesContainer>
        <PropertiesPanel selectedElement={selectedElement} />
      </PropertiesContainer>
    </AppContainer>
  );
}

export default App;
