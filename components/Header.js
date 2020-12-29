import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Container } from "../styles/Container";

const HeaderWrapper = styled.header`
  top: 0;
  margin: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 95px;
`;

const LinkWrapper = styled.div`
  display: none;
  @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      margin-left: 35px;
      font-size: 18px;
    }
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <Container>
        <img src="/assets/Logo.png" alt="Logo APVA" height="80" />
        <LinkWrapper>
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/">
            <a>Quem somos</a>
          </Link>

          <Link href="/">
            <a>Adote um amigo</a>
          </Link>

          <Link href="/contact">
            <a>Contato</a>
          </Link>
        </LinkWrapper>
      </Container>
    </HeaderWrapper>
  );
}

export default Header;
