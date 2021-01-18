import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import SignoutButton from '../common/SignoutButton';
import { useAuth } from '../../routes/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/fontawesome-free-regular';
import styled, { ThemeContext } from 'styled-components';
import { Theme } from '../../style/Theme';
import { StyledIcon } from './StyledIcon';
import { StyledH3 } from './StyledH3';
import { Toggle } from './Toggle';
import { Avatar } from '@material-ui/core';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  height: 10vh;
  width: 100%;
  padding: 3vh 5vw;
  position: fixed;
  top: 0;

  @media (min-width: 768px) {
    align-items: center;
  }
`;

const AppTitle = styled(Link)`
  color: ${({ theme }) => theme.bodyFontColor};
  opacity: 80%;
  font-weight: bold;
  font-size: 30px;
  text-decoration: none;
`;

const H3 = styled(StyledH3)`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    color: ${({ theme }) => theme.bodyFontColor};
    opacity: 80%;
    font-size: 16px;
    font-weight: bold;
    margin-right: 18px;
  }
`;

const I = styled(StyledIcon)`
  color: black;
  background: ${Theme.background};
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin: 12px;

  &:hover {
    background-color: ${Theme.secondary};
    box-shadow: inset 0 0 0 1px ${Theme.border};
    border: 1px solid ${Theme.border};
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`;

const MobileMenuIcon = styled.div`
  width: 32px;
  min-width: 32px;
  padding: 5px;

  > div {
    height: 3px;
    background: ${({ theme }) => theme.bodyFontColor};
    margin: 5px 0;
    width: 100%;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Menu = styled.div`
  visibility: ${({ open }) => (open ? ' visible' : 'hidden')};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 768px) {
    visibility: visible;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
`;

const MainNav = () => {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { id, setTheme } = useContext(ThemeContext);

  return (
    <Nav className="MainNav">
      <AppTitle to="/">INTERVIEW TRACKER</AppTitle>
      <>
        {auth.user.id && (
          <Div>
            <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
              <div />
              <div />
              <div />
            </MobileMenuIcon>
            <Menu open={menuOpen}>
              <H3>{`Hi, ${auth.user.firstname}!`}</H3>
              <Avatar
                src={
                  auth.user.avatar.includes('http')
                    ? auth.user.avatar
                    : `/avatarImages/${auth.user.avatar}`
                }
                alt={auth.user.firstname}
              />
              <a
                href={`mailto:${auth.user.email}`}
                title="Send an Email to yourself!"
              >
                <I>
                  <FontAwesomeIcon icon={faEnvelope} />
                </I>
              </a>
              <SignoutButton />
              <Toggle isActive={id === 'dark'} onToggle={setTheme} />
            </Menu>
          </Div>
        )}
      </>
    </Nav>
  );
};

export { MainNav };
