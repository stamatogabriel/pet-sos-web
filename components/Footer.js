import React from "react";
import styled from "styled-components";

import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #fff;
  padding: 1.5rem;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;

  a {
    cursor: pointer;
  }
`;

const SocialWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Footer() {
  return (
    <Wrapper>
      <p>2020 APVA - Associação Protetora da Vida Animal</p>
      <SocialWrapper>
        <p>Visite nossas redes sociais: </p>
        <LogoWrapper>
          <Link href="/">
            <a>
              <SiTwitter size={28} />
            </a>
          </Link>
          <a href="https://www.facebook.com/apva.paulinia" target="__blank">
            <SiFacebook size={28} />
          </a>
          <Link href="/">
            <a>
              <SiInstagram size={28} />
            </a>
          </Link>
        </LogoWrapper>
      </SocialWrapper>
    </Wrapper>
  );
}

export default Footer;
