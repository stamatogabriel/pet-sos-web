import React, { useRef, useCallback, useState } from "react";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { FiMail, FiPhone, FiUser, FiX } from "react-icons/fi";
import { toast } from 'react-toastify'

import Input from "../components/Input";
import Button from "../components/Button";
import getValidationErrors from "../utils/getValidationErrors";
import { phoneMask } from "../utils/masks";

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
      font-size: 0.9rem;
      line-height: 1.2rem;

      margin: 10px 0;
      color: #777;
    }
  }
`;

function PetAdopt({ close, pet }) {
  const formRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false)

  const sendMessage = useCallback(async (data) => {
    try {
      setLoading(true);
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        phone: Yup.string().required("Telefone obrigatório"),
        email: Yup.string()
          .email("Email inválido")
          .required("Email obrigatório"),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          title: `Temos um lar para ${pet.name}`,
          message: `${data.name} mostrou interesse em adotar ${pet.name} e aqui estão os dados para contato.`,
        }),
      });

      await response.json();

      formRef.current.reset();
      setLoading(false);
      close()
      return toast.success("Solicitação enviada com sucesso. Logo entraremos em contato.");
    } catch (err) {
      setLoading(false);
      if (err.inner) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      } else {
        return toast.error(
          "Não foi possível enviar se email. Por favor, verifique os dados e tente novamente."
        );
      }
    }
  }, []);

  return (
    <Container>
      <FiX size={25} onClick={close} />
      <Form ref={formRef} onSubmit={sendMessage}>
        <h2>Adote um Pet</h2>
        <p>
          Que legal que você quer dar um lar para {pet.name}. Preencha os dados
          abaixo que vamos entrar em contato com você e explicar os próximos
          passos.
        </p>
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="Email" />
        <Input
          name="phone"
          icon={FiPhone}
          placeholder="Telefone"
          onChange={(e) => setPhone(e.target.value)}
          value={phoneMask(phone)}
        />
        <Button colorButton="#336455" onClick={sendMessage} disabled={loading}>
          {loading ? 'Aguarde' : 'Quero adotar'}
        </Button>
      </Form>
    </Container>
  );
}

export default PetAdopt;
