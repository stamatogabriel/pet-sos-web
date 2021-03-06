import React from "react";
import styled from "styled-components";

import { SiFacebook, SiInstagram, SiTwitter } from "react-icons/si";
import Link from "next/link";

import { Container } from "../styles/Container";

const Wrapper = styled.div`
  display: flex;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #fff;
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

const CustomContainer = styled(Container)`
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <CustomContainer>
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
      </CustomContainer>
    </Wrapper>
  );
}

export default Footer;
