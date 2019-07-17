import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  text-transform: uppercase;
  font-size: 0.8em;
  display: flex;
  div {
    margin-right: 5rem;
    padding: 0.5rem 0;
  }
  span {
    font-weight: bold;
    display: inline-block;
    padding-left: 1rem;
    text-align: right;
  }
`;

export default function Stats({ genCount, popCount }) {
  return (
    <Styles>
      <div>
        Gen <span>{genCount}</span>
      </div>
      <div>
        Pop <span>{popCount}</span>
      </div>
    </Styles>
  );
}
