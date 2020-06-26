import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
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
  margin: 3rem 0 5rem;
  font-family: inherit;
  border-radius: 2rem;
  height: 30vh;
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
        title: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
        twitterName:
          pageContext === 'twitters'
            ? Yup.string().max(15, 'Must be 15 characters or less').required('Required')
            : '',
        articleUrl:
          pageContext === 'articles'
            ? Yup.string().url('This field must be a valid URL').required('Required')
            : '',
        content: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
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
            {formik.touched.title && formik.errors.title ? <div>{formik.errors.title}</div> : null}

            {pageContext === 'twitters' ? (
              <>
                <StyledInput
                  placeholder="Account name eg. dan_abramov"
                  {...formik.getFieldProps('twitterName')}
                />
                {formik.touched.twitterName && formik.errors.twitterName ? (
                  <div>{formik.errors.twitterName}</div>
                ) : null}
              </>
            ) : null}

            {pageContext === 'articles' ? (
              <>
                <StyledInput placeholder="article url" {...formik.getFieldProps('articleUrl')} />
                {formik.touched.articleUrl && formik.errors.articleUrl ? (
                  <div>{formik.errors.articleUrl}</div>
                ) : null}
              </>
            ) : null}

            <StyledTextArea as="textarea" {...formik.getFieldProps('content')} />
            {formik.touched.content && formik.errors.content ? (
              <div>{formik.errors.content}</div>
            ) : null}

            <Button activecolor={pageContext} type="submit">
              Add {pageContext.slice(0, -1)}
            </Button>
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
