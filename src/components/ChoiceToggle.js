import React, { useState } from 'react';
import styled from 'styled-components';
import { media } from '../styles/helpers';

const Styles = styled.div`
  display: flex;
  border-radius: ${p => p.theme.inputBorderRadius};
  border: 1px solid ${p => p.theme.colors.primary};
  overflow: hidden;
  button {
    font-size: 0.8em;
    font-family: ${p => p.theme.fontFamily};
    font-weight: bold;
    border: none;
    background: none;
    margin: 0;
    padding: 0.75rem 0.75rem;
    color: ${p => p.theme.colors.secondary};
    cursor: pointer;
  }
  button:hover {
    color: ${p => p.theme.colors.foreground};
    background: ${p => p.theme.colors.secondary};
  }
  button:first-child {
    padding-left: 1rem;
  }
  button:last-child {
    padding-right: 1rem;
  }
  button:focus {
    outline: none;
  }
  button.selected {
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.foreground};
  }
  button.selected:hover {
    background: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.foreground};
    cursor: default;
  }
  ${media.phone`
    button {
      padding: 0.75rem 1.5rem;
    }
    button:first-child {
      padding-left: 1.75rem;
    }
    button:last-child {
      padding-right: 1.75rem;
    }
  `}
`;

export default function ChoiceToggle({ choices, onToggle, initial }) {
  const labels = Object.keys(choices);
  const [selected, setSelected] = useState(initial);

  const handleClick = label => {
    setSelected(label);
    onToggle(choices[label]);
  };

  return (
    <Styles>
      {labels.map(l => (
        <button key={l} className={selected === l && 'selected'} onClick={() => handleClick(l)}>
          {l}
        </button>
      ))}
    </Styles>
  );
}
