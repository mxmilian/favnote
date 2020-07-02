import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createNote as createNoteAction } from 'actions/notes';
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
  bottom: 2rem;
  right: 2rem;
  z-index: 2;

  @media (max-width: 840px) {
    top: 2rem;
  }
`;

class GridTemplate extends Component {
  state = {
    showForm: false,
  };

  toggleForm = () => {
    this.setState((prevState) => ({ showForm: !prevState.showForm }));
  };

  handleSubmit = (itemType, itemContent) => {
    const { createNote } = this.props;
    createNote(itemType, itemContent);
    this.toggleForm();
  };

  render() {
    const { showForm } = this.state;
    const { children, pageContext } = this.props;
    const { toggleForm, handleSubmit } = this;
    return (
      <SidebarTemplate>
        <StyledPageHeader>
          <Header pageContext={pageContext} />
        </StyledPageHeader>
        <StyledGridWrapper>{children}</StyledGridWrapper>
        <StyledButtonIcon
          id="toggleFormButton"
          activeColor={pageContext}
          icon={showForm ? minusIcon : plusIcon}
          onClick={toggleForm}
        />
        <FormBar isVisible={showForm} toggleForm={toggleForm} handleSubmit={handleSubmit} />
      </SidebarTemplate>
    );
  }
}

GridTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  createNote: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createNote: (itemType, itemContent) => dispatch(createNoteAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(GridTemplate));
