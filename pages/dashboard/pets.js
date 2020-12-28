import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { format } from "date-fns";

import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { Table } from "../../components/Table";
import { Container } from "../../styles/Container";

import Sidebar from "../../components/Sidebar";
import PetDetail from "../../components/PetDetail";
import PetCreate from "../../components/PetCreate";

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

function Pets() {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  const { token } = useSelector((state) => state.auth);

  const [pets, setPets] = useState([]);
  const [pet, setPet] = useState();
  const [counter, setCounter] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getPets = useCallback(async () => {
    const response = await fetch("http://localhost:3000/pets", {
      method: "GET",
      headers,
    });

    const data = await response.json();

    console.log(data);

    return setPets(data);
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

  useEffect(() => {
    if (!user.profile) {
      return router.replace("/");
    }

    if (!pets.length && counter === 0) {
      getPets();
      setCounter(counter + 1);
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
          <Table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Tipo</th>
                <th>Encontrado em</th>
                <th>Adotado?</th>
              </tr>
            </thead>
            <tbody>
              {pets.map((pet) => (
                <tr key={pet._id} onClick={() => changePet(pet)}>
                  <td>{pet.name}</td>
                  <td>{pet.age}</td>
                  <td>{pet.type}</td>
                  <td>{format(new Date(pet.foundIn), "dd/MM/yyyy")}</td>
                  <td>{pet.adopted ? "Sim" : "Não"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CustomContainer>
      </Wrapper>
      {openModal && (
        <Modal close={changeModal.bind()}>
          <PetDetail pet={pet} close={changeModal.bind()} token={token} />
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

export default Pets;
