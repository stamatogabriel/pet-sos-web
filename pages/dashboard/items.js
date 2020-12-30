import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Sidebar from "../../components/Sidebar";

import { Container } from "../../styles/Container";

import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
`;

export const CustomContainer = styled(Container)`
  align-items: center;
  justify-content: center;
`;

function Items() {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.profile) {
      return router.replace("/");
    }
  }, []);

  return (
    <Wrapper>
      <Sidebar selected="items" />
      <CustomContainer>
        <h1>Em breve</h1>
      </CustomContainer>
    </Wrapper>
  );
}

export default Items;
