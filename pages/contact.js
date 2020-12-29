import React, { useCallback, useRef, useState } from "react";
import Head from "next/head";
import { Form } from "@unform/web";
import * as Yup from "yup";
import styled from "styled-components";
import { toast } from "react-toastify";

import { FiMail, FiPhone, FiUser } from "react-icons/fi";

import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import getValidationErrors from "../utils/getValidationErrors";
import { phoneMask } from "../utils/masks";

const Container = styled.div`
  height: calc(100vh - 90px);

  display: flex;
  align-items: stretch;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    width: 100%;
    max-width: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      height: 200px;
    }

    @media (max-width: 600px) {
      img {
        height: 150px;
      }
    }
  }

  h1 {
    font-size: 1.7rem;
    text-align: center;
  }
`;

const Background = styled.div`
  flex: 1;

  background-image: url("/assets/contact-image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function Contact() {
  const formRef = useRef(null);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

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
        message: Yup.string().required("Mensagem obrigatória"),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, title: "Contato do site" }),
      });

      await response.json();

      formRef.current.reset();
      setLoading(false);

      return toast.success("Mensagem enviada com sucesso");
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
      <Head>
        <title>APVA - Envie uma mensagem</title>
      </Head>
      <Content>
        <Form onSubmit={sendMessage} autoComplete="nope" ref={formRef}>
          <h1>Envie uma mensagem pra gente</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="Email" />
          <Input
            name="phone"
            icon={FiPhone}
            placeholder="Telefone"
            onChange={(e) => setPhone(e.target.value)}
            value={phoneMask(phone)}
          />
          <Textarea
            name="message"
            placeholder="Deixe sua mensagem..."
            rows="7"
          />
          <Button onClick={(e) => sendMessage(e)} disabled={loading}>
            {loading ? "Enviando" : "Enviar"}
          </Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
}

export default Contact;
