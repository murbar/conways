import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { ReactComponent as ShipsPreview } from '../images/ships-preset.svg';
import { ReactComponent as GlidersPreview } from '../images/gliders-preset.svg';
import { ReactComponent as GunPreview } from '../images/gun-preset.svg';
import { ReactComponent as OscilPreview } from '../images/oscill-preset.svg';
import { gliderGun, gliderArray, oscillators, spaceships } from '../presetGrids';

const Preset = styled.div`
  margin-bottom: 3rem;
  svg {
    width: 8rem;
    height: 8rem;
    position: absolute;
    color: ${p => p.theme.colors.primary};
  }
  .title {
    font-family: ${p => p.theme.fontFamily};
    font-size: 1.25em;
    margin-bottom: 0.75rem;
    margin-left: 9.5rem;
    line-height: 1;
  }
  .description {
    margin-left: 9.5rem;
    font-family: ${p => p.theme.fontFamily};
    font-size: 0.9em;
    line-height: 1.5;
  }
  .load {
    margin: 1rem 0 0 9.5rem;
  }
`;

export default function Presets({ loadPreset }) {
  return (
    <>
      <h2>Interesting patterns</h2>
      <Preset>
        <ShipsPreview />
        <div className="title">Spaceships</div>
        <div className="description">
          These patterns cycle over a fixed number of generations while traveling across the grid.
          Three of the smallest <em>elementary</em> ships are demonstrated here.
        </div>
        <div className="load">
          <Button onClick={() => loadPreset(spaceships)}>Load Spaceships</Button>
        </div>
      </Preset>
      <Preset>
        <GlidersPreview />
        <div className="title">Glider Array</div>
        <div className="description">
          First discovered in 1969, the glider is the smallest and most common <em>spaceship</em>.
          It travels diagonally over a period of 4 generations and can be used to transmit
          information over large distances in complex systems.
        </div>
        <div className="load">
          <Button onClick={() => loadPreset(gliderArray)}>Load Glider Array</Button>
        </div>
      </Preset>
      <Preset>
        <GunPreview />
        <div className="title">Glider Gun</div>
        <div className="description">
          A <em>gun</em> is a stationary pattern that continuously emits spaceships. Shown here is a
          well-known pattern called the Gosper glider gun. Because the edges of our grid wrap around
          to their opposite edge, this gun will eventually be destroyed by its own fire.
        </div>
        <div className="load">
          <Button onClick={() => loadPreset(gliderGun)}>Load Glider Gun</Button>
        </div>
      </Preset>
      <Preset>
        <OscilPreview />
        <div className="title">Oscillators</div>
        <div className="description">
          These patterns are stationary and cycle over a fixed period. Oscillators with a period of
          1 appear constant and are known as <em>still life</em>; those that move around the grid
          are <em>spaceships</em>.
        </div>
        <div className="load">
          <Button onClick={() => loadPreset(oscillators)}>Load Oscillators</Button>
        </div>
      </Preset>
    </>
  );
}
