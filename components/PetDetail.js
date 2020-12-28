import React, { useCallback } from "react";
import { format } from "date-fns";
import { FiX } from "react-icons/fi";

import styled from "styled-components";

import Button from "../components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    margin: 10px 10px 10px auto;
    cursor: pointer;
    transition: color 0.5s;

    &:hover {
      color: #aaa;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 100%;

  img {
    margin: 30px auto;
    width: 200px;
    height: 200px;
  }

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1.3fr 0.5fr;
  }
`;

const ImageWrapper = styled.div`
  width: 250px;
  height: 250px;
  padding: 1rem;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  border-radius: 10px;

  img {
    margin: 30px auto;
    width: 200px;
    height: 200px;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0 15px 0 0;
  padding: 0 15px 0 0;

  li {
    font-size: 1rem;
    line-height: 1.5rem;

    display: flex;
    align-items: flex-start;
  }

  strong {
    margin-right: 0.4rem;
  }
`;

function PetDetail({ pet, token, ...rest }) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const updatePet = useCallback(async () => {
    try {

      const response = await fetch(`http://localhost:3000/pets/${pet._id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({adopted: true}),
      });

      const res = await response.json();

      rest.close();
    } catch (err) {
      if (err.inner) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);


  return (
    <Wrapper>
      <FiX size={25} onClick={rest.close} />
      <Container>
        <div>
          <h1>{pet.name}</h1>
          <List>
            <li>
              <strong>Idade:</strong>
              {pet.age}
            </li>
            <li>
              <strong>Encontrado em:</strong>
              {format(new Date(pet.foundIn), "dd/mm/yyyy")}
            </li>
            <li>
              <strong>Tipo:</strong>
              {pet.type}
            </li>
            <li>
              <strong>Adotado:</strong>
              {pet.adopted ? "Sim" : "Não"}
            </li>
            <li>
              <strong>Observações:</strong>
              {pet.observations}
            </li>
            <Button colorButton="#336455" disabled={pet.adopted} onClick={updatePet}>
              {pet.adopted ? "Pet já adotado" : "Adotaram o pet?"}
            </Button>
          </List>
        </div>
        <div>
          <ImageWrapper>
            <img
              src={pet.image ? pet.image : "/assets/pet_image.png"}
              alt="Foto do pet"
            />
          </ImageWrapper>
        </div>
      </Container>
    </Wrapper>
  );
}

export default PetDetail;
