import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  display: flex;
  div {
    padding: 0.5rem 0;
  }
  span {
    font-weight: bold;
    padding-left: 1rem;
  }
  div:nth-child(1) {
    width: 25%;
  }
  div:nth-child(2) {
    width: 25%;
  }
  div:nth-child(3) {
    width: 50%;
    padding-left: 0;
    text-align: right;
  }
`;

export default function Stats({ genCount, popCount, isPaused }) {
  return (
    <Styles>
      <div>
        Gen <span>{genCount}</span>
      </div>
      <div>
        Pop <span>{popCount}</span>
      </div>
      <div>
        <span>{isPaused ? 'PAUSED' : 'RUNNING'}</span>
      </div>
    </Styles>
  );
}
