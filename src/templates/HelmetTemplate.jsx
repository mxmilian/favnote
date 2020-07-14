import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import withContext from 'hoc/withContext';

const HelmetTemplate = ({ children, pageContext }) => (
  <>
    <Helmet>
      <title>Favnote - {pageContext}</title>
    </Helmet>
    {children}
  </>
);

HelmetTemplate.propTypes = {
  pageContext: PropTypes.oneOf(['users', 'notes', 'twitters', 'articles']).isRequired,
  children: PropTypes.element.isRequired,
};

export default withContext(HelmetTemplate);
