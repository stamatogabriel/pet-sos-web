import React, { useEffect } from "react";

import { useDispatch } from "react-redux";
import { updateMenu } from "../store/modules/menu/actions";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  width: 100%;
  max-width: 1300px;
  min-height: calc(100vh - 90px);
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  justify-content: flex-start;

  div {
    display: flex;
    width: 100%;
  }

  h1 {
    line-height: 2rem;
    font-size: 2rem;
    margin-bottom: 30px;
  }

  h2 {
    line-height: 1.8rem;
  }

  p {
    font-size: 1rem;
    line-height: 1.4rem;
  }

  img {
    height: 200px;
    border-radius: 10px;
    border: 3px solid #222;
  }

  @media (max-width: 700px) {
    div {
      flex-direction: column;
    }

    img {
      height: 150px;
      width: 250px;
      margin: 15px auto !important;
    }
  }
`;

const Content = styled(Wrapper)`
  margin: 0;
`;

function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateMenu(false));
  }, []);

  return (
    <Container>
      <Wrapper>
        <h1>Quem somos?</h1>
        <Content>
          <h2>Nosso Objetivo</h2>
          <div>
            <p>
              Defesa do meio ambiente urbano, através da educação, assistência,
              fiscalização e promoção da ética, em conjunto com o Poder Público,
              Instituições Privadas e Comunidade visando oferecer melhores
              condições de vida aos animais abandonados ou não.
            </p>
            <img src="/assets/about-city.jpg" style={{ marginLeft: "50px" }} />
          </div>
        </Content>
        <Content>
          <h2>Nossa história</h2>
          <div>
            <img src="/assets/Logo.png" style={{ marginRight: "50px" }} />
            <div style={{ flexDirection: 'column' }}>
              <p>
                Nossos fundadores sempre buscaram trabalhar em prol da defesa
                animal, mas tinham a ânsia de fazer algo diferente. Algo que
                realmente ajudasse os animais e o meio ambiente e desse um
                tratamento e uma lar digno aos animais.
              </p>
              <p>
                Após várias batalhas burocráticas, e com muito esforço, empenho
                e carinho aos animais nasceu em fevereiro de 2012 a APVA, onde
                desde a primeira reunião visamos o bem estar animal e defesa do
                meio ambiente da cidade de Paulínia / SP.
              </p>
            </div>
          </div>
        </Content>
      </Wrapper>
    </Container>
  );
}

export default Index;
