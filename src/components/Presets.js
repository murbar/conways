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
  min-height: 12rem;
  svg {
    width: 9rem;
    height: 9rem;
    position: absolute;
  }
  .title {
    font-family: ${p => p.theme.fontFamily};
    display: block;
    font-size: 1.25em;
    margin-bottom: 0.5rem;
    margin-left: 10.5rem;
  }
  .description {
    display: block;
    margin-left: 10.5rem;
    font-family: ${p => p.theme.fontFamily};
    font-size: 0.9em;
    line-height: 1.5;
  }
`;

export default function Presets({ loadPreset }) {
  return (
    <div>
      <h2>Interesting patterns</h2>
      <ButtonGroup>
        <PresetButton onClick={() => loadPreset(spaceships)}>
          <ShipsPreview />
          <span className="title">Spaceships</span>
          <span className="description">
            These patterns cycle over a fixed number of generations while traveling across the grid.
            New patterns are being discovered all the time. Three of the smallest{' '}
            <em>elementary</em> ships are demonstrated here.
          </span>
        </PresetButton>
        <PresetButton onClick={() => loadPreset(gliderArray)}>
          <GlidersPreview />
          <span className="title">Glider Array</span>
          <span className="description">
            First discovered in 1969, the glider is the smallest and most common <em>spaceship</em>.
            It travels diagonally over a period of 4 generations and can be used to transmit
            information over large distances in complex systems.
          </span>
        </PresetButton>
        <PresetButton onClick={() => loadPreset(gliderGun)}>
          <GunPreview />
          <span className="title">Glider Gun</span>
          <span className="description">
            A <em>gun</em> is a stationary pattern that continuously emits spaceships. Shown here is
            a well-known pattern called the Gosper glider gun. Because the edges of our grid wrap
            around to their opposite edge, this gun will eventually be destroyed by its own fire.
          </span>
        </PresetButton>
        <PresetButton onClick={() => loadPreset(oscillators)}>
          <OscilPreview />
          <span className="title">Oscillators</span>
          <span className="description">
            These patterns are stationary and cycle over a fixed period. Oscillators with a period
            of 1 appear constant and are known as <em>still life</em>; those that move around the
            grid are <em>spaceships</em>.
          </span>
        </PresetButton>
      </ButtonGroup>
    </div>
  );
}
