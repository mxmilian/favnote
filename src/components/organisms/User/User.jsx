import ButtonPhoto from 'components/atoms/ButtonPhoto/ButtonPhoto';
import Heading from 'components/atoms/Heading/Heading';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { Formik, Form } from 'formik';

const StyledWrapper = styled.div``;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

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
 */

const User = ({ name, photo, email, createdAt }) => (
  <StyledWrapper>
    <FormWrapper>
      <ButtonPhoto icon={`http://localhost:1337/static/image/users/${photo}`} />
      <Heading>Hello{name}</Heading>
      <p>
        {email}
        {createdAt}
      </p>
    </FormWrapper>
  </StyledWrapper>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default User;
