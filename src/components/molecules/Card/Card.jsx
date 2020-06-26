import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import { removeNote as removeNoteAction } from 'actions/notes';
import { Redirect } from 'react-router';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Modal from 'components/organisms/Modal/Modal';
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledAvatar = styled.img`
  height: 7.6rem;
  width: 7.6rem;
  border-radius: 5rem;
  border: 0.4rem solid ${({ theme }) => theme.twitters};
  position: absolute;
  right: 25px;
  top: 25px;
  background-image: url(${({ src }) => src});
`;

const StyledLink = styled.a`
  height: 5.6rem;
  width: 5.6rem;
  border-radius: 5rem;
  border: 0.4rem solid ${({ theme }) => theme.articles};
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

class Card extends Component {
  state = {
    redirect: false,
    show: false,
  };

  handleClick = () => this.setState({ redirect: true });

  handleModalClick = () => this.setState((prevState) => ({ show: !prevState.show }));

  handleRemove = () => {
    const { id, pageContext, removeNote } = this.props;
    removeNote(id, pageContext);
    this.setState((prevState) => ({ show: !prevState.show }));
  };

  render() {
    const { redirect, show } = this.state;
    const { id, pageContext, title, created, twitterName, articleUrl, content } = this.props;
    if (redirect) return <Redirect push to={`${pageContext}/${id}`} />;

    return (
      <>
        <StyledWrapper>
          <InnerWrapper activeColor={pageContext}>
            <Heading>{title}</Heading>
            <DateInfo>{created}</DateInfo>
            {pageContext === 'twitters' && (
              <StyledAvatar src={`https://source.unsplash.com/1600x900/?${twitterName}`} />
            )}

            {pageContext === 'articles' && <StyledLink href={articleUrl} />}
          </InnerWrapper>
          <InnerWrapper flex>
            <Paragraph>{content}</Paragraph>
            <ButtonWrapper>
              <Button secondary onClick={this.handleModalClick}>
                Remove
              </Button>
              <Button secondary onClick={this.handleClick}>
                Details
              </Button>
            </ButtonWrapper>
          </InnerWrapper>
        </StyledWrapper>
        <Modal
          showModal={show}
          handleClose={this.handleModalClick}
          handleRemove={this.handleRemove}
        />
      </>
    );
  }
}

Card.propTypes = {
  pageContext: PropTypes.oneOf(['notes', 'twitters', 'articles']).isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  twitterName: PropTypes.string,
  articleUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
  removeNote: PropTypes.func.isRequired,
};

Card.defaultProps = {
  twitterName: null,
  articleUrl: null,
};

const mapDispatchToProps = (dispatch) => ({
  removeNote: (id, itemType) => dispatch(removeNoteAction(id, itemType)),
});

export default connect(null, mapDispatchToProps)(withContext(Card));
