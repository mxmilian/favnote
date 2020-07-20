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

const StyledContentParagraph = styled(Paragraph)`
  overflow: hidden;
  margin-bottom: 3rem;
  word-break: break-word;
  white-space: pre-wrap;
  width: 70%;
  display: -webkit-box;
  -webkit-line-clamp: 10;
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
  width: 70%;
  display: -webkit-box;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
`;

const StyledForm = styled.form`
  margin-bottom: 3rem;
`;

class DetailsTemplate extends Component {
  state = {
    editContent: false,
  };

  editContentToggle = () => this.setState((prevState) => ({ editContent: !prevState.editContent }));

  render() {
    const { editContent } = this.state;
    const { pageContext, title, createdAt, content, articleUrl, twitterName } = this.props;
    const { editContentToggle } = this;
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
            <StyledForm>
              <StyledTextArea value={content} lines={lines} />
            </StyledForm>
          ) : (
            <StyledContentParagraph onClick={editContentToggle}>{content}</StyledContentParagraph>
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
