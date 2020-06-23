import React, { Component } from 'react';
import styled from 'styled-components';
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
  background: rgba(255, 255, 255, 0.2);
`;

const ModalWrapper = styled.div`
  width: 45rem;
  height: 30rem;
  display: grid;
  grid-template-rows: 25% 75%;
  border: 0.2rem solid ${({ theme }) => theme.notes};
`;

const HeadingWrapper = styled.div`
  background: ${({ theme }) => theme.notes};
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
  font-size: ${({ theme }) => theme.fontSize.xxs};
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.bold};
  text-transform: uppercase;
  text-decoration: underline;
  cursor: pointer;
`;

class Modal extends Component {
  state = {
    // show: false,
  };

  render() {
    const showModal = true;
    if (!showModal) return null;
    return (
      <StyledWrapper>
        <ModalWrapper>
          <HeadingWrapper>
            <h1>Hello modal!</h1>
          </HeadingWrapper>
          <ContentWrapper>
            <Paragraph>This action cannot be undone</Paragraph>
            <StyledButton secondary>remove</StyledButton>
            <StyledLink>no, wait</StyledLink>
          </ContentWrapper>
        </ModalWrapper>
      </StyledWrapper>
    );
  }
}

export default Modal;
