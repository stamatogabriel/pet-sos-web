import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
html,
body {
  padding: 0;
  margin: 0 auto;
  font-family: Roboto, sans-serif;
  background-color: #eee;
  color: #333;
}

a {
  color: inherit;
  text-decoration: none;
  transition-duration: 0.5s;

:hover {
  color: #bcbcbc;
}

}

* {
  box-sizing: border-box;
}
`;
