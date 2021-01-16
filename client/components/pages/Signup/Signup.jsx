import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import PageLayout from '../../common/PageLayout';
import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledFormPWDInput,
  StyledButton,
  StyledFormWrapper,
  StyledH1,
  StyledH3,
  StyledSpinner,
} from '../../common';
import { Theme } from '../../../style/Theme';
import axios from 'axios';

const H1 = styled(StyledH1)`
  font-size: 26px;
  margin-bottom: 8px;
`;

const H3 = styled(StyledH3)``;

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SignupWrapper = styled(StyledFormWrapper)``;

const SignupLabal = styled(StyledFormLabel)``;

const SignupInput = styled(StyledFormInput)`
  height: 42px;
  margin: 4px 0px 8px 0px;
`;

const SignupButton = styled(StyledButton)``;

const SigninButton = styled(StyledButton)``;

const StyledAvatarInputWrapper = styled.div`
  display: flex;
`;

const StyledAvatarInput = styled(StyledFormInput)`
  color: #666666;
  width: 80%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  ::-webkit-file-upload-button {
    background: ${Theme.secondary};
    color: ${Theme.color};
    opacity: 75%;
    text-align: center;
    vertical-align: middle;
    border-radius: 6px;
    border: 1px solid rgba(26, 26, 26, 0.3);

    &:hover {
      background-color: ${Theme.background};
      box-shadow: rgb(200, 200, 200) 0px 0px 0px 1px inset;
    }

    &:active {
      transform: scale(0.98);
    }

    &:focus {
      outline: 0;
    }
  }
`;

const UploadButton = styled.div`
  background: ${Theme.secondary};
  color: ${Theme.color};
  opacity: 75%;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
  height: 48px;
  width: 350px;
  border-radius: 6px;
  border: 1px solid rgba(26, 26, 26, 0.3);
  padding: 10px 5px;
  margin: 8px 0px 16px 0px;
  width: 20%;
  box-sizing: border-box;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 0.167s;

  &:hover {
    background-color: ${Theme.background};
    box-shadow: rgb(200, 200, 200) 0px 0px 0px 1px inset;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const Signup = () => {
  let timeoutID;

  // react hooks
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [selectedAvatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const history = useHistory();

  const localSignup = async () => {
    // check if passwords match before submit
    if (password !== password2) {
      alert('password does not match');
    } else {
      try {
        console.log('selectedAvatar==>', selectedAvatar);
        const res = await axios.post('/user/signup', {
          first_name,
          last_name,
          email,
          password,
          selectedAvatar,
        });
        // console.log('res.data ===> ', res.data);
        auth.signup(
          res.data.id,
          res.data.email,
          res.data.firstname,
          res.data.avatar,
          () => history.push('/')
        );
        console.log('auth.user in Signup Component ===> ', auth.user);
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/signin');
          setLoading(false);
        }
        console.log(
          'Error in handleSubmit of Signup component:',
          error.response.data.err
        );
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    timeoutID = setTimeout(() => {
      localSignup();
    }, 2000);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutID);
      setLoading(false);
    };
  }, []);

  const avatarChangeHandler = (e) => {
    console.log('fileuploaded===>', e.target.files[0]);
    setAvatar(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log('formData==>', data);
    data.append('file', selectedAvatar);
    const res = await axios.post('/user/upload', data);

    console.log('uploadimageres==>', res.data.filename);
    setAvatar(res.data.filename);
  };

  return (
    <PageLayout>
      <SignupWrapper>
        <form onSubmit={handleSubmit} id="list">
          <H1 center>Create an Account</H1>
          <Div>
            <H3 light>Already have an account?</H3>
            <Link to="/signin">
              <SigninButton secondary small>
                Sign In
              </SigninButton>
            </Link>
          </Div>
          {loading ? (
            <StyledSpinner />
          ) : (
            <>
              <SignupLabal light>First Name</SignupLabal>
              <SignupInput
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <SignupLabal light>Last Name</SignupLabal>
              <SignupInput
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <SignupLabal light>Email Address</SignupLabal>
              <SignupInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <SignupLabal light>Password</SignupLabal>
              <StyledFormPWDInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <SignupLabal light>Re-enter password</SignupLabal>
              <StyledFormPWDInput
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <SignupLabal light>Avatar</SignupLabal>
              <StyledAvatarInputWrapper>
                <StyledAvatarInput
                  type="file"
                  name="avatar"
                  onChange={avatarChangeHandler}
                  required
                />
                <UploadButton onClick={handleClick}>Upload</UploadButton>
              </StyledAvatarInputWrapper>
            </>
          )}
          <SignupButton disabled={loading}>
            {loading ? 'Loading...' : 'Sign Up'}
          </SignupButton>
        </form>
      </SignupWrapper>
    </PageLayout>
  );
};

export default Signup;
