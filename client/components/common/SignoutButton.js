import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../routes/useAuth';
import axios from 'axios';
import styled from 'styled-components';
import { Theme } from '../../style/Theme';
import { StyledButton } from './StyledButton';

const Button = styled(StyledButton)`
  background: ${Theme.background};
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;

  &:hover {
    background-color: ${Theme.secondary};
    box-shadow: inset 0 0 0 1px ${Theme.border};
    border: 1px solid ${Theme.border};
  }
`;

const SignoutButton = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleClick = async (e) => {
    try {
      const res = await axios.get('/user/logout');
      if (res.status === 200) {
        auth.signout(() => history.push('/signin'));
      }
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in handleSubmit of Logout component:',
        error.response.data.err
      );
    }
  };

  return (
    <Button secondary small onClick={handleClick}>
      Sign Out
    </Button>
  );
};

export default SignoutButton;
