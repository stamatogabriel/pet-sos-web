import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";

import { toast } from "react-toastify";

import Sidebar from "../../components/Sidebar";
import Tooltip from "../../components/Tooltip";
import Button from "../../components/Button";

import api from "../../services/api";

import { Container } from "../../styles/Container";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const CustomContainer = styled(Container)`
  align-items: flex-start;
`;

const List = styled.ul`
  list-style: none;

  li {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: #ddd;
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;

    span {
      margin: 0 20px;
      font-size: 1rem;
      line-height: 1.2rem;
      text-align: center;
    }

    svg {
      cursor: pointer;
      transition: color 0.5s;

      &:hover {
        color: #e01200;
      }
    }
  }

  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const CustomTooltip = styled(Tooltip)`
  height: 20px;
  margin-left: 10px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
      left: 40%;
    }
  }
`;

const CustomButton = styled(Button)`
  margin: 0 0 20px auto;
  width: 30%;
`;

function Admins() {
  const user = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const router = useRouter();

  const getUsers = useCallback(async () => {
    try {
      const response = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setUsers(response.data);
    } catch (error) {
      toast.error("Algo deu errado. Tente novamente mais tarde.");
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      getUsers();

      return toast.success("Usuário deletado com sucesso");
    } catch (error) {
      toast.error("Algo deu errado. Tente novamente mais tarde.");
    }
  }, []);

  useEffect(() => {
    if (!user.profile) {
      return router.replace("/");
    }

    getUsers();
  }, []);

  return (
    <Wrapper>
      <Sidebar selected="admin" />
      <CustomContainer>
        {users.length === 1 && (
          <div style={{ width: '100%' }}>
            <CustomButton
              colorButton={"#336455"}
              onClick={() => {}}
            >
              Adicionar Usuário
            </CustomButton>
            <h1>Não há nada para ser exibido</h1>
          </div>
        )}
        {users.length > 1 && (
          <List>
            <CustomButton
              colorButton={"#336455"}
              onClick={() => {}}
            >
              Adicionar Usuário
            </CustomButton>
            {users.map((item) => (
              <>
                {item._id !== user.profile._id && (
                  <li>
                    <img
                      src={
                        item.avatar ? user.profile.avatar : "/assets/user.png"
                      }
                    />
                    <span>{item.username}</span>
                    <span>{item.email}</span>
                    <span>
                      {item.phone ? item.phone : "Telefone não informado"}
                    </span>

                    <CustomTooltip title="Excluir">
                      <FiTrash
                        size={20}
                        onClick={() => {
                          deleteUser(item._id);
                        }}
                      />
                    </CustomTooltip>
                  </li>
                )}
              </>
            ))}
          </List>
        )}
      </CustomContainer>
    </Wrapper>
  );
}

export default Admins;
