import Radio from 'components/atoms/Radio/Radio';
import Error from 'components/organisms/Error/Error';
import React, { createRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import withContext from 'hoc/withContext';
import { Formik, Form } from 'formik';
import { ARTICLES, TWITTERS } from 'utils/constants';
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
  margin-top: 3rem;
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

const StyledRadioWrapper = styled.div`
  display: block;
  margin-top: 3rem;
`;

const StyledErrorWrapper = styled.div`
  margin-top: 2.5rem;
`;

const FormBar = ({ isVisible, toggleForm, pageContext, handleSubmit, failure }) => {
  const wrapperRef = createRef();

  const handleClickOutside = (e) => {
    if (
      wrapperRef &&
      !wrapperRef.current.contains(e.target) &&
      isVisible &&
      e.target.id !== 'toggleFormButton'
    )
      toggleForm();
  };

  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  });

  return (
    <Formik
      initialValues={{
        title: '',
        twitterName: '',
        articleUrl: '',
        content: '',
        public: false,
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .max(25, 'Must be 20 characters or less')
          .min(3, 'Must be 3 characters or more')
          .required('Required'),
        content: Yup.string()
          .max(250, 'Must be 250 characters or less')
          .min(3, 'Must be 3 characters or more')
          .required('Required'),
        twitterName:
          pageContext === TWITTERS
            ? Yup.string().max(20, 'Must be 20 characters or less').required('Required')
            : '',
        articleUrl:
          pageContext === ARTICLES
            ? Yup.string().url('Must be a valid URL').required('Required')
            : '',
      })}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(pageContext, values);
        setSubmitting(false);
        if (!visible) toggleVisible();
      }}
    >
      {(formik) => (
        <StyledWrapper activeColor={pageContext} isVisible={isVisible} ref={wrapperRef}>
          <StyledForm>
            <Heading big>Add new {pageContext.slice(0, -1)}</Heading>

            <StyledInput placeholder="title" {...formik.getFieldProps('title')} />
            {formik.touched.title && formik.errors.title ? (
              <StyledError>
                <StyledParagraph>{formik.errors.title}!</StyledParagraph>
              </StyledError>
            ) : null}

            {pageContext === TWITTERS ? (
              <>
                <StyledInput
                  placeholder="Account name eg. dan_abramov"
                  {...formik.getFieldProps('twitterName')}
                />
                {formik.touched.twitterName && formik.errors.twitterName ? (
                  <StyledError>
                    <StyledParagraph>{formik.errors.twitterName}!</StyledParagraph>
                  </StyledError>
                ) : null}
              </>
            ) : null}

            {pageContext === ARTICLES ? (
              <>
                <StyledInput placeholder="article url" {...formik.getFieldProps('articleUrl')} />
                {formik.touched.articleUrl && formik.errors.articleUrl ? (
                  <StyledError>
                    <StyledParagraph>{formik.errors.articleUrl}!</StyledParagraph>
                  </StyledError>
                ) : null}
              </>
            ) : null}

            <StyledTextArea as="textarea" {...formik.getFieldProps('content')} />
            {formik.touched.content && formik.errors.content ? (
              <StyledError>
                <StyledParagraph>{formik.errors.content}!</StyledParagraph>
              </StyledError>
            ) : null}

            <StyledRadioWrapper>
              <Radio
                pageContext={pageContext}
                content="Note for friends"
                checked={formik.values.public}
                setChecked={() => formik.setFieldValue('public', !formik.values.public)}
              />
            </StyledRadioWrapper>
            {failure && visible && (
              <StyledErrorWrapper>
                <Error failure={failure} setVisible={toggleVisible}>
                  {failure}
                </Error>
              </StyledErrorWrapper>
            )}
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
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles', 'users']).isRequired,
  isVisible: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  failure: PropTypes.string,
};

FormBar.defaultProps = {
  failure: '',
};

export default withContext(FormBar);
