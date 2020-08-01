import React, { useState } from 'react';

const withLoader = (WrappedComponent) => (props) => {
  const [loading, setLoading] = useState(false);
  const toggleLoading = () => setLoading((prevState) => !prevState);

  return <WrappedComponent {...props} loading={loading} toggleLoading={toggleLoading} />;
};

export default withLoader;
