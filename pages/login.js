import React, { useCallback, useRef } from "react";
import { useRouter } from 'next/router'
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import styled from "styled-components";

import { FiMail, FiLock } from "react-icons/fi";

import Input from "../components/Input";
import Button from "../components/Button";
import getValidationErrors from "../utils/getValidationErrors";

import { signInRequest, signFailure } from "../store/modules/auth/actions";

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
    text-align: center;
  }
`;

const Background = styled.div`
  flex: 1;

  background-image: url("/assets/login-image.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

function Login() {
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter()

  const { loading } = useSelector((state) => state.auth);

  const signIn = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Digite um email válido")
          .required("Email obrigatório"),
        password: Yup.string().min(6, "Mínimo 6 dígitos"),
      });

      await schema.validate(data, { abortEarly: false });

      dispatch(signInRequest(data.email, data.password));

      router.push('/dashboard')
    } catch (err) {
      if (err.inner) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      } else {
        dispatch(signFailure(err));
      }
    }
  }, []);

  return (
    <Container>
      <Head>
        <title>APVA - Página Administrativa</title>
      </Head>
      <Content>
        <Form onSubmit={signIn} autoComplete="nope" ref={formRef}>
          <img src="/assets/Logo.png" alt="Logo APVA" />
          <h1>Faça seu login</h1>
          <Input type="email" name="email" icon={FiMail} placeholder="Email" />
          <Input
            icon={FiLock}
            placeholder="Senha"
            name="password"
            type="password"
          />
          <Button onClick={(e) => signIn(e)} disabled={loading}>
            {loading ? "Carregando" : "Entrar"}
          </Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
