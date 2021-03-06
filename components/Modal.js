import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const Container = styled.div`
  position: fixed; 
  display: flex;
  align-items: center;
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: none;
  background-color: rgb(0, 0, 0); 
  background-color: rgba(0, 0, 0, 0.4); 
`;

export const Content = styled.div`
  @media (max-width: 700px) {
    margin: auto;
    width: 100% !important;
    position: fixed;
    height: 100%;
    max-height: 800px;
    overflow: auto;
  }

  @media (max-width: 1100px) {
    width: 70%;
  }

  @media (max-width: 800px) {
    width: 80%;
  }

  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 50%; /* Could be more or less, depending on screen size */
`;

function Modal(props) {
  const [modal, setModal] = useState();

  useEffect(() => {
    setModal(document.getElementById("myModal"));
  }, []);

  window.onclick = function (event) {
    if (event.target === modal) {
      props.close();
    }
  };

  return (
    <Container id="myModal">
      <Content>{props.children}</Content>
    </Container>
  );
}

export default Modal;
