import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { StyledButton, StyledIcon } from '../../common';
import { Theme } from '../../../style/Theme';

const GoogleButton = styled(StyledButton)`
  background: ${Theme.secondary};
  width: 50%;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  &:hover {
    background-color: ${Theme.secondary};
    box-shadow: inset 0 0 0 1px ${Theme.border};
    border: 1px solid ${Theme.border};
  }
`;

const GithubButton = styled(StyledButton)`
  background: ${Theme.secondary};
  width: 50%;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  border: 1px solid rgba(26, 26, 26, 0.3);
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;

  &:hover {
    background-color: ${Theme.secondary};
    box-shadow: inset 0 0 0 1px ${Theme.border};
    border: 1px solid ${Theme.border};
  }
`;

const A = styled.a`
  color: #666666;
  text-decoration: none;

  &:hover {
    color: ${Theme.color};
  }
`;

const I = styled(StyledIcon)`
  color: black;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin-right: 6px;

  &:hover {
    background-color: ${Theme.secondary};
  }
`;

const oAuth = () => {
  return (
    <div>
      <GoogleButton>
        <I>
          <FontAwesomeIcon icon={faGoogle} />
        </I>
        <A href="/auth/google">Signin with Google</A>
      </GoogleButton>
      <GithubButton>
        <I>
          <FontAwesomeIcon icon={faGithub} />
        </I>
        <A href="/auth/github">Signin with Github</A>
      </GithubButton>
    </div>
  );
};

export default oAuth;
