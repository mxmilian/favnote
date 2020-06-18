import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import penIcon from 'assets/pen.svg';
import bulbIcon from 'assets/bulb.svg';
import logoutIcon from 'assets/logout.svg';
import twitterIcon from 'assets/twitter.svg';

const StyledWrapper = styled.div`
  min-width: 15rem;
  height: 100vh;
  position: absolute;
  grid-template-rows: 1fr 1fr 1fr;
  background-color: ${({ theme, activeColor }) => theme[activeColor]};
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`;

const Sidebar = ({ cardType }) => (
  <StyledWrapper activeColor={cardType}>
    <InnerWrapper>
      <ButtonIcon icon={penIcon} />
    </InnerWrapper>
    <InnerWrapper>
      <ButtonIcon icon={penIcon} active />
      <ButtonIcon icon={twitterIcon} />
      <ButtonIcon icon={bulbIcon} />
    </InnerWrapper>
    <InnerWrapper>
      <ButtonIcon icon={logoutIcon} />
    </InnerWrapper>
  </StyledWrapper>
);

Sidebar.propTypes = {
  cardType: PropTypes.oneOf(['note', 'twitter', 'article']),
};

Sidebar.defaultProps = {
  cardType: 'note',
};

export default Sidebar;
