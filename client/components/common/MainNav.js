import React from 'react';
import { Link } from 'react-router-dom';
import SignoutButton from '../common/SignoutButton';
import { useAuth } from '../../routes/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/fontawesome-free-regular';
import styled from 'styled-components';
import { Theme } from '../../style/Theme';
import { StyledIcon } from './StyledIcon';
import { StyledH3 } from './StyledH3';
import { Avatar } from '@material-ui/core';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 100%;
  padding: 0 5vw;
  position: fixed;
  top: 0;
`;

const StyledLink = styled(Link)`
  color: ${Theme.color};
  font-weight: bold;
  opacity: 80%;
  font-size: 30px;
  text-decoration: none;
`;

const H3 = styled(StyledH3)`
  color: ${Theme.color};
  font-weight: bold;
  opacity: 80%;
  margin-right: 12px;
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
  justify-content: flex-end;
  align-items: center;
`;

const MainNav = () => {
  const auth = useAuth();

  return (
    <Nav className="MainNav">
      <StyledLink to="/">INTERVIEW TRACKER</StyledLink>
      <Div>
        <div>
          {auth.user.firstname && <H3>{`Hi, ${auth.user.firstname}!`}</H3>}
        </div>
        <div>
          {auth.user.avatar && (
            <Avatar
              src={
                auth.user.avatar.includes('http')
                  ? auth.user.avatar
                  : `/avatarImages/${auth.user.avatar}`
              }
              alt={auth.user.firstname}
            />
          )}
        </div>
        <div>
          {auth.user.email && (
            <a
              href={`mailto:${auth.user.email}`}
              data-toggle="tooltip"
              title="Send an Email to yourself!"
            >
              <I>
                <FontAwesomeIcon icon={faEnvelope} />
              </I>
            </a>
          )}
        </div>
        <div>{auth.user.id && <SignoutButton />}</div>
      </Div>
    </Nav>
  );
};

export { MainNav };
