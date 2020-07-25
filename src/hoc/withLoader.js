import React, { Component } from 'react';

const withLoader = (WrappedComponent) =>
  class WithLoader extends Component {
    state = {
      loading: false,
    };

    toggleLoading = () => this.setState((prevState) => ({ loading: !prevState.loading }));

    render() {
      const { loading } = this.state;
      const { props, toggleLoading } = this;
      return <WrappedComponent {...props} loading={loading} toggleLoading={toggleLoading} />;
    }
  };

export default withLoader;
