import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FiTrash, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { lighten } from "polished";
import styled from "styled-components";

import { format } from "date-fns";

import api from "../../services/api";

import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { Table } from "../../components/Table";
import { Container } from "../../styles/Container";

import Sidebar from "../../components/Sidebar";
import PetDetail from "../../components/PetDetail";
import PetCreate from "../../components/PetCreate";
import { toast } from "react-toastify";

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export const CustomContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

export const CustomButton = styled(Button)`
  margin: 0 0 20px auto;
  width: 30%;
`;

export const CustomTable = styled(Table)`
  svg {
    transition: color 0.5s;
    z-index: 3;
    cursor: pointer;

    &:hover {
      color: #e01200;
    }
  }
`;

const Pagination = styled.div`
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    margin: 0 15px;
    border: 1px solid #222;
    background: transparent;
    border-radius: 50px;
    cursor: pointer;
    color: #222;
    font-size: 15px;
    line-height: 24px;
    transition: font-weight 0.5s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 10px;

    &:hover {
      font-weight: 700;
    }

    &:disabled {
      cursor: not-allowed;
      color: ${lighten(0.2, "#222")};
      border-color: ${lighten(0.2, "#222")};
    }
  }
`;

function Pets({ pets, page, totalPages }) {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const { token } = useSelector((state) => state.auth);

  const [pet, setPet] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const getPets = useCallback(async () => {
    router.push(`/dashboard/pets?page=${Number(page)}`);
  }, []);

  const updatePet = useCallback(async (dataPet) => {
    setPet(dataPet);
  }, []);

  const changeModal = async () => {
    await getPets();
    setOpenModal(false);
  };

  const changeCreate = async () => {
    await getPets();
    setOpenCreate(false);
  };

  const changePet = useCallback(
    (data) => {
      setPet(data);
      setOpenModal(true);
    },
    [openModal]
  );

  const deletePet = useCallback(async (id) => {
    try {
      await api.delete(`/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await getPets();

      return toast.success("Pet deletado com sucesso");
    } catch (error) {
      return toast.error("Algo deu errado. Tente novamente mais tarde");
    }
  }, []);

  useEffect(() => {
    if (!user.profile) {
      return router.replace("/");
    }
  }, []);

  return (
    <>
      <Wrapper>
        <Sidebar selected="pets" />
        <CustomContainer>
          <CustomButton
            colorButton={"#336455"}
            onClick={() => setOpenCreate(true)}
          >
            Adicionar Pet
          </CustomButton>
          {pets && pets.length ? (
            <>
              <CustomTable>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Tipo</th>
                    <th>Encontrado em</th>
                    <th>Adotado?</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pets.map((pet) => (
                    <tr key={pet._id}>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => changePet(pet)}
                      >
                        {pet.name}
                      </td>
                      <td>{pet.age}</td>
                      <td>{pet.type}</td>
                      <td>{format(new Date(pet.foundIn), "dd/MM/yyyy")}</td>
                      <td>{pet.adopted ? "Sim" : "Não"}</td>
                      <td>
                        <FiTrash size={20} onClick={() => deletePet(pet._id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </CustomTable>
              <Pagination>
                <button
                  onClick={() =>
                    router.push(`/dashboard/pets?page=${Number(page) - 1}`)
                  }
                  disabled={Number(page) === 1 || totalPages === 1}
                >
                  <FiArrowLeft style={{ marginRight: "10px" }} />
                  Anterior
                </button>
                <button
                  disabled={Number(page) >= totalPages}
                  onClick={() =>
                    router.push(`/dashboard/pets?page=${Number(page) + 1}`)
                  }
                >
                  Proximo
                  <FiArrowRight style={{ marginLeft: "10px" }} />
                </button>
              </Pagination>
            </>
          ) : (
            <h1>Não existem pets para exibir</h1>
          )}
        </CustomContainer>
      </Wrapper>
      {openModal && (
        <Modal close={changeModal.bind()}>
          <PetDetail
            pet={pet}
            close={changeModal.bind()}
            token={token}
            updatePet={updatePet.bind()}
          />
        </Modal>
      )}
      {openCreate && (
        <Modal close={changeCreate.bind()}>
          <PetCreate close={changeCreate.bind()} />
        </Modal>
      )}
    </>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/pets?page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  const { pets, totalPages } = data;

  return {
    props: {
      pets,
      totalPages,
      page,
    },
  };
}

export default Pets;
