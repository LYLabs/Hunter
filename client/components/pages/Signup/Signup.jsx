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
                className='inputSignUp'
                type='text'
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <SignupLabal light>Last Name</SignupLabal>
              <SignupInput
                className='inputSignUp'
                type='text'
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <SignupLabal light>Email Address</SignupLabal>
              <SignupInput
                className='inputSignUp'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <SignupLabal light>Password</SignupLabal>
              <StyledFormPWDInput
                className='inputSignUp'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <SignupLabal light>Re-enter password</SignupLabal>
              <StyledFormPWDInput
                className='inputSignUp'
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
              <SignupLabal light>Avatar</SignupLabal>
              <SignupInput
                className='inputSignUp'
                type='file'
                name='avatar'
                onChange={avatarChangeHandler}
                required
              />
              <button onClick={handleClick}>upload</button>
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
