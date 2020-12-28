import React from "react";
import Link from "next/link";
import {
  FiUsers,
  FiUser,
  FiGithub,
  FiShoppingCart,
  FiGrid,
} from "react-icons/fi";
import styled, { css } from "styled-components";

export const Side = styled.div`
  background: #ccc;
  width: 20%;
  height: calc(100vh - 90px);
  min-width: 200px;
  margin: 0;

  ul {
    width: 100%;
    list-style: none;
    padding: 10px;
  }

  a {
    margin-left: 15px;
    font-size: 0.95rem;

    &:hover {
      color: #000;
    }
  }
`;

const Item = styled.li`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 10px;
  color: #555;

  ${(props) =>
    props.item &&
    css`
      background: #bbb;
      color: #000;
    `}

  &:hover {
    background: #bbb;
    color: #000;
  }
`;

function Sidebar({ selected }) {
  return (
    <Side>
      <ul>
        <Item item={selected === "dash"}>
          <FiGrid size={20} />
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </Item>
        <Item item={selected === "pets"}>
          <FiGithub size={20} />
          <Link href="/dashboard/pets">
            <a>Listar Pets</a>
          </Link>
        </Item>
        <Item item={selected === "items"}>
          <FiShoppingCart size={20} />
          <Link href="/dashboard/items">
            <a>Listar ítens do brechó</a>
          </Link>
        </Item>
        <Item item={selected === "admin"}>
          <FiUser size={20} />
          <Link href="/dashboard/admins">
            <a>Listar administradores</a>
          </Link>
        </Item>
        <Item item={selected === "people"}>
          <FiUsers size={20} />
          <Link href="/dashboard/people">
            <a>Listar pessoas que adotaram</a>
          </Link>
        </Item>
      </ul>
    </Side>
  );
}

export default Sidebar;
