import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { ReactComponent as ShipsPreview } from '../images/ships-preset.svg';
import { ReactComponent as GlidersPreview } from '../images/gliders-preset.svg';
import { ReactComponent as GunPreview } from '../images/gun-preset.svg';
import { ReactComponent as OscilPreview } from '../images/oscill-preset.svg';
import { gliderGun, gliderArray, oscillators, spaceships } from '../presetGrids';

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PresetButton = styled(Button)`
  display: block;
  margin: 0 0 1rem 0;
  padding: 1.5rem;
  text-align: left;
  svg {
    width: 9rem;
    height: 9rem;
    float: left;
    margin-right: 1.5rem;
  }
  .title {
    font-family: ${p => p.theme.fontFamily};
    display: block;
    font-size: 1.25em;
    margin-bottom: 0.5rem;
  }
  .description {
    display: block;
    font-family: ${p => p.theme.fontFamily};
    font-size: 0.9em;
  }
`;

export default function Presets({ loadPreset }) {
  return (
    <div>
      <h2>Some patterns of interest</h2>
      <ButtonGroup>
        <PresetButton onClick={() => loadPreset(spaceships)}>
          <ShipsPreview />
          <span className="title">Spaceships</span>
          <span>Description. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        </PresetButton>
        <PresetButton onClick={() => loadPreset(gliderArray)}>
          <GlidersPreview />
          <span className="title">Glider Array</span>
          <span>Description. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        </PresetButton>
        <PresetButton onClick={() => loadPreset(gliderGun)}>
          <GunPreview />
          <span className="title">Glider Gun</span>
          <span>Description. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        </PresetButton>
        <PresetButton onClick={() => loadPreset(oscillators)}>
          <OscilPreview />
          <span className="title">Oscillators</span>
          <span>Description. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</span>
        </PresetButton>
      </ButtonGroup>
    </div>
  );
}
