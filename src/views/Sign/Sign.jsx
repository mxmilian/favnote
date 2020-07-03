import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import AuthTemplate from 'templates/AuthTemplate';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

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
  };

  toggleSign = () => {
    this.setState((prevState) => ({ signUp: !prevState.signUp }));
  };

  render() {
    const { signUp } = this.state;
    const { toggleSign } = this;
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
            name: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .min(5, 'Must be 5 characters or more')
              .required('Required'),
            email: signUp
              ? Yup.string()
                  .email('Must be email')
                  .max(20, 'Must be 20 characters or less')
                  .required('Required')
              : '',
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .min(5, 'Must be 5 characters or more')
              .required('Required'),
            confirmPassword: signUp
              ? Yup.string()
                  .max(20, 'Must be 20 characters or less')
                  .min(5, 'Must be 5 characters or more')
                  .required('Required')
              : '',
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <>
              <StyledHeading>{signUp ? 'Sign up' : 'Sign in'}</StyledHeading>
              <StyledForm>
                <StyledInput placeholder="name" {...formik.getFieldProps('name')} />
                {formik.touched.name && formik.errors.name ? (
                  <StyledError>
                    <StyledParagraph>{formik.errors.name}!</StyledParagraph>
                  </StyledError>
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
                {signUp ? 'I want to sign up' : 'I want to sign in'}
              </StyledLink>
            </>
          )}
        </Formik>
      </AuthTemplate>
    );
  }
}

export default Sign;
