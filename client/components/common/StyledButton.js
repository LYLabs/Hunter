import styled from 'styled-components';
import { Theme } from '../../style/Theme';

const StyledButton = styled.button`
  text-align: center;
  vertical-align: middle;
  box-sizing: border-box;
  font-size: ${({ small }) => (small ? '16px' : '20px')};
  line-height: ${({ small }) => (small ? '40px' : '48px')};
  text-decoration: none;
  color: ${({ secondary }) =>
    secondary ? `${Theme.primary}` : `${Theme.secondary}`};
  background: ${({ secondary }) =>
    secondary ? `${Theme.secondary}` : `${Theme.primary}`};
  font-weight: 600;
  border: ${({ secondary }) =>
    secondary ? `none` : `1px solid ${Theme.secondary}`};
  border-radius: 6px;
  height: ${({ small }) => (small ? '40px' : '48px')};
  width: ${({ small }) => (small ? '80px' : '350px')};
  margin: ${({ small }) => (small ? '12px 0px 12px 0px' : '20px 0px 20px 0px')};
  padding: auto;
  display: inline-block;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 0.167s;
  &:hover {
    background-color: ${({ secondary }) =>
      secondary ? `${Theme.secondary_hover}` : `${Theme.primary_hover}`};
    box-shadow: inset 0 0 0 1px
      ${({ secondary }) =>
        secondary ? `${Theme.primary}` : `${Theme.secondary}`};
    border: 1px solid
      ${({ secondary }) =>
        secondary ? `${Theme.primary}` : `${Theme.secondary}`};
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #eee;
    color: #666;
  }
`;

export { StyledButton };
