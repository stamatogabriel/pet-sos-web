import React, { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import Button from '../components/Button'
import Modal from '../components/Modal'
import PetAdopt from '../components/PetAdopt'

import { updateMenu } from '../store/modules/menu/actions'

const Container = styled.div`
  height: calc(100vh - 90px);

  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  justify-content: flex-start;
  align-items: center;

  width: 100%;
  max-width: 700px;

  h1 {
    font-size: 1.7rem;
    text-align: center;
    max-width: 400px;
  }

  ul {
    width: 100%;
    overflow: auto;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin: 0 10px 15px 0;
    background-color: #ccc;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: flex-start;

    div {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 0 10px;
      margin-left: 15px;
    }

    h3 {
      margin: 0 0 15px 0;
    }

    p {
      margin: 0 0 5px 0;
      line-height: 1.3rem;
    }

    img {
      height: 155px;
      width: 155px;
      object-fit: cover;
      border-radius: 10px;
    }
  }

  @media (max-width: 500px) {
    li {
      flex-direction: column;
      align-items: center;

      div {
        margin-top: 5px;
        width: 100%;
      }
    }

    img {
      margin: 5px;
    }
  }
`;

const Background = styled.div`
  flex: 1;

  background-image: url("/assets/adopt.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: initial;
`;

function Adopt({ pets }) {
  const [open, setOpen] = useState(false)
  const [pet, setPet] = useState()

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(updateMenu(false))
  }, [])

  const changeOpen = useCallback(() => {
    setOpen(false)
  }, [])

  const choosePet = useCallback((data) => {
    setPet(data)
    setOpen(true)
  }, [])

  return (
    <Container>
      <Content>
        <h1>Esses são alguns amigos que precisam de um lar</h1>
        <ul>
          {pets.length &&
            pets.map((pet) => (
              <li key={pet._id}>
                <img
                  src={pet.image ? pet.image : "/assets/pet_image.png"}
                  alt="Foto do pet"
                />
                <div>
                  <h3>{pet.type.toUpperCase()}</h3>
                  <p>
                    <strong>Nome: </strong>
                    {pet.name}
                  </p>
                  <p>
                    <strong>Idade: </strong>
                    {pet.age}
                  </p>
                  <p>
                    <strong>Observações: </strong>
                    {pet.observations}
                  </p>
                  <Button colorButton="#336455" onClick={() => choosePet(pet)}>Quero Adotar</Button>
                </div>
              </li>
            ))}
        </ul>
        {open && <Modal close={changeOpen.bind()}><PetAdopt pet={pet} close={changeOpen.bind()}/></Modal>}
      </Content>
      <Background />
    </Container>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets?adopted=false`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json()

  const { pets, totalPages } = data;

  return {
    props: {
      pets,
      totalPages,
    },
  };
}

export default Adopt;
