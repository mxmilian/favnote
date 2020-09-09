import Button from 'components/atoms/Button/Button';
import ButtonPhoto from 'components/atoms/ButtonPhoto/ButtonPhoto';
import Input from 'components/atoms/Input/Input';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
// import Error from 'components/organisms/Error/Error';
import React from 'react';
// import Loader from 'react-loader-spinner';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import withContext from 'hoc/withContext';

const StyledWrapper = styled.div`
  margin-top: 1rem;
  border: 0.2rem solid ${({ theme, pageContext }) => theme[pageContext]};
`;

const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

// const StyledLoader = styled(Loader)`
//   margin-top: 3rem;
//   margin-bottom: 2rem;
// `;
//
// const StyledErrorWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 1rem;
// `;

/*
<Formik
            initialValues={{
              title,
              twitterName,
              articleUrl,
              content,
            }}
            validationSchema={Yup.object({
              title: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
              twitterName:
                pageContext === TWITTERS
                  ? Yup.string().max(20, 'Must be 20 characters or less').required('Required')
                  : '',
              articleUrl:
                pageContext === ARTICLES
                  ? Yup.string().url('This field must be a valid URL').required('Required')
                  : '',
              content: Yup.string().max(250, 'Must be 250 characters or less').required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(id, pageContext, values);
              setSubmitting(false);
            }}
          >
            {(formik) => {
              if (loading) {
                return (
                  <StyledFormWrapper>
                    <Loader type="Oval" color={themeLoader.notes} height={50} width={50} />
                  </StyledFormWrapper>
                );
              }
              return (
                <StyledFormWrapper>
                  <StyledTextArea
                    as="textarea"
                    {...formik.getFieldProps('content')}
                    height={rect.height}
                  />
                  {formik.touched.content && formik.errors.content ? (
                    <StyledError>
                      <StyledParagraph>{formik.errors.content}!</StyledParagraph>
                    </StyledError>
                  ) : null}
                  <StyledFormButtonWrapper>
                    <StyledSubmitButton secondary activecolor={pageContext} type="submit">
                      save edit
                    </StyledSubmitButton>
                    <StyledSubmitButton secondary onClick={editContentToggle}>
                      exit edit
                    </StyledSubmitButton>
                  </StyledFormButtonWrapper>
                </StyledFormWrapper>
              );
            }}

            <ButtonPhoto icon={`http://localhost:1337/static/image/users/${photo}`} />
      <Heading>Hello{name}</Heading>
      <p>
        {email}
        {createdAt}
      </p>
 */

const User = ({ name, photo, email, createdAt, pageContext }) => (
  <StyledWrapper pageContext={pageContext}>
    <StyledFormWrapper>
      <Formik
        initialValues={{
          name,
          photo,
          email,
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(30, 'Must be 30 characters or less')
            .min(8, 'Must be 8 characters or more')
            .required('Required'),
          email: Yup.string()
            .email('Must be email')
            .max(40, 'Must be 40 characters or less')
            .required('Required'),
          photo: Yup.string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {(formik) => (
          <>
            <ButtonPhoto icon={`http://localhost:1337/static/image/users/${photo}`} />
            <p>{createdAt}</p>
            <StyledInput
              type="name"
              placeholder="Your new awesome name!"
              {...formik.getFieldProps('name')}
            />
            {formik.touched.name && formik.errors.name ? (
              <StyledError>
                <StyledParagraph>{formik.errors.name}!</StyledParagraph>
              </StyledError>
            ) : null}
            <StyledInput type="email" placeholder={email} {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? (
              <StyledError>
                <StyledParagraph>{formik.errors.email}!</StyledParagraph>
              </StyledError>
            ) : null}
            <StyledButton activecolor={pageContext}>Save changes!</StyledButton>
          </>
        )}
      </Formik>
    </StyledFormWrapper>
  </StyledWrapper>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  pageContext: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
};

export default withContext(User);
