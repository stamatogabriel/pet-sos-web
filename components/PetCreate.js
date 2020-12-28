import React, { useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FiX } from "react-icons/fi";

import Input from "../components/Input";
import Button from "../components/Button";
import getValidationErrors from "../utils/getValidationErrors";

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;

  h2 {
    margin-top: -5px;
  }

  svg {
    margin: 0 10px 0 auto;
    cursor: pointer;
    transition: color 0.5s;

    &:hover {
      color: #aaa;
    }
  }

  form {
    p {
      font-size: 13px;
      margin: 10px 0 0 0;
      color: #777;
    }
  }
`;

function PetCreate({ close }) {
  const formRef = useRef(null);

  const { token } = useSelector((state) => state.auth);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const createPet = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        age: Yup.string().optional(),
        foundIn: Yup.date("Data inválida").required("Data obrigatória"),
        observations: Yup.string().optional(),
        type: Yup.string().required("Tipo obrigatório"),
      });

      await schema.validate(data, { abortEarly: false });

      console.log(data);

      const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      const res = await response.json();

      close();
    } catch (err) {
      if (err.inner) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <FiX size={25} onClick={close} />
      <Form ref={formRef} onSubmit={createPet}>
        <h2>Cadastro de Pets</h2>
        <Input name="name" placeholder="Nome do Pet" />
        <Input name="age" placeholder="Idade do Pet" />
        <Input name="type" placeholder="Tipo do Pet" />
        <p>Encontrado em</p>
        <Input name="foundIn" placeholder="Encontrado em" type="date" />
        <Input name="observations" placeholder="Observações" />
        <Button colorButton="#336455" onClick={createPet}>
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
}

export default PetCreate;
