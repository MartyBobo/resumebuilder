import React from 'react';
import styled from 'styled-components';

const TextElement = styled.div`
  font-size: 1rem;
  color: #333;
`;

const HeaderElement = styled.h2`
  font-size: 1.5rem;
  color: #222;
  margin: 0;
`;

const Element = ({ element }) => {
  switch (element.type) {
    case 'text':
      return <TextElement>{element.content}</TextElement>;
    case 'header':
      return <HeaderElement>{element.content}</HeaderElement>;
    // Add cases for 'image' and 'icon' later
    default:
      return <TextElement>{element.content}</TextElement>;
  }
};

export default Element;
