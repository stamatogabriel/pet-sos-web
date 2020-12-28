import React from "react";
import styled from "styled-components";
import { shade, lighten } from "polished";

const Button = styled.button`
  padding: 10px;
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.colorButton ? props.colorButton : "#E01200"};
  color: #fff;
  font-weight: 700;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.colorButton
        ? shade(0.2, props.colorButton)
        : shade(0.2, "#E01200")};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${(props) =>
      props.colorButton
        ? lighten(0.2, props.colorButton)
        : lighten(0.2, "#E01200")};
  }
`;

function components({ children, ...rest }) {
  return <Button {...rest}>{children}</Button>;
}

export default components;
