import React from "react";
import styled from "styled-components";
import RefugiumLogo from "./components/RefugiumLogo";
import "./App.css";

const RefugiumLogoStyled = styled(RefugiumLogo)`
  flex-basis: max(66vw, 66vh);
  backdrop-filter: grayscale(0.5) opacity(0.5);
  color: #f5f5f5;
`;

function App() {
  return (
    <div className="App">
      <RefugiumLogoStyled />
    </div>
  );
}

export default App;
