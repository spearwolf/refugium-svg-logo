import React from "react";
import styled from "styled-components";
import { RefugiumLogo } from "./components/RefugiumLogo";
import "./App.css";

const RefugiumLogoStyled = styled(RefugiumLogo)`
  flex-basis: max(66vw, 66vh);
  color: #f06;
`;

function App() {
  return (
    <div className="App">
      <RefugiumLogoStyled strokeWidth={3} />
    </div>
  );
}

export default App;
