import Heading from 'components/atoms/Heading/Heading';
import React, { useState } from 'react';
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
import Loader from 'react-loader-spinner';
import { theme as themeLoader } from 'theme/theme';

const StyledGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8.5rem;

  @media (max-width: 1500px) {
    grid-gap: 4.5rem;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

const StyledLoaderEmptyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10rem;
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

  @media (max-width: 880px) {
    top: 2rem;
  }
`;

const StyledHeading = styled(Heading)`
  color: ${({ theme, pageContext }) => theme[pageContext]};
`;

const StyledSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const GridTemplate = ({ createNote, children, pageContext, loading }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleSubmit = (itemType, itemContent) => {
    createNote(itemType, itemContent);
    toggleForm();
  };

  return (
    <SidebarTemplate>
      <StyledPageHeader>
        <Header pageContext={pageContext} />
      </StyledPageHeader>
      {/* eslint-disable-next-line no-nested-ternary */}
      {loading ? (
        <StyledLoaderEmptyWrapper>
          <Loader type="Grid" color={themeLoader[pageContext]} height={250} width={250} />
        </StyledLoaderEmptyWrapper>
      ) : children.length ? (
        <StyledGridWrapper>{children}</StyledGridWrapper>
      ) : (
        <StyledLoaderEmptyWrapper>
          <StyledHeading pageContext={pageContext} as="h3">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            Any {pageContext} here, please <StyledSpan onClick={toggleForm}>add some!</StyledSpan>
          </StyledHeading>
        </StyledLoaderEmptyWrapper>
      )}

      <StyledButtonIcon
        id="toggleFormButton"
        activeColor={pageContext}
        icon={showForm ? minusIcon : plusIcon}
        onClick={toggleForm}
      />
      <FormBar isVisible={showForm} toggleForm={toggleForm} handleSubmit={handleSubmit} />
    </SidebarTemplate>
  );
};

GridTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles', 'users']).isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  createNote: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  createNote: (itemType, itemContent) => dispatch(createNoteAction(itemType, itemContent)),
});

export default connect(null, mapDispatchToProps)(withContext(GridTemplate));
