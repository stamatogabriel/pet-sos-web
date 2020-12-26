import React, { useEffect, useRef, useState, useCallback } from "react";
import { FiAlertCircle } from "react-icons/fi";
import styled, { css } from "styled-components";

import { useField } from "@unform/core";

import Tooltip from './Tooltip'

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 5px;
  border: 2px solid #333;
  padding: 8px;
  width: 100%;

  ${(props) =>
    props.isErrored &&
    css`
      color: #c53030;
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #040461;
      border-color: #040461;
    `}


  input {
    flex: 1;
    padding: 5px;
    background: transparent;
    border: none;
  }

  & + div {
    margin-top: 12px;
  }

  svg {
    margin-right: 16px;
    color: #333;

    ${(props) =>
      props.isErrored  &&
      css`
        color: #c53030;
      `}

    ${(props) =>
      (props.isFocused || props.isFilled) &&
      css`
        color: #040461;
      `}
  }
`;

const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 10px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

function Input({ name, icon: Icon, ...rest }) {
  const inputRef = useRef(null);
  const [isFocused, setFocus] = useState(false);
  const [isFilled, setFill] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const handleInputBlur = useCallback(() => {
    setFocus(false);

    if (inputRef.current?.value.length) {
      setFill(true);
    } else {
      setFill(false);
    }
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  return (
    <Container isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={() => setFocus(true)}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
}

export default Input;
