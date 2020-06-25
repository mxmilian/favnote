import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withContext from 'hoc/withContext';
import Header from 'components/molecules/Header/Header';
import SidebarTemplate from 'templates/SidebarTemplate';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import FormBar from 'components/organisms/FormBar/FormBar';
import plusIcon from 'assets/plus.svg';
import minusIcon from 'assets/minus.svg';

const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8.5rem;

  @media (max-width: 1500px) {
    grid-gap: 4.5rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

const StyledPageHeader = styled.div``;

const StyledButtonIcon = styled(ButtonIcon)`
  background-color: ${({ theme, activeColor }) => theme[activeColor]};
  background-size: 35%;
  border-radius: 5rem;
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  z-index: 2;

  @media (max-width: 840px) {
    top: 4rem;
  }
`;

class GridTemplate extends Component {
  state = {
    showForm: false,
  };

  toggleForm = () => this.setState((prevState) => ({ showForm: !prevState.showForm }));

  render() {
    const { showForm } = this.state;
    const { children, pageContext } = this.props;
    const { toggleForm } = this;
    return (
      <SidebarTemplate>
        <StyledPageHeader>
          <Header pageContext={pageContext} />
        </StyledPageHeader>
        <StyledGridWrapper>{children}</StyledGridWrapper>
        <StyledButtonIcon
          activeColor={pageContext}
          icon={showForm ? minusIcon : plusIcon}
          onClick={toggleForm}
        />
        <FormBar isVisible={showForm} />
      </SidebarTemplate>
    );
  }
}

GridTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withContext(GridTemplate);
