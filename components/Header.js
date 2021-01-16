import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import styled from "styled-components";

import { Container } from "../styles/Container";

import { FiMenu, FiX } from "react-icons/fi";

import { updateMenu } from "../store/modules/menu/actions";

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
  @media (min-width: 750px) {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      margin-left: 35px;
      font-size: 18px;
    }
  }
`;

const MobileWrapper = styled.div`
  svg {
    cursor: pointer;
  }

  @media (min-width: 750px) {
    display: none;
  }
`;

const MenuMobile = styled.div`
  width: 100%;
  margin: 0;
  background: #222;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  z-index: 10;
  position: absolute;
  opacity: 0.8;

  a {
    margin: 7px 10px;
    padding: 7px;
    font-size: 18px;
    line-height: 26px;
    color: #fff;
    font-weight: 700;
  }

  @media (min-width: 750px) {
    display: none;
  }
`;

function Header() {
  const menu = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  return (
    <>
      <HeaderWrapper>
        <Container>
          <Link href="/">
            <a>
              <img src="/assets/Logo.png" alt="Logo APVA" height="80" />
            </a>
          </Link>
          <LinkWrapper>
            <Link href="/">
              <a>Home</a>
            </Link>

            <Link href="/about">
              <a>Quem somos</a>
            </Link>

            <Link href="/adopt">
              <a>Adote um amigo</a>
            </Link>

            <Link href="/contact">
              <a>Contato</a>
            </Link>
          </LinkWrapper>
          <MobileWrapper>
            <div onClick={() => dispatch(updateMenu(!menu.open))}>
              {!menu.open ? <FiMenu size={32} /> : <FiX size={32} />}
            </div>
          </MobileWrapper>
        </Container>
      </HeaderWrapper>
      {menu.open && (
        <MenuMobile>
          <Link href="/">
            <a>Home</a>
          </Link>

          <Link href="/about">
            <a>Quem somos</a>
          </Link>

          <Link href="/adopt">
            <a>Adote um amigo</a>
          </Link>

          <Link href="/contact">
            <a>Contato</a>
          </Link>
        </MenuMobile>
      )}
    </>
  );
}

export default Header;
