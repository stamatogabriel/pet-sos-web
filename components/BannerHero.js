import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 95px);
  background-image: url("/assets/hero-banner.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 250px;
    -webkit-filter: drop-shadow(5px 5px 5px #fff);
    filter: drop-shadow(5px 5px 5px #fff);
  }

  @media (min-width: 750px) {
    img {
      height: calc(100vh - 200px);
      -webkit-filter: drop-shadow(5px 5px 5px #fff);
      filter: drop-shadow(5px 5px 5px #fff);
    }
  }

`;

function BannerHero() {
  return (
    <Container>
      <img src="/assets/logo-hero.png" alt="Logo APVA" />
    </Container>
  );
}

export default BannerHero;
