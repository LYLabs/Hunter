import styled from 'styled-components';

const StyledH1 = styled.h1`
  opacity: ${({ light }) => (light ? '80%' : '100%')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  opacity: 80%;
`;


export { StyledH1 };