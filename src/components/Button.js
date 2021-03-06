import styled from 'styled-components';

export default styled.button`
  display: inline-flex;
  align-items: center;
  margin-right: 1.5rem;
  padding: 0.5rem 1.25rem;
  background: ${p => p.theme.colors.blueGrey};
  color: ${p => p.theme.colors.cream};
  font-size: 0.9em;
  border: none;
  border-radius: ${p => p.theme.inputBorderRadius};
  &:hover {
    cursor: pointer;
    background: ${p => p.theme.colors.blue};
    color: ${p => p.theme.colors.blueBlack};
  }
  &:focus {
    outline: none;
  }
  svg {
    height: 1.25em;
    margin-left: 0.25em;
  }
`;
