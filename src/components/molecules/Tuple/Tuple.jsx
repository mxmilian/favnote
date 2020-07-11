import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import withContext from 'hoc/withContext';
import React from 'react';
import Moment from 'react-moment';
import styled from 'styled-components';
import Image from 'components/atoms/Image/Image';
import plusIcon from 'assets/plus.svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  min-height: 10rem;
  max-width: 70rem;
  box-shadow: 0 10px 30px -5px hsla(0, 0%, 0%, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  border: 0.2rem solid ${({ theme, activeColor }) => (activeColor ? theme[activeColor] : 'white')};
  padding: 1.2rem 3.2rem;
  display: grid;
  grid-template-columns: 0.25fr 0.85fr 0.15fr;

  @media (max-width: 475px) {
    padding: 1.2rem 0.5rem;
  }
`;

const StyledDate = styled.div`
  display: flex;
  margin-bottom: 3.5rem;
`;

const StyledDateCreated = styled(Paragraph)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.bold};
  margin-right: 0.8rem;
`;
const StyledDateParagraph = styled(Moment)`
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.light};
`;

const StyledInnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
`;

const StyledHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.8rem;

  @media (max-width: 735px) {
    margin: 1.8rem 0 0 2rem;
  }
`;

const Tuple = ({ id, yourID, name, photo, createdAt, friendState, pageContext }) => {
  let sign = '';
  switch (friendState) {
    case 0:
      sign = plusIcon;
      break;
    case 1:
      sign = 'reqSign';
      break;
    case 2:
      sign = 'penSign';
      break;
    case 3:
      sign = 'friendSign';
      break;
    default:
      sign = plusIcon;
  }

  return (
    <StyledWrapper activeColor={pageContext}>
      <StyledInnerWrapper>
        <Image icon={`${photo}`} activeColor={pageContext} />
      </StyledInnerWrapper>
      <StyledHeadingWrapper>
        <Heading>
          {name} {yourID === id ? '(You!)' : null}
        </Heading>
        <StyledDate>
          <StyledDateCreated>Joined:</StyledDateCreated>
          <StyledDateParagraph fromNow>{createdAt}</StyledDateParagraph>
        </StyledDate>
      </StyledHeadingWrapper>
      <StyledInnerWrapper>
        <ButtonIcon icon={sign} />
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

Tuple.propTypes = {
  pageContext: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
  id: PropTypes.string.isRequired,
  yourID: PropTypes.string,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  friendState: PropTypes.oneOf([0, 1, 2, 3]),
};

Tuple.defaultProps = {
  friendState: 0,
  yourID: '',
};

const mapStateToProps = ({ users }) => ({
  yourID: users.userID,
});

export default withContext(connect(mapStateToProps)(Tuple));
