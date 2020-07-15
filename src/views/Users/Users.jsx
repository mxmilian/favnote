import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers as fetchUsersAction } from 'actions/user';
import getVisibleNotes from 'selector';
import UsersTemplate from 'templates/UsersTemplate';
import Tuple from 'components/molecules/Tuple/Tuple';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';

class Users extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const {
      props: { fetchUsers },
    } = this;

    const { users } = this.props;
    if (users.length === 0) fetchUsers('users').then(() => this.setState({ loading: false }));
    else this.setState({ loading: false });
  }

  render() {
    const { users, yourID, pageContext } = this.props;
    const { loading } = this.state;

    return (
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
    );
  }
}

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
  users: getVisibleNotes(state.users.users, state.filters, 'users'),
  yourID: state.users.userID,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: () => dispatch(fetchUsersAction()),
});

export default withContext(connect(mapStateToProps, mapDispatchToProps)(Users));
