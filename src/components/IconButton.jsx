import styled from 'styled-components';

export default styled.button`
  width: 5rem;
  height: 5rem;
  margin-right: 1.5rem;
  color: ${p => p.theme.colors.primary};
  background: transparent;
  border: none;
  border-radius: 50%;
  position: relative;
  &:hover {
    cursor: pointer;
    color: ${p => p.theme.colors.foreground};
  }
  &:focus {
    outline: none;
  }
  svg {
    position: absolute;
    top: 20%;
    left: 20%;
    width: 60%;
  }
  &:disabled {
    cursor: not-allowed;
    color: ${p => p.theme.colors.secondary};
  }
`;
