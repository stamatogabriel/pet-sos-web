import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";

import * as Yup from "yup";

import { Form } from "@unform/web";

import Input from "../../components/Input";
import Button from "../../components/Button";
import Sidebar from "../../components/Sidebar";

import { Container } from "../../styles/Container";

import getValidationErrors from "../../utils/getValidationErrors";
import { phoneMask } from "../../utils/masks";

import api from "../../services/api";
import { changeUser } from "../../store/modules/user/actions";

import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  padding: 0 35px 0 0;
`;

const CustomContainer = styled(Container)`
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;

  form {
    margin-left: 5%;
    margin-top: -10px;
    width: 100%;
    max-width: 600px;
  }

  h2 {
    text-align: center;
  }

  hr {
    width: 100%;
    max-width: 750px;
    margin: 30px;
  }
`;

function UpdateUser() {
  const user = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState(
    user?.profile?.phone ? user.profile.phone : ""
  );

  const formRef = useRef(null);
  const passRef = useRef(null);
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.profile || !token) {
      return router.replace("/");
    }
  }, []);

  const handleUser = useCallback(async (data) => {
    if (!data.username) {
      return;
    }

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().optional(),
        phone: Yup.string().optional(),
        email: Yup.string().email("Email inválido").optional(),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.put(`/users/${user.profile._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(changeUser({ user: response.data }));

      return toast.success("Dados atualizados com sucesso");
    } catch (err) {
      if (err.inner) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      } else {
        toast.error(
          "Não foi possível atualizar, por favor, verifique seus dados"
        );
      }
    }
  }, []);

  const changePass = useCallback(async (data) => {
    if (!data.password) {
      return;
    }
    try {
      passRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().min(6, "Senha deve ter 6 digitos"),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Senhas deve ser iguais"
        ),
      });

      await schema.validate(data, { abortEarly: false });

      const response = await api.put(
        `/users/${user.profile._id}`,
        { password: data.password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(changeUser({ user: response.data }));

      return toast.success("Senha atualizada com sucesso");
    } catch (err) {
      if (err.inner) {
        const errors = getValidationErrors(err);
        passRef.current?.setErrors(errors);
      } else {
        toast.error(
          "Não foi possível atualizar, por favor, verifique seus dados"
        );
      }
    }
  }, []);

  return (
    <Wrapper>
      <Sidebar />
      <CustomContainer>
        <Form ref={formRef} onSubmit={handleUser}>
          <h2>Meus dados</h2>
          <Input
            name="username"
            icon={FiUser}
            defaultValue={user.profile.username}
            placeholder="Nome"
          />
          <Input
            icon={FiMail}
            name="email"
            defaultValue={user.profile.email}
            placeholder="Nome"
          />
          <Input
            icon={FiPhone}
            name="phone"
            placeholder="Telefone"
            onChange={(e) => setPhone(e.target.value)}
            value={phoneMask(phone)}
          />
          <Button colorButton="#336455" onClick={handleUser}>
            Salvar
          </Button>
        </Form>
        <hr />
        <Form ref={passRef} onSubmit={changePass}>
          <h2>Alterar minha senha</h2>
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Input
            icon={FiLock}
            name="confirmPassword"
            type="password"
            placeholder="Nova Senha"
          />
          <Button colorButton="#336455" onClick={changePass}>
            Alterar Senha
          </Button>
        </Form>
      </CustomContainer>
    </Wrapper>
  );
}

export default UpdateUser;
