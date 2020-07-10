import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withContext from 'hoc/withContext';
import { NavLink } from 'react-router-dom';
import penIcon from 'assets/pen.svg';
import logoIcon from 'assets/logo.svg';
import bulbIcon from 'assets/bulb.svg';
import logoutIcon from 'assets/logout.svg';
import twitterIcon from 'assets/twitter.svg';
import userIcon from 'assets/user.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { routes } from 'routes';

const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 2.5rem 0;
  width: 15rem;
  height: 100vh;
  background-color: ${({ theme, activeColor }) => theme[activeColor]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 840px) {
    width: 100vw;
    height: 10rem;
    position: fixed;
    left: 0;
    top: calc(100vh - 10rem);
    padding: 2.5rem 0;
    background-color: ${({ theme, activeColor }) => theme[activeColor]};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
  }

  @media (max-width: 375px) {
    height: 8rem;
    top: calc(100vh - 8rem);
  }
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 6.7rem;
  height: 6.7rem;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;

  @media (max-width: 840px) {
    margin-left: 2rem;
    margin-bottom: 0;
  }
`;

const StyledLogoutButton = styled(ButtonIcon)`
  margin-top: auto;
  @media (max-width: 840px) {
    margin-top: 0;
  }
`;

const StyledLinkListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: calc(100vh / 3);

  @media (max-width: 840px) {
    flex-direction: row;
    min-height: 0;
    min-width: calc(100vw / 3);
  }
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 840px) {
    flex-direction: row;
  }
`;

const Sidebar = ({ pageContext }) => (
  <StyledWrapper activeColor={pageContext}>
    <StyledLogoLink to="/" />
    <StyledLinkListWrapper>
      <StyledLinksList>
        <li>
          <ButtonIcon as={NavLink} activeClassName="active" to={routes.users} icon={userIcon} />
        </li>
      </StyledLinksList>
      <StyledLinksList>
        <li>
          <ButtonIcon as={NavLink} activeClassName="active" to={routes.notes} icon={penIcon} />
        </li>
        <li>
          <ButtonIcon
            as={NavLink}
            activeClassName="active"
            to={routes.twitters}
            icon={twitterIcon}
          />
        </li>
        <li>
          <ButtonIcon as={NavLink} activeClassName="active" to={routes.articles} icon={bulbIcon} />
        </li>
      </StyledLinksList>
    </StyledLinkListWrapper>
    <StyledLogoutButton as={NavLink} to="/login" icon={logoutIcon} />
  </StyledWrapper>
);

Sidebar.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
};

export default withContext(Sidebar);
