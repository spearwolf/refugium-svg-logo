import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import logoColorState from './states/logoColor';
import RefugiumLogo from './components/RefugiumLogo';
import Gui from './components/Gui';

import './App.css';

const RefugiumLogoStyled = styled(RefugiumLogo)`
  flex-basis: max(66vw, 66vh);
  backdrop-filter: grayscale(0.5) opacity(0.5);
`;

function App() {
  const [logoColor] = useRecoilState(logoColorState);

  return (
    <>
      <div className="App" style={{ color: logoColor }}>
        <RefugiumLogoStyled />
      </div>
      <Gui />
    </>
  );
}

export default App;
