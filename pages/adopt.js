import React, { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { lighten } from "polished";

import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import Button from "../components/Button";
import Modal from "../components/Modal";
import PetAdopt from "../components/PetAdopt";

import { updateMenu } from "../store/modules/menu/actions";

const Container = styled.div`
  height: calc(100vh - 90px);

  display: flex;
  align-items: stretch;
`;

const Pagination = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0 15px;
    border: 1px solid #222;
    background: transparent;
    border-radius: 50px;
    cursor: pointer;
    color: #222;
    font-size: 15px;
    line-height: 24px;
    transition: font-weight 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;

    &:hover {
      font-weight: 700;
    }

    &:disabled {
      cursor: not-allowed;
      color: ${lighten(0.2, "#222")};
      border-color: ${lighten(0.2, "#222")};
    }
  }
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

  h3 {
    text-align: center;
    max-width: 400px;
    margin: 10rem auto;
  }

  a {
    text-decoration: underline;
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

function Adopt({ pets, page, totalPages }) {
  const [open, setOpen] = useState(false);
  const [pet, setPet] = useState();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(updateMenu(false));
  }, []);

  const changeOpen = useCallback(() => {
    setOpen(false);
  }, []);

  const choosePet = useCallback((data) => {
    setPet(data);
    setOpen(true);
  }, []);

  return (
    <Container>
      <Content>
        <h1>Esses são alguns amigos que precisam de um lar</h1>
        <ul>
          {pets && pets.length ? (
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
                  <Button colorButton="#336455" onClick={() => choosePet(pet)}>
                    Quero Adotar
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <h3>
              Não temos pets disponíveis para adoção.{" "}
              <Link href="/contact">
                <a>Fale com a gente</a>
              </Link>{" "}
              para mais informações
            </h3>
          )}
        </ul>
        <Pagination>
          <button
            onClick={() => router.push(`/adopt?page=${Number(page) - 1}`)}
            disabled={Number(page) === 1 || totalPages === 1}
          >
            <FiArrowLeft style={{ marginRight: "10px" }} />
            Anterior
          </button>
          <button
            disabled={Number(page) >= totalPages}
            onClick={() => router.push(`/adopt?page=${Number(page) + 1}`)}
          >
            Proximo
            <FiArrowRight style={{ marginLeft: "10px" }} />
          </button>
        </Pagination>
        {open && (
          <Modal close={changeOpen.bind()}>
            <PetAdopt pet={pet} close={changeOpen.bind()} />
          </Modal>
        )}
      </Content>
      <Background />
    </Container>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/pets?adopted=false&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  const { pets, totalPages } = data;

  return {
    props: {
      pets,
      totalPages,
      page,
    },
  };
}

export default Adopt;
