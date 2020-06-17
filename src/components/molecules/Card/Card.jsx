import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import linkIcon from 'assets/link.svg';

const StyledWrapper = styled.div`
  min-height: 38rem;
  box-shadow: 0 10px 30px -5px hsla(0, 0%, 0%, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-rows: 0.25fr 1fr;
`;

const InnerWrapper = styled.div`
  padding: 1.8rem 3.2rem;
  background-color: ${({ theme, activeColor }) => (activeColor ? theme[activeColor] : 'white')};
  position: relative;

  :first-of-type {
    z-index: 1;
  }

  ${({ flex }) =>
    flex &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2.6rem 3.2rem;
    `}
`;

const StyledAvatar = styled.img`
  height: 8.6rem;
  width: 8.6rem;
  border-radius: 5rem;
  border: 0.4rem solid ${({ theme }) => theme.twitter};
  position: absolute;
  right: 25px;
  top: 15px;
  background-image: url(${({ src }) => src});
`;

const StyledLink = styled.a`
  height: 5.6rem;
  width: 5.6rem;
  border-radius: 5rem;
  border: 0.4rem solid ${({ theme }) => theme.article};
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);
  background: white url(${() => linkIcon}) no-repeat 50% 50%;
  background-size: 50%;
`;

const DateInfo = styled(Paragraph)`
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const Card = ({ cardType }) => (
  <StyledWrapper>
    <InnerWrapper activeColor={cardType}>
      <Heading>Card</Heading>
      <DateInfo>3 days</DateInfo>
      {cardType === 'twitter' && (
        <StyledAvatar src="https://secure.img1-ag.wfcdn.com/im/02238154/compr-r85/8470/84707680/pokemon-pikachu-wall-decal.jpg" />
      )}
      {cardType === 'article' && <StyledLink href="https://youtube.com" />}
    </InnerWrapper>
    <InnerWrapper flex>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae delectus deserunt
        dolorem dolorum enim error pariatur repellendus saepe, ullam.
      </Paragraph>
      <Button secondary>Remove</Button>
    </InnerWrapper>
  </StyledWrapper>
);

Card.propTypes = {
  cardType: PropTypes.oneOf(['note', 'twitter', 'article']),
};

Card.defaultProps = {
  cardType: 'note',
};

export default Card;
