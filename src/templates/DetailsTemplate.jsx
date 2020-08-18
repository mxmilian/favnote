import { useMeasure } from 'hooks/useMeasure';
import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
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
import { theme as themeLoader } from 'theme/theme';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { editNote as editNoteAction } from 'actions/notes';
import withLoader from 'hoc/withLoader';
import { TWITTERS, ARTICLES } from 'utils/constants';

const StyledWrapper = styled.div`
  position: relative;
  padding: 3.5rem 0;
  max-width: 70rem;
`;

const StyledDate = styled.div`
  display: flex;
  margin-bottom: 3.5rem;
  margin-right: 2rem;
`;

const StyledDateCreated = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  margin-right: 0.6rem;
`;
const StyledDateParagraph = styled(Moment)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.normal};
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
  height: ${({ height }) => `${(height + 10) / 10}rem`};
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
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledHeaderParagraph = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  display: block;
`;

const StyledHeaderParagraphContent = styled.span`
  font-weight: ${({ theme }) => theme.normal};
`;

const DetailsTemplate = ({
  id,
  pageContext,
  title,
  createdAt,
  author,
  content,
  articleUrl,
  twitterName,
  editNote,
  loading,
  toggleLoading,
  authorID,
  userID,
}) => {
  const [editContent, setEditContent] = useState(false);

  const editContentToggle = () => setEditContent((prevState) => !prevState);

  const handleSubmit = (itemID, itemType, itemContent) => {
    toggleLoading();
    editNote(itemID, itemType, itemContent).then(() => {
      toggleLoading();
      editContentToggle();
    });
  };

  const [rect, conRef] = useMeasure(id);

  return (
    <SidebarTemplate>
      <StyledWrapper>
        <Heading big as="h1">
          {title}
        </Heading>
        <InfoWrapper>
          <StyledDate>
            <StyledDateCreated>Created:</StyledDateCreated>
            <StyledDateParagraph fromNow>{createdAt}</StyledDateParagraph>
          </StyledDate>
          <StyledHeaderParagraph>
            By: <StyledHeaderParagraphContent>{author}</StyledHeaderParagraphContent>
          </StyledHeaderParagraph>
        </InfoWrapper>
        {pageContext === TWITTERS ? (
          <StyledAvatar src={`https://source.unsplash.com/1600x900/?${twitterName}`} />
        ) : null}
        {editContent ? (
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
          </Formik>
        ) : (
          <StyledContentContainer>
            <StyledContentParagraph ref={conRef}>{content}</StyledContentParagraph>
            <StyledEditButton
              disabled={authorID !== userID}
              secondary
              activecolor={pageContext}
              onClick={editContentToggle}
            >
              Edit {pageContext}
            </StyledEditButton>
          </StyledContentContainer>
        )}
        {pageContext === ARTICLES || pageContext === TWITTERS ? (
          <StyledLink href={articleUrl}>Open {pageContext}</StyledLink>
        ) : null}
        <Button activecolor={pageContext} as={Link} to={`/${pageContext}`}>
          close
        </Button>
      </StyledWrapper>
    </SidebarTemplate>
  );
};

DetailsTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
  editNote: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  authorID: PropTypes.string.isRequired,
  userID: PropTypes.string.isRequired,
};

DetailsTemplate.defaultProps = {
  twitterName: null,
  articleUrl: null,
};

const mapStateToProps = ({ users }) => ({
  // eslint-disable-next-line no-underscore-dangle
  userID: users.user._id,
});

const mapDispatchToProps = (dispatch) => ({
  editNote: (id, itemType, itemContent) => dispatch(editNoteAction(id, itemType, itemContent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoader(withContext(DetailsTemplate)));
