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

  div {
    display: flex;
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
            <img src="/assets/about-city.jpg" style={{marginLeft: '50px'}}/>
          </div>
        </Content>
        <Content>
          <h2>Nossa história</h2>
          <div>
            <img src="/assets/about-city.jpg" style={{marginRight: '50px'}}/>
            <p>
              Defesa do meio ambiente urbano, através da educação, assistência,
              fiscalização e promoção da ética, em conjunto com o Poder Público,
              Instituições Privadas e Comunidade visando oferecer melhores
              condições de vida aos animais abandonados ou não.
            </p>
          </div>
        </Content>
      </Wrapper>
    </Container>
  );
}

export default Index;
