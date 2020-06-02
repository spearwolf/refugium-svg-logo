import React from 'react';
import { renderToString } from 'react-dom/server';
import styled, { css } from 'styled-components';
import { SketchPicker } from 'react-color';
import { useRecoilState } from 'recoil';

import logoColorState from '../states/logoColor';
import RefugiumLogo from './RefugiumLogo';

const NoneInteractive = css`
  user-select: none;
`;

const GuiLayer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 10rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-right: 1px solid black;
`;

const Title = styled.h1`
  ${NoneInteractive};
  font-weight: normal;
  font-size: 13px;
  text-transform: UPPERCASE;
  color: #666;
`;

const Label = styled.h3`
  ${NoneInteractive};
  font-size: 1.17rem;
  color: #333;
  font-weight: bold;
`;

const Button = styled.button`
  margin: 2rem 0;
  border: 1px solid black;
  border-radius: 2px;
  line-height: 1.5;
  padding: 0.4em 0.2em;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

function downloadSvg(filename, content) {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(content),
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
}

function Gui() {
  const [logoColor, setLogoColor] = useRecoilState(logoColorState);

  const downloadLogoSvg = () => {
    const logoSvg = renderToString(
      <RefugiumLogo showGuideLines={false} color={logoColor} />,
    );
    downloadSvg(`refugium-logo-${logoColor.substr(1)}.svg`, logoSvg);
  };

  return (
    <GuiLayer>
      <Title>Beelitz Heilstätten Sanatorium Logo</Title>
      <Label>foreground color</Label>
      <SketchPicker
        color={logoColor}
        onChange={(color) => setLogoColor(color.hex)}
      />
      <Button onClick={downloadLogoSvg}>download svg</Button>
    </GuiLayer>
  );
}

export default Gui;
