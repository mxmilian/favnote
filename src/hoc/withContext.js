import React from 'react';
import PageContext from 'context';

const withContext = (Component) => (props) => (
  <PageContext.Consumer>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    {(context) => <Component {...props} pageContext={context} />}
  </PageContext.Consumer>
);
export default withContext;
