import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  position: fixed;
  z-index: 999;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(161, 161, 161, 0.4);
`;

const ModalWrapper = styled.div`
  width: 45rem;
  height: 30rem;
  display: grid;
  grid-template-rows: 25% 75%;
  border: 0.2rem solid ${({ theme, activeColor }) => theme[activeColor]};
  border-radius: 1rem;
  overflow: hidden;
`;

const HeadingWrapper = styled.div`
  background: ${({ theme, activeColor }) => theme[activeColor]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  margin: 6rem 0 2.5rem 0;
`;

const StyledLink = styled.a`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.bold};
  text-decoration: underline;
  cursor: pointer;
`;
const Modal = ({ pageContext, showModal, handleClose, handleRemove }) => {
  if (!showModal) return null;
  return (
    <StyledWrapper>
      <ModalWrapper activeColor={pageContext}>
        <HeadingWrapper activeColor={pageContext}>
          <Heading>Are you sure?</Heading>
        </HeadingWrapper>
        <ContentWrapper>
          <Paragraph>This action cannot be undone!</Paragraph>
          <StyledButton tertiary activecolor={pageContext} onClick={handleRemove}>
            remove
          </StyledButton>
          <StyledLink onClick={handleClose}>no, wait</StyledLink>
        </ContentWrapper>
      </ModalWrapper>
    </StyledWrapper>
  );
};

Modal.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles', 'users']).isRequired,
  showModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};

export default withContext(Modal);
