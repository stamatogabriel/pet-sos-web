import React, { useEffect } from "react";
import { useRouter } from 'next/router'
import { useSelector } from "react-redux";

import Sidebar from "../../components/Sidebar";

import { Container } from "../../styles/Container";

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
`;


function Dashboard() {
  const user = useSelector(state => state.user)
  const router = useRouter()

  useEffect(() => {
    if(!user.profile) {
      return router.replace('/')
    }
  }, [])

  return (
    <Wrapper>
      <Sidebar selected='dash' />
      <Container>
        Teste
      </Container>
    </Wrapper>
  );
}

export default Dashboard;
