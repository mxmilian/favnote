import {
  reqFriend as reqFriendAction,
  accFriend as accFriendAction,
  rejFriend as rejFriendAction,
} from 'actions/user';
import React from 'react';
import styled from 'styled-components';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import withContext from 'hoc/withContext';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import Image from 'components/atoms/Image/Image';
import PropTypes from 'prop-types';
import plusIcon from 'assets/plus.svg';
import reqIcon from 'assets/request.svg';
import accIcon from 'assets/accept.svg';
import rejIcon from 'assets/reject.svg';
import userIcon from 'assets/user.svg';
import defaultPhoto from 'assets/photo.jpg';

const StyledWrapper = styled.div`
  min-height: 10rem;
  max-width: 70rem;
  box-shadow: 0 10px 30px -5px hsla(0, 0%, 0%, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  border: 0.1rem solid ${({ theme, activeColor }) => (activeColor ? theme[activeColor] : 'white')};
  padding: 1.2rem 3.2rem;
  display: grid;
  grid-template-columns: 0.25fr 0.85fr 0.15fr;
  margin-bottom: 3.8rem;

  @media (max-width: 475px) {
    padding: 1.2rem 0.5rem;
  }
`;

const StyledDateWrapper = styled.div`
  margin-top: 0.2rem;
  display: flex;
`;

const StyledIconWrapper = styled.div`
  display: flex;
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

const Tuple = ({
  id,
  currentID,
  name,
  photo,
  createdAt,
  friendsStatus,
  pageContext,
  reqFriend,
  accFriend,
  rejFriend,
}) => {
  // 0, //'add friend',
  //   1, //'requested',
  //   2, //'pending',
  //   3, //'friends'

  let Sign = () => <Heading>You!</Heading>;
  if (currentID !== id) {
    switch (friendsStatus) {
      case 0:
        Sign = () => <ButtonIcon icon={plusIcon} onClick={() => reqFriend(id)} />;
        break;
      case 1:
        Sign = () => (
          <StyledIconWrapper>
            <ButtonIcon icon={accIcon} onClick={() => accFriend(id)} />{' '}
            <ButtonIcon icon={rejIcon} onClick={() => rejFriend(id)} />
          </StyledIconWrapper>
        );

        break;
      case 2:
        Sign = () => <ButtonIcon icon={reqIcon} onClick={() => console.log(id)} />;
        break;
      case 3:
        Sign = () => <ButtonIcon icon={userIcon} onClick={() => console.log(id)} />;
        break;
      default:
        Sign = plusIcon;
    }
  }

  return (
    <StyledWrapper activeColor={pageContext}>
      <StyledInnerWrapper>
        <Image icon={photo !== 'default.jpg' ? photo : defaultPhoto} activeColor={pageContext} />
      </StyledInnerWrapper>
      <StyledHeadingWrapper>
        <Heading>{name}</Heading>
        <StyledDateWrapper>
          <StyledDateCreated>Joined:</StyledDateCreated>
          <StyledDateParagraph fromNow>{createdAt}</StyledDateParagraph>
        </StyledDateWrapper>
      </StyledHeadingWrapper>
      <StyledInnerWrapper>
        <Sign />
      </StyledInnerWrapper>
    </StyledWrapper>
  );
};

Tuple.propTypes = {
  pageContext: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
  id: PropTypes.string.isRequired,
  currentID: PropTypes.string,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  friendsStatus: PropTypes.oneOf([0, 1, 2, 3]),
  reqFriend: PropTypes.func.isRequired,
  accFriend: PropTypes.func.isRequired,
  rejFriend: PropTypes.func.isRequired,
};

Tuple.defaultProps = {
  friendsStatus: 0,
  currentID: '',
};

const mapDispatchToProps = (dispatch) => ({
  reqFriend: (id) => dispatch(reqFriendAction(id)),
  accFriend: (id) => dispatch(accFriendAction(id)),
  rejFriend: (id) => dispatch(rejFriendAction(id)),
});

export default connect(null, mapDispatchToProps)(withContext(Tuple));
