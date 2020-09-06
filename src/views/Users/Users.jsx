import { useFetchData } from 'hooks/useFetchData';
import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers as fetchUsersAction } from 'actions/user';
import getVisibleNotes from 'selector';
import UsersTemplate from 'templates/UsersTemplate';
import Tuple from 'components/molecules/Tuple/Tuple';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import withLoader from 'hoc/withLoader';
import UserTemplate from 'templates/UserTemplate';
import { USERS } from 'utils/constants';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
`;

const Users = ({ users, yourID, pageContext, fetchUsers }) => {
  const loading = useFetchData(users, fetchUsers, USERS);
  return (
    <StyledWrapper>
      <UserTemplate id={yourID} />
      <UsersTemplate loading={loading} pageType={pageContext}>
        {users.map(({ _id: id, name, createdAt, photo, friendsStatus }) => (
          <Tuple
            key={id}
            id={id}
            currentID={yourID}
            name={name}
            createdAt={createdAt}
            photo={photo}
            friendsStatus={friendsStatus}
          />
        ))}
      </UsersTemplate>
    </StyledWrapper>
  );
};

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  pageContext: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
  yourID: PropTypes.string,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      friendsStatus: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
    }),
  ),
};

Users.defaultProps = {
  users: [],
  yourID: '',
};

const mapStateToProps = (state) => ({
  users: getVisibleNotes(state.users.users, state.filters, USERS),
  yourID: state.users.userID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (source) => dispatch(fetchUsersAction(source)),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(withLoader(Users)));
