import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch } from "react-redux";

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
    margin-top: 80px;
    text-align: center;
    color: #c53030;
    font-size: 2.2rem;
  }

  p {
    font-size: 1.075rem;
    text-align: center;
  }

  a {
    margin: 0 5px;
    text-decoration: underline;
  }
`;

const Background = styled.div`
  flex: 1;

  background-image: url("/assets/not-found.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function NotFound() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateMenu(false))
  }, [])

  return (
    <Container>
      <Head>
        <title>APVA - Página Não encontrada</title>
      </Head>
      <Content>
        <h1>Página não encontrada</h1>
        <p>
          Opa! A página que você está procurando talvez não exista mais. Mas não
          tem problema,
          <Link href='/'>
            <a>clique aqui</a>
          </Link>
          que você volta para a página inicial.
        </p>
      </Content>
      <Background />
    </Container>
  );
}

export default NotFound;
