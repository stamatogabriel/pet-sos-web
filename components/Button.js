import React from 'react';
import styled from 'styled-components';
import { shade, lighten } from 'polished'

const Button = styled.button`
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: #E01200;
  color: #fff;
  font-weight: 700;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${shade(0.2, '#E01200')};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${lighten(0.2, '#E01200')};
  }
`;


function components({children, ...rest}) {
  return <Button {...rest}>{children}</Button>;
}

export default components;