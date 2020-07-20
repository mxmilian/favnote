import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import SidebarTemplate from 'templates/SidebarTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Moment from 'react-moment';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const StyledWrapper = styled.div`
  position: relative;
  padding: 3.5rem 0;
  max-width: 70rem;
`;

const StyledDate = styled.div`
  display: flex;
  margin-bottom: 3.5rem;
`;

const StyledDateCreated = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  margin-right: 0.8rem;
`;
const StyledDateParagraph = styled(Moment)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
`;

const StyledAvatar = styled.img`
  height: 12rem;
  width: 12rem;
  border-radius: 12rem;
  background-image: url(${({ src }) => src});
  position: absolute;
  top: 0;
  right: 0;
`;

const StyledContentContainer = styled.div`
  width: 70%;
  position: relative;
`;

const StyledContentParagraph = styled(Paragraph)`
  overflow: hidden;
  margin-bottom: 3rem;
  word-break: break-word;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StyledLink = styled.a`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.bold};
  text-transform: uppercase;
  margin-bottom: 5.5rem;
`;

const StyledEditButton = styled(Button)`
  position: absolute;
  right: 0;
  bottom: -2rem;
`;

const StyledSubmitButton = styled(Button)``;

const StyledFormButtonWrapper = styled.div`
  margin-top: 1.2rem;
  display: flex;
  justify-content: space-between;
`;

const StyledTextArea = styled.textarea`
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  background-color: ${({ theme }) => theme.grey100};
  border: none;
  padding: 1rem 1rem 3rem 1rem;
  font-family: inherit;
  border-radius: 2rem;
  height: ${({ lines }) => `${lines * 2.5}rem`};
  overflow: hidden;
  word-break: break-word;
  white-space: pre-wrap;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const StyledFormWrapper = styled(Form)`
  margin-bottom: 3rem;
  width: 70%;
`;

const StyledError = styled.div`
  padding: 0.2rem 0 0 2rem;
`;

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.error};
  font-weight: ${({ theme }) => theme.bold};
`;

class DetailsTemplate extends Component {
  state = {
    editContent: false,
  };

  editContentToggle = () => this.setState((prevState) => ({ editContent: !prevState.editContent }));

  handleSubmit = (id, itemType, itemContent) => {
    console.log(id, itemType, itemContent);
    this.editContentToggle();
  };

  render() {
    const { editContent } = this.state;
    const { id, pageContext, title, createdAt, content, articleUrl, twitterName } = this.props;
    const { editContentToggle, handleSubmit } = this;
    const lines = content.split(/\r\n|\r|\n/).length;
    return (
      <SidebarTemplate>
        <StyledWrapper>
          <Heading big as="h1">
            {title}
          </Heading>
          <StyledDate>
            <StyledDateCreated>Created:</StyledDateCreated>
            <StyledDateParagraph fromNow>{createdAt}</StyledDateParagraph>
          </StyledDate>
          {pageContext === 'twitters' ? (
            <StyledAvatar src={`https://source.unsplash.com/1600x900/?${twitterName}`} />
          ) : null}
          {editContent ? (
            <>
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
                    pageContext === 'twitters'
                      ? Yup.string().max(20, 'Must be 20 characters or less').required('Required')
                      : '',
                  articleUrl:
                    pageContext === 'articles'
                      ? Yup.string().url('This field must be a valid URL').required('Required')
                      : '',
                  content: Yup.string()
                    .max(250, 'Must be 250 characters or less')
                    .required('Required'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit(id, pageContext, values);
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <StyledFormWrapper>
                    <StyledTextArea
                      as="textarea"
                      {...formik.getFieldProps('content')}
                      lines={lines}
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
                )}
              </Formik>
            </>
          ) : (
            <StyledContentContainer>
              <StyledContentParagraph>{content}</StyledContentParagraph>
              <StyledEditButton secondary activecolor={pageContext} onClick={editContentToggle}>
                Edit {pageContext}
              </StyledEditButton>
            </StyledContentContainer>
          )}
          {pageContext === 'articles' || pageContext === 'twitters' ? (
            <StyledLink href={articleUrl}>Open {pageContext}</StyledLink>
          ) : null}
          <Button activecolor={pageContext} as={Link} to={`/${pageContext}`}>
            close
          </Button>
        </StyledWrapper>
      </SidebarTemplate>
    );
  }
}

DetailsTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
};

DetailsTemplate.defaultProps = {
  twitterName: null,
  articleUrl: null,
};

export default withContext(DetailsTemplate);
