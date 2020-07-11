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
    const { users } = this.props;
    const { loading } = this.state;
    return (
      <UsersTemplate loading={loading}>
        {users.map(({ _id: id, name, createdAt, photo }) => (
          <Tuple id={id} key={id} name={name} createdAt={createdAt} photo={photo} />
        ))}
      </UsersTemplate>
    );
  }
}

Users.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
};

Users.defaultProps = {
  users: [],
};

const mapStateToProps = ({ users, filters }) => ({
  users: getVisibleNotes(users.users, filters, 'users'),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUsers: (pageContext) => dispatch(fetchUsersAction(pageContext)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
