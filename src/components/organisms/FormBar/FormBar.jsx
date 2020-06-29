import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 40vw;
  z-index: 1;
  background-color: white;
  box-shadow: -0.5rem 0 -1.5rem hsla(0, 0%, 0%, 0.1);
  border-left: 1rem solid ${({ theme, activeColor }) => theme[activeColor]};
  padding: 10rem 9rem;
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;

  @media (max-width: 1380px) {
    padding: 10rem 5rem;
  }

  @media (max-width: 1120px) {
    width: 55vw;
  }

  @media (max-width: 560px) {
    padding: 2.5rem 5rem;
    width: 100vw;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-top: 3rem;
`;

const StyledTextArea = styled(Input)`
  margin: 3rem 0 0;
  font-family: inherit;
  border-radius: 2rem;
  height: 30vh;
`;

const StyledButton = styled(Button)`
  margin-top: 5rem;
`;

const StyledError = styled.div`
  padding: 0.2rem 0 0 2rem;
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.error};
  font-weight: ${({ theme }) => theme.bold};
`;

const FormBar = ({ pageContext, isVisible, handleSubmit }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        twitterName: '',
        articleUrl: '',
        content: '',
      }}
      validationSchema={Yup.object({
        title: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        twitterName:
          pageContext === 'twitters'
            ? Yup.string().max(20, 'Must be 20 characters or less').required('Required')
            : '',
        articleUrl:
          pageContext === 'articles'
            ? Yup.string().url('This field must be a valid URL').required('Required')
            : '',
        content: Yup.string().max(250, 'Must be 250 characters or less').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(pageContext, values);
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <StyledWrapper activeColor={pageContext} isVisible={isVisible}>
          <StyledForm>
            <Heading big>Add new {pageContext.slice(0, -1)}</Heading>

            <StyledInput placeholder="title" {...formik.getFieldProps('title')} />
            {formik.touched.title && formik.errors.title ? (
              <StyledError>
                <StyledParagraph>{formik.errors.title}!</StyledParagraph>
              </StyledError>
            ) : null}

            {pageContext === 'twitters' ? (
              <>
                <StyledInput
                  placeholder="Account name eg. dan_abramov"
                  {...formik.getFieldProps('twitterName')}
                />
                {formik.touched.twitterName && formik.errors.twitterName ? (
                  <StyledError>
                    <StyledParagraph>{formik.errors.title}!</StyledParagraph>
                  </StyledError>
                ) : null}
              </>
            ) : null}

            {pageContext === 'articles' ? (
              <>
                <StyledInput placeholder="article url" {...formik.getFieldProps('articleUrl')} />
                {formik.touched.articleUrl && formik.errors.articleUrl ? (
                  <StyledError>
                    <StyledParagraph>{formik.errors.title}!</StyledParagraph>
                  </StyledError>
                ) : null}
              </>
            ) : null}

            <StyledTextArea as="textarea" {...formik.getFieldProps('content')} />
            {formik.touched.content && formik.errors.content ? (
              <StyledError>
                <StyledParagraph>{formik.errors.title}!</StyledParagraph>
              </StyledError>
            ) : null}

            <StyledButton activecolor={pageContext} type="submit">
              Add {pageContext.slice(0, -1)}
            </StyledButton>
          </StyledForm>
        </StyledWrapper>
      )}
    </Formik>
  );
};

FormBar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withContext(FormBar);
