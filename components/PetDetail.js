import React, { useCallback, useState } from "react";
import { format } from "date-fns";
import { FiX, FiCamera } from "react-icons/fi";
import { lighten } from "polished";

import styled from "styled-components";

import Button from "../components/Button";
import Modal from "../components/Modal";

import { useDropzone } from "react-dropzone";

import api from "../services/api";

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  svg {
    margin: 10px 10px 10px auto;
    cursor: pointer;
    transition: color 0.5s;

    &:hover {
      color: #aaa;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  width: 100%;

  img {
    margin: 30px auto;
    width: 200px;
    height: 200px;
  }

  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: 1.3fr 0.5fr;
  }
`;

const ImageWrapper = styled.div`
  width: 250px;
  height: 250px;
  padding: 1rem;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px auto;
  border-radius: 10px;
  transition: background-color 0.5s;
  cursor: pointer;

  img {
    transition: opacity 0.5s;
    object-fit: cover;
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

const List = styled.ul`
  list-style: none;
  margin: 0 15px 0 0;
  padding: 0 15px 0 0;

  li {
    font-size: 1rem;
    line-height: 1.5rem;

    display: flex;
    align-items: flex-start;
  }

  strong {
    margin-right: 0.4rem;
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

function PetDetail({ pet, token, ...rest }) {
  const [openModalImage, setOpenModalImage] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const updatePet = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/pets/${pet._id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify({ adopted: true }),
      });

      const res = await response.json();

      rest.close();
    } catch (err) {
      if (err.inner) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  const closeModalImage = () => {
    setOpenModalImage(false);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const form = new FormData();

    form.append("file", acceptedFiles[0]);

    const response = await api.put(`/pets/${pet._id}/images`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    rest.updatePet(response.data);

    setOpenModalImage(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Wrapper>
      <FiX size={25} onClick={rest.close} />
      <Container>
        <div>
          <h1>{pet.name}</h1>
          <List>
            <li>
              <strong>Idade:</strong>
              {pet.age}
            </li>
            <li>
              <strong>Encontrado em:</strong>
              {format(new Date(pet.foundIn), "dd/MM/yyyy")}
            </li>
            <li>
              <strong>Tipo:</strong>
              {pet.type}
            </li>
            <li>
              <strong>Adotado:</strong>
              {pet.adopted ? "Sim" : "Não"}
            </li>
            <li>
              <strong>Observações:</strong>
              {pet.observations}
            </li>
            <Button
              colorButton="#336455"
              disabled={pet.adopted}
              onClick={updatePet}
            >
              {pet.adopted ? "Pet já adotado" : "Adotaram o pet?"}
            </Button>
          </List>
        </div>
        <div>
          <ImageWrapper onClick={() => setOpenModalImage(true)}>
            <FiCamera size={50} />
            <img
              src={pet.image ? pet.image : "/assets/pet_image.png"}
              alt="Foto do pet"
            />
          </ImageWrapper>
        </div>
      </Container>
      {openModalImage && (
        <Modal close={closeModalImage}>
          <IconWrapper>
            <FiX size={25} onClick={() => setOpenModalImage(false)} />
          </IconWrapper>
          <h2>Foto do Pet</h2>
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
    </Wrapper>
  );
}

export default PetDetail;
