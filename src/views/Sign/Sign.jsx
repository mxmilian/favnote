import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { routes } from 'routes';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import AuthTemplate from 'templates/AuthTemplate';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { connect } from 'react-redux';
import { authenticateWithUsername as authenticateWithUsernameAction } from 'actions/user';
import { Redirect } from 'react-router';

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledHeading = styled(Heading)`
  margin-top: 2rem;
`;

const StyledInput = styled(Input)`
  min-width: 30rem;
  margin-top: 3rem;
`;

const StyledButton = styled(Button)`
  margin-top: 3rem;
  margin-bottom: 2rem;
`;

const StyledError = styled.div`
  padding: 0.2rem 0 0 2rem;
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.error};
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledLink = styled.a`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.bold};
  text-transform: uppercase;
  text-decoration: underline;
  margin-bottom: 5.5rem;
  cursor: pointer;
`;

class Sign extends Component {
  state = {
    signUp: false,
    isEmail: false,
  };

  toggleSign = () => {
    this.setState((prevState) => ({ signUp: !prevState.signUp }));
  };

  toggleEmail = () => {
    this.setState((prevState) => ({ isEmail: !prevState.isEmail }));
  };

  render() {
    const { signUp, isEmail } = this.state;
    const { toggleSign, toggleEmail } = this;
    const { authenticateWithUsername, userID } = this.props;
    if (userID) return <Redirect push to={routes.notes} />;
    return (
      <AuthTemplate>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object({
            name: isEmail
              ? ''
              : Yup.string()
                  .max(30, 'Must be 30 characters or less')
                  .min(5, 'Must be 5 characters or more')
                  .required('Required'),
            email:
              signUp || isEmail
                ? Yup.string()
                    .email('Must be email')
                    .max(30, 'Must be XD characters or less')
                    .required('Required')
                : '',
            password: Yup.string()
              .max(30, 'Must be 30 characters or less')
              .min(5, 'Must be 5 characters or more')
              .required('Required'),
            confirmPassword: signUp
              ? Yup.string()
                  .max(30, 'Must be 30 characters or less')
                  .min(5, 'Must be 5 characters or more')
                  .required('Required')
              : '',
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            try {
              if (!signUp) {
                if (isEmail) {
                  await axios.post('http://localhost:1337/api/v1/users/signin', {
                    email: values.email,
                    password: values.password,
                  });
                  console.log('Logged');
                } else if (!isEmail) {
                  authenticateWithUsername(values.name, values.password);
                }
              }
            } catch (e) {
              console.log('Not logged');
              console.log(e);
            }
          }}
        >
          {(formik) => (
            <>
              <StyledHeading>{userID}</StyledHeading>
              <StyledHeading>{signUp ? 'Sign up' : 'Sign in'}</StyledHeading>
              <StyledForm>
                {signUp ? null : (
                  <>
                    <StyledInput
                      id={isEmail ? 'email' : 'name'}
                      name={isEmail ? 'email' : 'name'}
                      type="text"
                      onChange={(e) => {
                        if (formik.values.name && formik.values.name.includes('@') && !isEmail) {
                          toggleEmail();
                          // eslint-disable-next-line no-param-reassign
                          formik.values.email = e.target.value;
                        }
                        if (formik.values.email && !formik.values.email.includes('@') && isEmail) {
                          toggleEmail();
                          // eslint-disable-next-line no-param-reassign
                          formik.values.name = e.target.value;
                        }
                        formik.handleChange(e);
                      }}
                      onBlur={formik.handleBlur}
                      value={isEmail ? formik.values.email : formik.values.name}
                      placeholder="email or name"
                    />
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {isEmail ? (
                      formik.values.email && formik.errors.email ? (
                        <StyledError>
                          <StyledParagraph>{formik.errors.email}!</StyledParagraph>
                        </StyledError>
                      ) : null
                    ) : formik.values.name && formik.errors.name ? (
                      <StyledError>
                        <StyledParagraph>{formik.errors.name}!</StyledParagraph>
                      </StyledError>
                    ) : null}
                  </>
                )}
                {signUp ? (
                  <>
                    <StyledInput placeholder="name" {...formik.getFieldProps('name')} />
                    {formik.touched.name && formik.errors.name ? (
                      <StyledError>
                        <StyledParagraph>{formik.errors.name}!</StyledParagraph>
                      </StyledError>
                    ) : null}
                  </>
                ) : null}

                {signUp ? (
                  <>
                    <StyledInput placeholder="email" {...formik.getFieldProps('email')} />
                    {formik.touched.email && formik.errors.email ? (
                      <StyledError>
                        <StyledParagraph>{formik.errors.email}!</StyledParagraph>
                      </StyledError>
                    ) : null}
                  </>
                ) : null}
                <StyledInput
                  type="password"
                  placeholder="password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <StyledError>
                    <StyledParagraph>{formik.errors.password}!</StyledParagraph>
                  </StyledError>
                ) : null}
                {signUp ? (
                  <>
                    <StyledInput
                      placeholder="Confirm password"
                      {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                      <StyledError>
                        <StyledParagraph>{formik.errors.confirmPassword}!</StyledParagraph>
                      </StyledError>
                    ) : null}
                  </>
                ) : null}
                <StyledButton activecolor="notes" type="submit">
                  {signUp ? 'Sign up' : 'Sign in'}
                </StyledButton>
              </StyledForm>

              <StyledLink onClick={toggleSign}>
                {signUp ? 'I want to sign in' : 'I want to sign up'}
              </StyledLink>
            </>
          )}
        </Formik>
      </AuthTemplate>
    );
  }
}
Sign.propTypes = {
  authenticateWithUsername: PropTypes.func.isRequired,
  userID: PropTypes.string,
};

Sign.defaultProps = {
  userID: null,
};

const mapStateToProps = ({ users }) => ({
  userID: users.userID,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateWithUsername: (name, password) =>
    dispatch(authenticateWithUsernameAction(name, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sign);
