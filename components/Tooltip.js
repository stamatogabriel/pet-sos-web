import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  cursor: pointer;

  span {
    background: #040461;
    border-radius: 4px;
    padding: 6px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 8px);
    width: 160px;
    left: 15%;
    transform: translateX(-50%);
    color: #fff;

    &::before {
      border-style: solid;
      border-color: #040461 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      content: "";
      top: 100%;
      position: absolute;
      left: 50%;
    }
  }

  &:hover span {
    visibility: visible;
    opacity: 1;
  }
`;

function Tooltip({ title, children = "", className }) {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
}

export default Tooltip;
