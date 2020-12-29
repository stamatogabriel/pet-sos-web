import React from "react";
import styled from "styled-components";

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
      height: 130px;
      width: 130px;
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
  return (
    <Container>
      <Content>
        <h1>Esses são alguns amigos que precisam de uma lar</h1>
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
                </div>
              </li>
            ))}
        </ul>
      </Content>
      <Background />
    </Container>
  );
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const pets = await response.json();

  return {
    props: {
      pets,
    },
  };
}

export default Adopt;
