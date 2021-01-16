import styled from 'styled-components';

const StyledH3 = styled.h3`
  font-weight: 400;
  opacity: ${({ light }) => (light ? '80%' : '100%')};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

export { StyledH3 };
