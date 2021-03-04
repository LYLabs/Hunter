import React from 'react';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  width: 50px;
  min-width: 50px;
  height: 25px;
  border-radius: 25px;
  border: 1px solid #666;
  margin-left: 12px;
  display: flex;
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.primaryColor},
    ${({ theme }) => theme.secondaryColor}
  );
`;

const Notch = styled.div`
  height: 21px;
  width: 21px;
  border: 1px solid #666;
  margin-top: 1px;
  background: white;
  border-radius: 50%;
  transition: tansform 0.1s linear;
  transform: translate(${({ isActive }) => (isActive ? '26px' : '1px')});
`;

const Toggle = ({ isActive, onToggle }) => {
  return (
    <ToggleWrapper onClick={onToggle}>
      <Notch isActive={isActive} />
    </ToggleWrapper>
  );
};

export { Toggle };
