import React, { useCallback, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Form } from "@unform/web";
import * as Yup from "yup";
import styled from "styled-components";

import { FiMail, FiLock } from "react-icons/fi";

import api from "../services/api";

import Input from "../components/Input";
import Button from "../components/Button";
import getValidationErrors from "../utils/getValidationErrors";

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
  // const dispatch = useDispatch();

  // const user = useSelector(state => state.user)

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

      const response = await api.post("auth", {
        email: data.email,
        password: data.password,
      });

      console.log(response.data);
      //  dispatch(userUpdate(response.data))
    } catch (err) {
      const errors = getValidationErrors(err);
      formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
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
          <Button onClick={(e) => signIn(e)}>Entrar</Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
