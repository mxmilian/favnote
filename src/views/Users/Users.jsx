import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers as fetchUsersAction } from 'actions/user';
import getVisibleNotes from 'selector';
import UsersTemplate from 'templates/UsersTemplate';
import Tuple from 'components/molecules/Tuple/Tuple';
import PropTypes from 'prop-types';

class Users extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {
      props: { fetchUsers },
    } = this;

    fetchUsers();
  }

  render() {
    const { users, yourID } = this.props;
    const { loading } = this.state;
    return (
      <UsersTemplate loading={loading}>
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
    );
  }
}

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
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

const mapStateToProps = ({ users, filters }) => ({
  users: getVisibleNotes(users.users, filters, 'users'),
  yourID: users.userID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (pageContext) => dispatch(fetchUsersAction(pageContext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
