import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { routes } from 'routes';
import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';
import Heading from 'components/atoms/Heading/Heading';
import AuthTemplate from 'templates/AuthTemplate';
import { theme as themeLoader } from 'theme/theme';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import {
  authenticate as authenticateAction,
  AUTHENTICATE_SUCCESS,
  register as registerAction,
} from 'actions/user';
import withLoader from 'hoc/withLoader';
import Error from 'components/organisms/Error/Error';

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

const StyledLoader = styled(Loader)`
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

const StyledErrorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const Sign = ({
  authenticate,
  register,
  userID,
  loading,
  toggleLoading,
  failure,
  history,
  accessToken,
}) => {
  const [signUp, setSignUp] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [visible, setVisible] = useState(true);

  const toggleSign = () => {
    if (visible) setVisible((prevState) => !prevState);
    setSignUp((prevState) => !prevState);
  };

  const toggleEmail = () => {
    setIsEmail((prevState) => !prevState);
  };

  const toggleVisible = () => {
    setVisible((prevState) => !prevState);
  };
  if (accessToken) history.push(routes.notes);
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
          name:
            isEmail || !signUp
              ? ''
              : Yup.string()
                  .max(30, 'Must be 30 characters or less')
                  .min(8, 'Must be 8 characters or more')
                  .required('Required'),
          email:
            signUp || (isEmail && signUp)
              ? Yup.string()
                  .email('Must be email')
                  .max(40, 'Must be 40 characters or less')
                  .required('Required')
              : '',
          password: signUp
            ? Yup.string()
                .max(30, 'Must be 30 characters or less')
                .min(8, 'Must be 8 characters or more')
                .required('Required')
            : '',
          confirmPassword: signUp
            ? Yup.string()
                .max(30, 'Must be 30 characters or less')
                .min(8, 'Must be 8 characters or more')
                .required('Required')
            : '',
        })}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(false);
          if (!visible) toggleVisible();
          toggleLoading();
          try {
            if (!signUp) {
              if (isEmail) {
                authenticate(null, values.email, values.password)
                  .then(({ type }) => {
                    toggleLoading();
                    if (type === AUTHENTICATE_SUCCESS) {
                      history.push(routes.notes);
                    }
                    toggleLoading();
                  })
                  .catch(() => toggleLoading());
              } else if (!isEmail) {
                authenticate(values.name, null, values.password)
                  .then(({ type }) => {
                    if (type === AUTHENTICATE_SUCCESS) {
                      history.push(routes.notes);
                    }
                    toggleLoading();
                  })
                  .catch(() => toggleLoading());
              }
            } else {
              register(values.name, values.email, values.password, values.confirmPassword)
                .then(() => toggleLoading())
                .catch(() => toggleLoading());
            }
          } catch (e) {
            console.log('Not logged');
          }
        }}
      >
        {(formik) => (
          <>
            <StyledHeading>{userID}</StyledHeading>
            <StyledHeading>{signUp ? 'Sign up' : 'Sign in'}</StyledHeading>
            {failure && visible ? (
              <StyledErrorWrapper>
                <Error failure={failure} visible={visible} setVisible={toggleVisible} />
              </StyledErrorWrapper>
            ) : null}
            <StyledForm>
              {signUp ? null : (
                <>
                  <StyledInput
                    id={isEmail ? 'email' : 'name'}
                    name={isEmail ? 'email' : 'name'}
                    type="text"
                    onChange={(e) => {
                      if (e.target.value && e.target.value.includes('@') && !isEmail) {
                        toggleEmail();
                        // eslint-disable-next-line no-param-reassign
                        formik.setFieldValue('email', e.target.value);
                      }
                      if (formik.values.email && !e.target.value.includes('@') && isEmail) {
                        toggleEmail();
                        // eslint-disable-next-line no-param-reassign
                        formik.setFieldValue('name', e.target.value);
                      }
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    value={isEmail ? formik.values.email : formik.values.name}
                    placeholder="email or name"
                  />
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {isEmail ? (
                    formik.touched.email && formik.errors.email ? (
                      <StyledError>
                        <StyledParagraph>{formik.errors.email}!</StyledParagraph>
                      </StyledError>
                    ) : null
                  ) : formik.touched.name && formik.errors.name ? (
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
                    type="password"
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
              {loading ? (
                <StyledLoader type="Oval" color={themeLoader.notes} height={50} width={50} />
              ) : (
                <StyledButton activecolor="notes" type="submit">
                  {signUp ? 'Sign up' : 'Sign in'}
                </StyledButton>
              )}
            </StyledForm>

            <StyledLink onClick={toggleSign}>
              {signUp ? 'I want to sign in' : 'I want to sign up'}
            </StyledLink>
          </>
        )}
      </Formik>
    </AuthTemplate>
  );
};
Sign.propTypes = {
  authenticate: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  userID: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  failure: PropTypes.string,
  history: PropTypes.objectOf({
    push: PropTypes.func.isRequired,
  }).isRequired,
  accessToken: PropTypes.string,
};

Sign.defaultProps = {
  userID: null,
  failure: undefined,
  accessToken: '',
};

const mapStateToProps = ({ users }) => ({
  accessToken: users.accessToken,
  failure: users.failure,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (name, email, password) => dispatch(authenticateAction(name, email, password)),
  register: (name, email, password, confirmPassword) =>
    dispatch(registerAction(name, email, password, confirmPassword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Sign));
