import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import { FiX, FiCamera, FiLogOut } from "react-icons/fi";
import { lighten } from "polished";

import Modal from "../components/Modal";

import { useDropzone } from "react-dropzone";

import api from "../services/api";
import { changeUser } from "../store/modules/user/actions";
import { signOut } from '../store/modules/auth/actions'

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
  overflow-y: auto;

  button {
    margin: 10px auto 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    cursor: pointer;
    color: #555;
    transition: color 0.5s;

    &:hover {
      color: #000;

      svg {
        color: #000;
      }
    }

    svg {
      margin-right: 8px;
      color: #555;
      transition: color 0.5s;
    }
  }

  ul {
    width: 100%;
    list-style: none;
    padding: 10px;
    display: flex;
    flex-direction: column;
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
  transition: background-color 0.5s;

  ${(props) =>
    props.item &&
    css`
      background-color: #bbb;
      color: #000;
    `}

  &:hover {
    background-color: #bbb;
    color: #000;
  }
`;

const IconWrapper = styled.div`
  width: 100%;
  padding: 0 0 0 auto;
  display: flex;

  svg {
    margin: 0 10px 0 auto;
    cursor: pointer;
    transition: color 0.5s;

    &:hover {
      color: #aaa;
    }
  }
`;

const ImageWrapper = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  padding: 1rem;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  transition: background-color 0.5s;
  cursor: pointer;
  border: 2px solid #333;

  img {
    transition: opacity 0.5s;
    object-fit: cover;
    height: 130px;
    width: 130px;
    border: 2px solid #333;
    border-radius: 50%;
  }

  svg {
    position: absolute;
    visibility: hidden;
    transition: visibility 0.3s;
  }

  &:hover {
    background-color: #aaa;

    img {
      opacity: 0.3;
    }

    svg {
      visibility: visible;
    }
  }
`;

const DropzoneWrapper = styled.div`
  border: 1px dotted #333;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 50px auto;

  width: 70%;
  min-height: 100px;

  p {
    text-align: center;
    color: #333;
  }

  &:hover {
    border-color: ${lighten(0.4, "#333")};

    p {
      color: ${lighten(0.4, "#333")};
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    margin: -10px 0 0 0;
  }

  a {
    border: none;
    background: transparent;
    cursor: pointer;
    color: #555;
    transition: color 0.5s;
    margin: 5px 0 0 0;
    font-size: 0.85rem;

    & :hover {
      color: #000;
    }
  }
`;

function Sidebar({ selected }) {
  const user = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const router = useRouter()

  const dispatch = useDispatch();

  const [openModalImage, setOpenModalImage] = useState(false);

  const closeModalImage = () => {
    setOpenModalImage(false);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const form = new FormData();

    form.append("file", acceptedFiles[0]);

    const response = await api.put(`/users/${user.profile._id}/images`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(changeUser({ user: response.data }));

    setOpenModalImage(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  const logout = useCallback(() => {
    dispatch(signOut())
    router.push('/')
  }, [])

  return (
    <Side>
      <ImageWrapper onClick={() => setOpenModalImage(true)}>
        <FiCamera size={50} />
        <img
          src={
            user.profile && user.profile.avatar
              ? user.profile.avatar
              : "/assets/user.png"
          }
          alt="Imagem do usuário"
        />
      </ImageWrapper>
      <Container>
        <h3>{user.profile?.username}</h3>
        <Link href="/dashboard/user">
          <a>Editar Cadastro</a>
        </Link>
      </Container>
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
        <button onClick={logout}>
          <FiLogOut size={20} />
          Sair
        </button>
      </ul>
      {openModalImage && (
        <Modal close={closeModalImage}>
          <IconWrapper>
            <FiX size={25} onClick={() => setOpenModalImage(false)} />
          </IconWrapper>
          <h2>Alterar avatar</h2>
          <DropzoneWrapper {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Solte as imagens aqui ...</p>
            ) : (
              <p>Arraste as imagens aqui, ou clique para selecionar</p>
            )}
          </DropzoneWrapper>
        </Modal>
      )}
    </Side>
  );
}

export default Sidebar;
