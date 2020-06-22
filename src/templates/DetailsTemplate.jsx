import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SidebarTemplate from 'templates/SidebarTemplate';
import Heading from 'components/atoms/Heading/Heading';

const StyledWrapper = styled.div`
  position: relative;
  padding: 3.5rem 0;
  max-width: 70rem;
`;

const StyledDateParagraph = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  margin-bottom: 3.5rem;
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
  margin-bottom: 3.5rem;
`;

const StyledLink = styled.a`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.bold};
  text-transform: uppercase;
  margin-bottom: 5.5rem;
`;

const DetailsTemplate = ({ pageType, title, created, content, articleUrl, twitterName }) => (
  <SidebarTemplate pageType={pageType}>
    <StyledWrapper>
      <Heading big>{title}</Heading>
      <StyledDateParagraph>CREATED: {created}</StyledDateParagraph>
      {pageType === 'twitters' ? <StyledAvatar src={twitterName} /> : null}
      <StyledContentParagraph>{content}</StyledContentParagraph>
      {pageType === 'articles' || pageType === 'twitters' ? (
        <StyledLink href={articleUrl}>Open {pageType}</StyledLink>
      ) : null}
      <Button big activeColor={pageType} as={Link} to={`/${pageType}`}>
        close
      </Button>
    </StyledWrapper>
  </SidebarTemplate>
);

DetailsTemplate.propTypes = {
  pageType: PropTypes.oneOf(['notes', 'twitters', 'articles']),
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
};

DetailsTemplate.defaultProps = {
  pageType: 'notes',
  twitterName: null,
  articleUrl: null,
};

export default DetailsTemplate;
